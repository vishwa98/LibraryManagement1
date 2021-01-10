import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";
import { removeFromBorrowings } from "./customerBackEnd";
import { USER_ID, TOKEN } from "../../Util";
import { NavLink } from "react-router-dom";

const BorrowingsUI = ({
  product,
  viewProductBtn = true,
  removeBorrowBtn = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [showHomePage, setshowHomePage] = useState(false);
  // const [count, setCount] = useState((product) ? 0 : product.count);

  const viewSingleBook = (viewProductBtn) => {
    return (
      viewProductBtn && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-info">View Book Details</button>
        </Link>
      )
    );
  };

  const redirectToHome = (showHomePage) => {
    if (showHomePage) {
      return <Redirect to="/"></Redirect>;
    }
  };

  const removeBorrow = (removeBorrowBtn) => {
    const userId = localStorage.getItem(USER_ID);
    const token = localStorage.getItem(TOKEN);

    return (
      removeBorrowBtn && (
        <button
          onClick={() => {
            removeFromBorrowings(userId, token, product._id).then((data) => {
              window.alert("Book Returned");
              setshowHomePage(true);
            });
          }}
          className="site-btn"
        >
          Return Book
        </button>
      )
    );
  };

  const emptyBooks = () => <h2>Your haven't borrowed any books yet..</h2>;

  return (
    <div className="card">
      {product == null ? emptyBooks() : console.log("No Borrowings")}

      {redirectToHome(showHomePage)}

      <section className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <ProductImage pro={product} url="product"></ProductImage>
              </div>
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{product.name}</h2>

              {removeBorrow(removeBorrowBtn)}

              <div id="accordion" className="accordion-area">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <button
                      className="panel-link active"
                      data-toggle="collapse"
                      data-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      information
                    </button>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="panel-body">
                      <p>Author - {product.author}</p>
                      <p>ISBN - {product.isbn}</p>
                      <p>Publisher - {product.publisher}</p>
                      <p>Language - {product.language}</p>
                      {viewSingleBook(viewProductBtn)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="social-sharing">
                <a>
                  <i className="fa fa-google-plus" />
                </a>
                <a>
                  <i className="fa fa-pinterest" />
                </a>
                <a>
                  <i className="fa fa-facebook" />
                </a>
                <a>
                  <i className="fa fa-twitter" />
                </a>
                <a>
                  <i className="fa fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BorrowingsUI;
