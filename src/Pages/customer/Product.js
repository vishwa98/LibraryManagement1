import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displaySingleProduct } from "./customerBackEnd";
import SingleProUI from "./SingleProUI";
import Rating from "./Rating";

const Product = (props) => {
  const [singleProduct, setSingleProduct] = useState({});
  const [error, setError] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [product, setProduct] = useState({});


  //Get the single product data
  const selectedProductView = (productId) => {
    displaySingleProduct(productId)
      .then((sproduct) => {
        if (sproduct && sproduct.error) {
          setError(sproduct.error);
        } else if (sproduct) {
          setSingleProduct(sproduct);
          setProduct(sproduct);
          setRatings(average(sproduct.ratings));
        } else {
          console.log("Could not load the product..");
        }
      })
      .catch((error) => {
        console.error("Error in the product view, when retrieving: ", error);
      });
  };

  useEffect(() => {
    props.updateNavBar();
    const productId = props.match.params.productId;
    console.log(productId);
    selectedProductView(productId);
  }, []);

  const showPostRatings = (ratings) => {
    setRatings(ratings);
  };


  const average = (nums) => {
    if (!nums.length) return 0;
    let sum = 0;
    for (let i = 0; i < nums.length; ++i) sum += parseInt(nums[i].text);
    return sum / nums.length;
  };

  return (
    <Content>
      <div className="container">
        <div>
          {/* Page info */}
          <div className="page-top-info">
            <div className="container">
              <h4>Single Product</h4>
              <div className="site-pagination">
                <h6>Single Product View</h6>
              </div>
            </div>
          </div>
          {/* Page info end */}
          {/* product section */}

          {singleProduct && singleProduct.author && (
            <SingleProUI
              updateNavBar={props.updateNavBar}
              productId={product._id}
              product={singleProduct}
              viewProductBtn={false}
            />
          )}

          {/* product section end */}

          {/* Comments */}
          {product && (
            <div className="d-flex justify-content-between">
              <Rating
                productId={product._id}
                ratings={ratings}
                showPostRatings={showPostRatings}
              />
              <h3>{ratings.toFixed(1)}</h3>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

export default Product;
