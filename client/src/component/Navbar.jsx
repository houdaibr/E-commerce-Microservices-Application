import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth-service";

export default function Navbar() {
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    // Redirect to home page after logout
    navigate('/');
  };

  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="#">
            MyStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="buttons">
              {currentUser ? (
                <div>
                  <button
                    className="btn btn-outline-dark"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <Link to="/cart" className="btn btn-outline-dark">
                    <i className="fa fa-shopping-cart me-1"></i>
                    Cart ({state.length})
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/login" className="btn btn-outline-dark">
                    <i className="fa fa-login"></i>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-dark">
                    <i className="fa fa-login"></i>
                    Register
                  </Link>
                  <Link to="#" className="btn btn-outline-dark">
                    <i className="fa fa-shopping-cart me-1"></i>
                    Cart ({state.length})
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  );
}
