import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "../customer/Content";
import BorrowedBooksUI from "./BorrowedBooksUI";
import { TOKEN, USER_ID } from "../../Util";
import { getBorrowedBooks } from "./ApiLibrary";

const BorrowedBooks = (props) => {
  const [booksBorrowed, setbooksBorrowed] = useState([]);
  const [run, setRun] = useState(false);

  const loadBooks = () => {
    const userId = props.match.params.userId;
    const token = localStorage.getItem(TOKEN);
    getBorrowedBooks(userId).then((bookBorrowed) => {
      console.log(bookBorrowed);
      setbooksBorrowed(bookBorrowed);
      return bookBorrowed;
    });
  };

  useEffect(() => {
    loadBooks();
  }, [run]);

  const showBooksBorrowed = (newBorrowings) => {
    setbooksBorrowed(newBorrowings);
  };

  const showItems = (booksBorroweds) => {
    return (
      <div>
        <hr />
        {booksBorroweds.map((product, i) => (
          <BorrowedBooksUI
            key={i}
            product={product}
            showBooksBorrowed={showBooksBorrowed}
            booksBorrowed={booksBorrowed}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const emptyBorrowedBooks = () => (
    <h2>
      This member hasn't borrowed any books yet. <br />{" "}

    </h2>
  );


  return (
    <Content>
      <div>
        {/* Page info */}
        <div className="page-top-info">
          <div className="container">
            <h4>Borrowed Books</h4>
            <div className="site-pagination">
              <a>Home</a> /<a>Borrowed Books</a>
            </div>
          </div>
        </div>
        {/* Page info end */}
        {/* product section */}
        <div className="container">
          {booksBorrowed.length > 0
            ? showItems(booksBorrowed)
            : emptyBorrowedBooks()}

          {/* product section end */}
        </div>
      </div>
    </Content>
  );
};

export default BorrowedBooks;
