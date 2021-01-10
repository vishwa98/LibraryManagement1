import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { displayUser, updateInfo } from "./userUpdate";
import { TOKEN, UpdateEmailOnStorage, IsCustomerLoggedIn } from "../../Util";

const Profile = (props) => {
  useEffect(() => {
    if (!IsCustomerLoggedIn()) {
      props.history.push("/forbidden", {
        pageTriedToAccess: "/profile",
      });
    }
    return () => {};
  }, []);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    address1: "",
    address2: "",
    postalCode: "",
    error: false,
  });

  const token = localStorage.getItem(TOKEN);

  const {
    firstName,
    lastName,
    email,
    password,
    city,
    address1,
    address2,
    postalCode,
    error,
  } = values;

  const userinfo = (userId) => {
    displayUser(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          city: data.city,
          address1: data.address1,
          address2: data.address2,
          postalCode: data.postalCode,
        });
      }
    });
  };

  useEffect(() => {
    userinfo(props.match.params.userId);
  }, []);

  const handleChange = (firstName) => (e) => {
    setValues({ ...values, error: false, [firstName]: e.target.value });
  };

  const updateSubmit = (e) => {
    e.preventDefault();

    updateInfo(props.match.params.userId, token, {
      firstName,
      lastName,
      email,
      password,
      city,
      address1,
      address2,
      postalCode,
    }).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        UpdateEmailOnStorage(data.email);

        alert("Update Successful");
      }
    });
  };

  const updateDetails = (
    firstName,
    lastName,
    email,
    password,
    city,
    address1,
    address2,
    postalCode
  ) => (
    <form>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          onChange={handleChange("firstName")}
          className="form-control"
          value={firstName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lasttName">Last Name</label>
        <input
          type="text"
          onChange={handleChange("lastName")}
          className="form-control"
          value={lastName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          onChange={handleChange("city")}
          className="form-control"
          value={city}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address1">Address 1</label>
        <input
          type="text"
          onChange={handleChange("address1")}
          className="form-control"
          value={address1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address2">Address 2</label>
        <input
          type="text"
          onChange={handleChange("address2")}
          className="form-control"
          value={address2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          onChange={handleChange("postalCode")}
          className="form-control"
          value={postalCode}
        />
      </div>

      <button onClick={updateSubmit} className="btn btn-primary">
        Update
      </button>
    </form>
  );

  return (
    <Content>
      <div className="container mt-5 mb-5">
        <div>
          {/* Page info */}
          <div className="page-top-info">
            <div className="container">
              <h4>Edit Profile</h4>
              <div className="site-pagination">
                <h6>Update your profile details here</h6>
              </div>
            </div>
          </div>

          {updateDetails(
            firstName,
            lastName,
            email,
            password,
            city,
            address1,
            address2,
            postalCode
          )}
        </div>
      </div>
    </Content>
  );
};

export default Profile;
