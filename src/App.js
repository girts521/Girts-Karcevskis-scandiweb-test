import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Component} from 'react'

import Category from './Pages/Category/Category';
import NavBar from './Components/NavBar/NavBar';
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart'

class App extends Component {
  render() {
    return (
      <>
      <NavBar />
      <Routes>
         <Route path="/" element={<Category />} />
         <Route path="/product" element={<Product />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
      </>
    );
  }
}

export default App;
