import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";

const store = configureStore({
    reducer: { cart: cartReducer }
  });

  export function mapStateToProps(state) {
    const cart = state.cart.cart;
  
    return {
      cart
    };
  }
  
  export default store;