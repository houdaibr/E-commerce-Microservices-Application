import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Products from './component/Products'
import About from './component/About'
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./component/Register";
import Login from "./component/Login";
import  Profile1 from "./component/Profile"
import {Routes, Route, BrowserRouter, Router} from 'react-router-dom';
import Product from './component/Product';
import Cart from "./component/Cart"
import CheckOut from './component/Checkout';

function App() {
  return (
  <div>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/products/:id" element={<Product/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile1 />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<CheckOut />} />
   </Routes>

  
  </div>

  );
}

export default App;
