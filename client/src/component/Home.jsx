import React from "react";
import Navbar from "./Navbar";
import Product from "./Products";

export default function Home() {
  return (
    
    <div className="hero">
      <div className="card text-bg-dark text-black border-0">
        <img src="/assets/bg2.jpeg" class="card-img" alt="Background" height="790"/>
        <div className="card-img-overlay d-flex flex-column justify-content-center">
            <div className="container">
            <h5 className="card-title display-4 fw-bolder mb-0 ">NEW SEASON ARRIVALS</h5>
          <p className="card-text lead fs-2">
            CHECK OUT ALL THE TREND
          </p>
            </div>
         
         
        </div>
      </div>
    </div>
  );
}
