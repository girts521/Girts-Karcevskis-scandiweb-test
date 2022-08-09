

export const allPrices =  (products, index, newPrices) => {
  let prices = [];
  let symbol;
  if(products.length && !products[0].prices){
    //means that there is an old item in cart without prices being passed
    //this causes an error and page does not load, thats why I have to clear the cart
    // only will happen if the item was added before these improvements
    const cart = localStorage.setItem("cart","[]")
    return
  }

  const recursive =  () => {
    if (newPrices) {
      prices = newPrices;
    }
    if (products.length === 0) { 
      return prices;
    }
    const product = products.pop();
    const price = product.prices[index].amount
    symbol = product.prices[index].currency.symbol
    for (let i = 0; i < product.quantity; i++) {
      prices.push(price);
    }
     recursive(products, index, prices);
  };
   recursive();
  return { prices, symbol };
};

export const updateAllPrices =  (cart, index) => {
  const products = [];
  cart.forEach((item) => {
    products.push({
      id: item.productId,
      quantity: item.quantity,
      prices: item.prices
    });
  });

  try {
    const data =  allPrices(products, index);
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
