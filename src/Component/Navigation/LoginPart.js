import React from "react";
import { NavLink, Link } from "react-router-dom";
import { USER_ID, TOKEN } from "../../Util";

export default function LoginPart({
  isLoggedIn,
  onClickLogout,
  isCustomerLoggedIn,
  isAdminLoggedIn,
}) {

  const userId = localStorage.getItem(USER_ID);

  return (
    <>
      <div className="up-item">
        <i className="flaticon-profile mr-3" />
        {isLoggedIn ? (
          <Link to="/" onClick={onClickLogout}>
            Sign Out
          </Link>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink> or{" "}
            <NavLink to="/signup">Create Account</NavLink>
          </>
        )}
      </div>
      {isCustomerLoggedIn || !isLoggedIn ? (
        <div className="up-item">


        </div>

      ) : (
        <div className="up-item">
          <Link
            to={isAdminLoggedIn ? "/admin" : "/librarian"}
            className="btn btn-primary"
            style={{ color: "white" }}
          >
            Dashboard
          </Link>
        </div>
      )}
    </>
  );
}
