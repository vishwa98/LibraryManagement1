import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LoginPart from "./LoginPart";
import { USER_ID, TOKEN } from "../../Util";
import {
  IsCustomerLoggedIn,
  Logout,
  IsLoggedIn,
} from "../../Util";

export default function Navigation({ shouldUpdate }) {
  const onClickLogout = () => {
    Logout();
    updateStates();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(IsLoggedIn());
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(
    IsCustomerLoggedIn()
  );

  // use effect hook to update the states
  useEffect(() => {
    updateStates();
    return () => {};
  }, [shouldUpdate]);

  const updateStates = () => {
    setIsLoggedIn(IsLoggedIn());
    setIsCustomerLoggedIn(IsCustomerLoggedIn());
  };

  const userId = localStorage.getItem(USER_ID);

  return (
    <header className="header-section">
      <div className="container">
        <div className="header-top">
          <div className="row">
            <div className="col-lg-2 text-center text-lg-left">
              {/* logo */}
              <NavLink to="/" className="site-logo">

              </NavLink>
            </div>
            <div className="col-xl-6 col-lg-5">
              <form className="header-search-form">
                <input placeholder="Welcome to Colombo Library !" />

                <button>
                  <i className="flaticon-search" />
                </button>
              </form>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="user-panel">
                <LoginPart
                  isLoggedIn={isLoggedIn}
                  onClickLogout={onClickLogout}
                  isCustomerLoggedIn={isCustomerLoggedIn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="contain navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav mr-auto d-lg-flex justify-content-lg-around"
              style={{ width: "100%" }}
            >
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/shop">
                  Book Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-5" to="/Borrowings">
                  My Borrowings
                </NavLink>
              </li>
              {isCustomerLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link mx-5" to={`/profile/${userId}`}>
                    My Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
