import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displayproducts } from "./customerBackEnd";
import HomeUI from "./HomeUI";

const Home = () => {
  const [latestBookProductsArrived, setlatestBookProductsArrived] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  //Display the latest released clothing brands in the home page

  const latestArrivals = () => {
    displayproducts("createdAt").then((data) => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        setlatestBookProductsArrived(data);
      }
    });
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
              <h2>BOOKS LIST</h2>
            </div>

            <div className="row">
              {latestBookProductsArrived.map((latestBookProducts, j) => (
                <div key={j} className="col-4 mb-3">
                  <HomeUI key={j} product={latestBookProducts} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

    </Content>
  );
};

export default Home;
