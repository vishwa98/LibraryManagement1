import React, { useState, useEffect } from "react";
import Content from "../customer/Content";
import { displayproducts } from "../customer/customerBackEnd";
import LendBookUI from "./LendBookUI";

const LendBook = (props) => {
  const [latestbooksArrived, setlatestbooksArrived] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);


  //Display the latest released books in the home page

  const latestArrivals = () => {
    const userId = props.match.params.userId;
    displayproducts("createdAt").then((data) => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        setlatestbooksArrived(data);
      }
    });

    console.log("USER ID:", userId);
  };

  useEffect(() => {
    latestArrivals();
  }, []);

  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Hero section */}

        {/* Hero section end */}
        {/* Features section */}

        {/* Features section end */}

        {/* Product filter section */}
        <section className="product-filter-section">
          <div className="container">
            <div className="section-title">
              <h2>Select a book to lend</h2>
            </div>

            <div className="row">
              {latestbooksArrived.map((latestBookProducts, j) => (
                <div key={j} className="col-4 mb-3">
                  <LendBookUI key={j} product={latestBookProducts} userr={props.match.params.userId}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </Content>
  );
};

export default LendBook;
