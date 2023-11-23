import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "../Style/Cart.css";
import axios from 'axios';

export default function Cart() {
  const [cartData, setCartData] = useState({
    total: 0,
    ProductsCart: [],
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          console.log("Token not found");
          return;
        }

        const response = await axios.get("http://localhost:5001/api/commandes", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        if (response.status === 200) {
          console.log("Welcome to cart");
          const data = response.data;
          setCartData(data);
        } else {
          if (response.status === 401) {
            console.log("Invalid token");
          } else {
            console.log("Failed to fetch cart data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    if (cartData) {
      const totalPriceElement = document.getElementById("totalPrice");
      if (totalPriceElement) {
        totalPriceElement.innerHTML = "Total: $" + cartData.total;
      }
    }
  }, [cartData]);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5001/api/commandes/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const updatedCart = cartData.ProductsCart.filter(product => product.productcartId !== productId);
        const updatedTotal = updatedCart.reduce((total, product) => total + product.price, 0);

        setCartData({
          ...cartData,
          ProductsCart: updatedCart,
          total: updatedTotal,
        });
      } else {
        console.log("some error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Fragment>
      <div className="backgrounds">
        <div className="spacefo2">
          <div className="cart-page">
            <div className="cart-page-container">
              <div className="cart-page-header">
                <h2 className="cart-header-text">Your Cart</h2>
              </div>
              <div className="cart-page-table">
                <table className="cart-table-product">
                  <thead>
                    <tr className="cart-table-header">
                      <th className="cart-table-img">Product Image</th>
                      <th className="cart-table-desktop cart-table-payment">Name</th>
                      <th className="cart-table-desktop cart-table-size">Category</th>
                      <th className="cart-table-desktop cart-table-size">Quantity</th>
                      <th className="cart-table-size right-text-mobile">Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartData.ProductsCart && cartData.ProductsCart.map(product => (
  <tr className="cart-table-content" key={product.productcartId}>
                    <td className="cart-table-image-info">
                          <img src={product.image} alt="Product Image"/>
                        </td>
                        <td className="bold-text">{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                        <td>
                          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.productcartId)} style={{color: "#f92810"}} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-table-bill">
                <div className="bill-total bold-text">${cartData.total}</div>
              </div>
              <div className="cart-header-footer">
                <a href="/Checkout">
                  <button className="cart-header-cta red-bg" type="button">
                    Proceed to Checkout
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
