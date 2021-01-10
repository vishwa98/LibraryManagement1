import React, { useState } from "react";
import ProductImage from "../customer/ProductImage";


const BorrowedBooksUI = ({
  product,
}) => {
  const emptyBorrowedBooks = () => (
    <h2>
      Borrowed books are empty. <br />
    </h2>
  );

  return (
    <div className="card">
      {product == null ? emptyBorrowedBooks() : console.log("hiiii")}

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
              <h3 className="p-price">${product.price}</h3>

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

export default BorrowedBooksUI;
