import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const Loading = () => {
    return <div style={{ color: "#FFFFFF" }}>Loading ...</div>;
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const ShowProducts = () => {
    const filteredProducts = selectedCategory === "All"
      ? data
      : data.filter((product) => product.category && product.category.name === selectedCategory);
  
      return (
        <>
          <div className="buttons d-flex justify-content-center mb-4">
            {["All", "Clothes", "Electronics", "Furniture", "Shoes", "Others"].map(category => (
              <button
                className="btn mx-2"
                style={{
                  color: selectedCategory === category ? "#F4DFB6" : "#550000",
                  backgroundColor: selectedCategory === category ? "#550000" : "transparent",
                  borderColor: "#550000"
                }}
                onClick={() => filterProductsByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row" >
            {filteredProducts.map((product) => (
              <div className="col-md-3 mb-4" key={product._id} >
                <div className="card h-100 text-center p-4" style={{ backgroundColor: "#FAF2D3" }}>
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.title}
                    height={250}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0" style={{ color: "#550000" }}>
                      {product.title && product.title.substring(0, 12)}
                    </h5>
                    <p className="card-text lead fw-bold" style={{ color: "#550000" }}>
                      $ {product.price}
                    </p>
                    <Link to={`/products/${product._id}`} className="btn" style={{ borderColor: "#550000", color: "#FFFFFF", backgroundColor: "#550000" }}>
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    };
  
    return (
      <div style={{ backgroundColor: "#FFFFFF", padding: "30px 0" }}>
        <div className="container my-5 py-5" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center" style={{ color: "#550000" }}>Latest Products</h1>
              <hr style={{ backgroundColor: "#550000" }} />
            </div>
          </div>
          <div className="row justify-content-center">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    );
  }