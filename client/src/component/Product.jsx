import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

import Modal from "react-modal";

const NotLoggedInModal = ({ isOpen, handleClose, handleLogin }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customModalStyles}>
      <button onClick={handleClose}>Fermer</button>
      <br />
      <br />

      <p className="text-center fw-bold">
        Vous devez être connecté pour effectuer un achat.
      </p>
      <div style={customModalStyles.buttonContainer}>
        <button
          className="d-flex justify-content-center btn btn-secondary fixed-bottom p-3 text-center"
          onClick={() => {
            handleClose();
            handleLogin();
          }}
        >
          Se connecter
        </button>
      </div>
    </Modal>
  );
};

const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color : ""
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

Modal.setAppElement("#root");

const Product = () => {
  const [commandeModalIsOpen, setCommandeModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notLoggedInModalIsOpen, setNotLoggedInModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const handleNotLoggedInModalClose = () => {
    setNotLoggedInModalIsOpen(false);
  };

  const handleCommandeSubmit = async (product) => {
    if (!user) {
      setNotLoggedInModalIsOpen(true);
      return;
    }


    try {
      const commande = {
        id: 1,
        datePaiement: Date.now(),
        idProduct: product._id,
      };

      const response = await axios.post(
        "http://localhost:5001/api/commandes",
        [commande]
      );
      
      setOrderId(response.data[0]._id);
      setError(null);
      setCommandeModalIsOpen(true);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      setOrderId(null);
      setError(error.message);
      setCommandeModalIsOpen(true);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const handleCommandeModalClose = () => {
    setCommandeModalIsOpen(false);
    setPaymentModalIsOpen(false);
  };

  const ShowProduct = () => {
    if (!product || !product.images || product.images.length === 0) {
      return <p>No product data available.</p>;
    }

    return (
      <>
        <div className="col-md-6">
          <img
            src={product.images[0]} // Display the first image from the array
            alt={product.title} // Use 'title' instead of 'titre'
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase" style={{ color: "#e59d26" }}>
            {product.category.name}
          </h4>
          <h1 className="display-5" style={{ color: "#9e572e", fontFamily: "Poppins" }}>
            {product.title}
          </h1>
          <p className="lead fw-bolder" style={{ color: "#e59d26", fontFamily: "Poppins" }}>
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4" style={{ color: "#9e572e", fontFamily: "Poppins" }}>
            {product.price}
          </h3>
          <p className="lead" style={{ color: "#2f2d3c", fontFamily: "Poppins" }}>
            {product.description}
          </p>
          <Link
          to="#"
          className="btn btn-outline-dark px-4 py-2"
          onClick={() => handleCommandeSubmit(product)} // Call the function to add to cart
          style={{ backgroundColor: "#e59d26", color: "#ffffff", fontFamily: "Poppins", borderColor: "#e59d26" }}
        >
          Commander
        </Link>
          {orderId && (
            <Modal
              isOpen={commandeModalIsOpen}
              onRequestClose={handleCommandeModalClose}
              style={customModalStyles}
            >
              <button onClick={handleCommandeModalClose}>Fermer</button>
              <br />
              <br />

              <p className="text-center text-success fw-bold">
                La Commande est passée avec succès et ID de la commande est:{" "}
                {orderId}
              </p>
              <div style={customModalStyles.buttonContainer}>
                <button
                  className="d-flex justify-content-center btn btn-secondary fixed-bottom p-3 text-center"
                  onClick={() => {
                    handleCommandeModalClose();
                    setPaymentModalIsOpen(true);
                  }}
                >
                  Payer ma commande
                </button>
              </div>
            </Modal>
          )}
          <NotLoggedInModal
            isOpen={notLoggedInModalIsOpen}
            handleClose={handleNotLoggedInModalClose}
            handleLogin={() => navigate('/login')}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
