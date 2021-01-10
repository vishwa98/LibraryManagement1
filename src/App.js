import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Component/Navigation/Navigation";
import IndexPage from "./Pages/Main/IndexPage";
import LoginPage from "./Pages/Main/LoginPage";
import SignUpPage from "./Pages/Main/SignUpPage";



import Home from "./Pages/customer/Home";
import BookCategoryView from "./Pages/customer/BookCategoryView";
import Product from "./Pages/customer/Product";
import Borrowings from "./Pages/customer/Borrowings";
import Profile from "./Pages/user/Profile";


import LibrarianDashboard from "./Pages/Librarian/LibrarianDashboard";
import Forbidden from "./Pages/Main/Forbidden";
import AddNewBookPage from "./Pages/Librarian/AddNewBookPage";
import UpdateBookPage from "./Pages/Librarian/UpdateBookPage";
import AllUsers from "./Pages/Librarian/AllUsers";
import BorrowedBooks from "./Pages/Librarian/BorrowedBooks";
import LendBook from "./Pages/Librarian/LendBook";

function App() {
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const updateNavigationBarStates = () => {
    setShouldUpdate(!shouldUpdate);
  };

  return (
    <>
      <BrowserRouter>
        <Navigation shouldUpdate={shouldUpdate} />
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/shop" exact component={BookCategoryView} />
          <Route
            path="/signin"
            exact
            render={(props) => (
              <LoginPage {...props} updateNavBar={updateNavigationBarStates} />
            )}
          />
          <Route
            path="/signup"
            exact
            render={(props) => (
              <SignUpPage {...props} updateNavBar={updateNavigationBarStates} />
            )}
          />
          <Route
            path="/product/:productId"
            exact
            render={(props) => (
              <Product {...props} updateNavBar={updateNavigationBarStates} />
            )}
          />

          <Route path="/admin/user/:userId" exact component={BorrowedBooks} />
          <Route path="/admin/lend/:userId" exact component={LendBook} />
          <Route path="/Borrowings" exact component={Borrowings} />
          <Route path="/Profile" exact component={Profile} />
          <Route path="/profile/:userId" exact component={Profile} />

          <Route path="/librarian" exact component={LibrarianDashboard} />
          <Route
            path="/librarian/create/product"
            exact
            component={AddNewBookPage}
          />

          <Route
            path="/librarian/update/product/:id"
            exact
            component={UpdateBookPage}
          />

          <Route path="/admin/users" exact component={AllUsers} />

          <Route path="/forbidden" exact component={Forbidden} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
