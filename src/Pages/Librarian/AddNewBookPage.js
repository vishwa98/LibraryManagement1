import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { GetToken, IsLibranianLoggedIn } from "../../Util";
import {} from "../..";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "/api/";

export default function AddNewBookPage({ history }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!IsLibranianLoggedIn()) {
      history.push("/forbidden", {
        pageTriedToAccess: "/librarian/create/product",
      });
    } else {
      fetch(`${URL}categories/`)
        .then((res) => res.json())
        .then((categoriesRes) => setCategories(categoriesRes.data));
    }
    return () => {};
  }, []);

  const onClickSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("formId"));

    fetch(`${URL}product/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          history.push("/librarian", {
            success: true,
            msg: "Successfully added the book",
          });
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const options =
    categories &&
    categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.type}
      </option>
    ));

  const errorAlert = (msg) => {
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  };

  return (
    <Content>
      <div className="container mt-5 mb-5">
        {error && errorAlert(error)}
        <form id="formId" onSubmit={onClickSubmitForm}>
          <div className="form-group">
            <label htmlFor="inputProductName">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              placeholder="Product Name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAuthor">Author:</label>
            <input
              type="text"
              className="form-control"
              id="inputAuthor"
              placeholder="Author"
              name="author"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputIsbn">ISBN:</label>
            <input
              type="number"
              className="form-control"
              id="inputIsbn"
              placeholder="Isbn"
              name="isbn"
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="inputPublisher">Publisher:</label>
            <input
              type="text"
              className="form-control"
              id="inputPublisher"
              placeholder="Publisher"
              name="publisher"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputLanguage">Language:</label>
            <input
              type="text"
              className="form-control"
              id="inputLanguage"
              placeholder="Language"
              name="language"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputStatus">Status:</label>
            <input
              type="text"
              className="form-control"
              id="inputStatus"
              placeholder="Status"
              name="status"
              maxLength={1000}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputCategory">Category:</label>
            <select
              required
              className="form-control"
              id="inputCategory"
              name="category"
            >
              {options && options}
              {!options && "No Categories"}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputPhoto">Photo:</label>
            <input
              type="file"
              className="form-control"
              id="inputPhoto"
              placeholder="Photo"
              name="photo"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Content>
  );
}
