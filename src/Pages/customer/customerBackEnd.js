const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "/api/";

export const displayproducts = (sortProducts) => {
  return fetch(`${API}products?sortPro=${sortProducts}&orderPro=desc&limit=9`, {
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

export const displayFilteredBooks = (limit, filters = {}) => {
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





export const rat = (userId, token, productId, rating) => {
  return fetch(`${API}product/rating`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ userId, productId, rating }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBorrowings = (userId, token) => {
  return fetch(`${API}user/${userId}/borrowedbooks`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("not data returned!", err);
    });
};

export const removeFromBorrowings = (userId, token, productId) => {
  return fetch(`${API}user/${userId}/removeborrowing/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("not data returned!", err);
    });
};

