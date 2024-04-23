import React, { Fragment, useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let { token ,setToken } = useContext(authContext);
 let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/Login");
    setToken(null)
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
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
            {token ? (
              <Fragment>
                {" "}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>{" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                </ul>
              </Fragment>
            ) : null}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>

              {token ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={logOut}>
                    Logout
                  </button>
                </li>
              ) : (
                <Fragment>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
