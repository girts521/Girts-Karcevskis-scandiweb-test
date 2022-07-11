import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import currencyReducer from "./currency"

const store = configureStore({
    reducer: { 
      cart: cartReducer,
      selectedCurrency: currencyReducer
    }
  });

  export function mapStateToProps(state) {
    const cart = state.cart.cart;
    const selectedCurrency = state.selectedCurrency.selectedCurrency
  
    return {
      cart, selectedCurrency
    };
  }
  
  export default store;