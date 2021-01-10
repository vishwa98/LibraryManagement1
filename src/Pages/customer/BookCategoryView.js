import React, { useState, useEffect } from "react";
import Content from "./Content";
import { displayCategories, displayFilteredBooks } from "./customerBackEnd";
import Checkbox from "./Checkbox";
import BookCategoryViewUI from "./BookCategoryViewUI";


const BookCategoryView = () => {
  const [filteredProducts, setfilteredProducts] = useState({
    filtertype: { category: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(1000);
  const [filteredResults, setFilteredResults] = useState([]);

  const categoriesCheckBox = () => {
    displayCategories().then((catdata) => {
      if (!catdata) return;
      if (catdata.error) {
        setError(catdata.error);
      } else {
        setCategories(catdata.data);
      }
    });
  };

  const displayLibraryBooks = (newFilters) => {
    displayFilteredBooks(limit, newFilters).then((data) => {
      if (!data) return;
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
      }
    });
  };

  useEffect(() => {
    categoriesCheckBox();
    displayLibraryBooks(limit, filteredProducts.filters);
  }, []);

  //filter the products according to the category

  const filterProducts = (filtertype, filterBy) => {
    const categoryPriceFilteredProducts = { ...filteredProducts };

    categoryPriceFilteredProducts.filtertype[filterBy] = filtertype;

    displayLibraryBooks(filteredProducts.filtertype);

    setfilteredProducts(categoryPriceFilteredProducts);
  };



  return (
    <Content>
      <div>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
        {/* Header section */}

        {/* Header section end */}
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>BOOK CATEGORIES</h4>
            <div className="site-pagination">
              <h6>Find your favourite books</h6>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* Category section */}
        <section className="category-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <div className="filter-widget">
                  <h2 className="fw-title">Categories</h2>
                  <ul className="category-menu">
                    <Checkbox
                      categories={categories}
                      filterProducts={(filtertype) =>
                        filterProducts(filtertype, "category")
                      }
                    />
                  </ul>
                </div>

              </div>
              <div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
                <div className="row">
                  <div className="row">
                    {filteredResults.map((product, j) => (
                      <div key={j} className="col-4 mb-3">
                        <BookCategoryViewUI product={product} />
                      </div>
                    ))}
                  </div>


                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Category section end */}
      </div>
    </Content>
  );
};

export default BookCategoryView;
