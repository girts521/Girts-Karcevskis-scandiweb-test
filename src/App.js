import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Component } from "react";

import Category from "./Pages/Category/Category";
import NavBar from "./Components/NavBar/NavBar";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import CartOverlay from "./Pages/CartOverlay/CartOverlay";
import {WithRouter} from './utils/withRouter'
import { connect } from "react-redux";
import {cartActions} from './store/cart'
import { currencyActions } from "./store/currency";
import {mapStateToProps} from './store/index'

class App extends Component {

  componentDidMount () {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const selectedCurrency = JSON.parse(localStorage.getItem('selectedCurrency'))
    if(cart){
      this.props.dispatch(cartActions.setCart(cart))
    }
    if(selectedCurrency){
      this.props.dispatch(currencyActions.setCurrency(selectedCurrency))
    }
  }

  render() { 
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    );
  }
}

export default  connect(mapStateToProps)(App);
