import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Cart from './components/Cart';
import { NavBar } from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<ProductList />}/>
        <Route path='/cart/:id' element={<Cart />}/>
        <Route path='/product/:id' element={<Product />}/>
      </Routes>
      
      
    </Router>
  );
}

export default App;
