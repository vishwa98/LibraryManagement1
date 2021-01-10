const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "/api/";

export const displayUsers = (sortUsers) => {
  return fetch(`${API}allusers?sortPro=${sortUsers}&orderPro=desc&limit=9`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const displaySingleUser = (userId) => {
  return fetch(`${API}admin/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in fetch request: ", err);
    });
};

export const getBorrowedBooks = (userId) => {
    return fetch(`${API}user/${userId}/borrowedbooks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log("not data returned!", err);
      });
  };

  export const lendBook = (userId, wishId) => {
    return fetch(`${API}user/addlend`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ userId, wishId }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const updatePro = (productId, token, product) => {

    console.log("API LIBRARY", product);
    return fetch(`${API}book/update/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const displaySingleProduct = (productId) => {
    return fetch(`${API}product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log("Error in fetch request: ", err);
      });
  };


export const displayCategories = () => {
  return fetch(`${API}categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const displayFilteredProducts = (limit, filters = {}) => {
  const data = {
    limit,
    filters,
  };

  return fetch(`${API}products/filter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
