import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "./Content";
import BorrowingsUI from "./BorrowingsUI";
import { TOKEN, USER_ID } from "../../Util";
import { getBorrowings } from "./customerBackEnd";

const Borrowings = () => {
  const [borrowedBooks, setborrowedBooks] = useState([]);
  const [run, setRun] = useState(false);

  const loadAllBooks = () => {
    const userId = localStorage.getItem(USER_ID);
    const token = localStorage.getItem(TOKEN);
    getBorrowings(userId, token).then((borrowing) => {
      console.log(borrowing);
      setborrowedBooks(borrowing);
      return borrowing;
    });
  };

  useEffect(() => {
    loadAllBooks();
  }, [run]);


  const showItems = (borrowedBookss) => {
    return (
      <div>
        <hr />
        {borrowedBookss.map((product, i) => (
          <BorrowingsUI
            key={i}
            product={product}
            removeBorrowBtn={true}
            borrowedBooks={borrowedBooks}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const emptyBorrowings = () => (
    <h2>
      Your haven't borrowed any books yet. <br />{" "}
    </h2>
  );

  return (
    <Content>
      <div>
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>Wish List</h4>
            <div className="site-pagination">
              <a>Home</a> /<a>Wish List</a>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* product section */}
        <div className="container">
          {borrowedBooks.length > 0
            ? showItems(borrowedBooks)
            : emptyBorrowings()}

          {/* product section end */}
        </div>
      </div>
    </Content>
  );
};

export default Borrowings;
