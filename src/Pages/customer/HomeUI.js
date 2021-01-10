import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImage from "./ProductImage";

const HomeUI = ({ product, viewProductBtn = true }) => {
  const [count, setCount] = useState(product.count);

  //Single Book View

  const viewSingleProduct = (viewProductBtn) => {
    return (
      viewProductBtn && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-info">View</button>
        </Link>
      )
    );
  };

  return (
    <div>
      <div className="col-lg-10 col-sm-6">
        <div className="product-item">
          <div className="pi-pic">
            <ProductImage pro={product} url="product"></ProductImage>
            <div className="pi-links"></div>
          </div>
          <div className="pi-text">
            <h6>Author - {product.author}</h6>
            <p>{product.name}</p>
            <h6>{viewSingleProduct(viewProductBtn)}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUI;
