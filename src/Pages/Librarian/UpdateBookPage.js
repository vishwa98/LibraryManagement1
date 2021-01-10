import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { GetToken, IsLibranianLoggedIn } from "../../Util";
import {} from "../..";
const URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "/api/";

export default function UpdateProductPage(props) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!IsLibranianLoggedIn()) {
      props.history.push("/forbidden", {
        pageTriedToAccess: "/librarian/update/product",
      });
    } else {
      fetch(`${URL}categories/`)
        .then((res) => res.json())
        .then((categoriesRes) => setCategories(categoriesRes.data));

      fetch(`${URL}product/${props.match.params.id}`)
        .then((res) => res.json())
        .then((categoriesRes) => setProduct(categoriesRes))
        .catch((err) => console.log(err));
    }
    return () => {};
  }, []);

  const updateValue = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClickSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("formId"));
    fetch(`${URL}product/update/${product._id}`, {
      method: "PUT",
      body: form,
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          props.history.push("/librarian", {
            success: true,
            msg: "Successfully updated the book",
          });
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options =
    categories &&
    categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.gender}
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
        {product && (
          <form id="formId" onSubmit={onClickSubmitForm}>
            <div className="form-group">
              <label htmlFor="inputProductName">Book Name:</label>
              <input
                type="text"
                className="form-control"
                id="inputProductName"
                placeholder="Product Name"
                name="name"
                value={product.name}
                onChange={updateValue}
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
                value={product.author}
                maxLength={1000}
                required
                onChange={updateValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputIsbn">ISBN:</label>
              <input
                type="text"
                className="form-control"
                id="inputIsbn"
                placeholder="ISBN"
                name="isbn"
                value={product.isbn}
                maxLength={1000}
                required
                onChange={updateValue}
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
                value={product.publisher}
                maxLength={1000}
                required
                onChange={updateValue}
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
                value={product.language}
                maxLength={1000}
                required
                onChange={updateValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputProductName">Status:</label>
              <input
                type="text"
                className="form-control"
                id="inputStatus"
                placeholder="Status"
                name="status"
                value={product.status}
                onChange={updateValue}
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
                value={product.category}
                onChange={updateValue}
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
                onChange={updateValue}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </Content>
  );
}
