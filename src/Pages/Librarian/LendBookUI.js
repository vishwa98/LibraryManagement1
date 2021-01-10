import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "../customer/ProductImage";
import { TOKEN, USER_ID } from "../../Util";
import { lendBook, updatePro } from "./ApiLibrary";
import { IsLoggedIn } from "./../../Util/index";

const LendBookUI = (
  {
    product,
    viewProductBtn = true,
    bookLendBtn = true,
    setRun = (f) => f,
    run = undefined,
    userr,
  },
  props
) => {
  const [count, setCount] = useState(product.count);

  //Single Product View

  const viewSingleBook = (viewProductBtn) => {
    return (
      viewProductBtn && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-info">View</button>
        </Link>
      )
    );
  };

  useEffect(() => {
    console.log("Product ID:", product._id);
  }, [run]);

  //Lending a book

  const bookLend = (bookLendBtn) => {
    return (
      bookLendBtn && (
        <button className="btn btn-info" onClick={giveBook}>
          LEND
        </button>
      )
    );
  };

  const giveBook = (e) => {
    e.preventDefault();

    if (IsLoggedIn() == true) {
      const userId = userr;
      const token = localStorage.getItem(TOKEN);
      const productIdd = product._id;

      lendBook(userId, productIdd);

      alert(
        "Book has been lent. Please update the status and return date of the lent book"
      );
    } else {
      alert("Please Login to continue");
    }
  };

  return (
    <div>
      <div className="col-lg-10 col-sm-6">
        <div className="product-item">
          <div className="pi-pic">
            <ProductImage pro={product} url="product"></ProductImage>
            <div className="pi-links">{bookLend(bookLendBtn)}</div>
          </div>
          <div className="pi-text">
            <h6>Author - {product.author}</h6>
            <p>{product.name}</p>
            <strong>{product.status}</strong>
            <h6>{viewSingleBook(viewProductBtn)}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendBookUI;
