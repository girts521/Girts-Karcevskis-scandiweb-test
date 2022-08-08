import { gql } from "apollo-boost";
import { client } from "../Apollo";
import {pricesGQL} from "../utils/gql"

export const allPrices = async (products, index, newPrices) => {
  let prices = [];
  let symbol;

  const recursive = async () => {
    if (newPrices) {
      prices = newPrices;
    }
    if (products.length === 0) {
      return prices;
    }
    const product = products.pop();
    const query = pricesGQL;

    const res = await client.query({ query });
    const price = res.data.product.prices[index].amount;
    symbol = res.data.product.prices[index].currency.symbol;
    for (let i = 0; i < product.quantity; i++) {
      prices.push(price);
    }
    await recursive(products, index, prices);
  };
  await recursive();
  return { prices, symbol };
};

export const updateAllPrices = async (cart, index) => {
  const products = [];
  cart.forEach((item) => {
    products.push({
      id: item.productId,
      quantity: item.quantity,
    });
  });

  try {
    const data = await allPrices(products, index);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const calculateTotal = (prices) => {
  let total = 0;
  prices.forEach((price) => {
    total = total + price;
  });
  return total;
};
