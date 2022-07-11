import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {

    changeQuantity(state, action){
      const foundItem = state.cart.find((item) => item.id === action.payload.id)
      if(action.payload.action === 'add'){
        foundItem.quantity ++
      }
      if(action.payload.action === 'remove'){
          if(foundItem.quantity === 1){
           const index =  state.cart.indexOf(foundItem)
           state.cart.splice(index, 1)
          }else{
            foundItem.quantity --
          }
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    setCart(state, action) {
      state.cart = action.payload
    },

    addToCart(state, action) {
      if (!state.cart.length) {
        state.cart.push(action.payload);
        const cartStr = JSON.stringify(state.cart)
        localStorage.setItem('cart', cartStr)
        return;
      }
      //get array of the same products
      const sameProducts = state.cart.filter(
        (item) => item.productId === action.payload.productId
      );
      //check if sameProducts has anything
      if (!sameProducts.length) {
        // push, because there are no products with the same id in the cart
        state.cart.push(action.payload);
        const cartStr = JSON.stringify(state.cart)
        localStorage.setItem('cart', cartStr)
        return;
      }
      let push = false;
      for (let i = 0; i < sameProducts.length; i++) {
        //go over each product with the same id and compare each of their attributes
        let sameAttributes = [];
        for (let n = 0; n < sameProducts[i].attributes.length; n++) {
          //compare each attribute
          if (
            sameProducts[i].attributes[n].attrName ===
              action.payload.attributes[n].attrName &&
            sameProducts[i].attributes[n].attrValue ===
              action.payload.attributes[n].attrValue
          ) {
            sameAttributes.push(true);
          } else {
            sameAttributes.push(false);
          }
        }
        if (!sameAttributes.includes(false)) {
          sameProducts[i].quantity++;
          const cartStr = JSON.stringify(state.cart)
          localStorage.setItem('cart', cartStr)
          return;
        } else {
          push = true;
        }
      }
      if (push === true) {
        state.cart.push(action.payload);
        const cartStr = JSON.stringify(state.cart)
        localStorage.setItem('cart', cartStr)
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
