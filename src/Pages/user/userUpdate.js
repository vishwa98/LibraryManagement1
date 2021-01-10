const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "/api/";

export const displayUser = (userId, token) => {
    return fetch(`${API}user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateInfo = (userId, token, user) => {
    console.log("API USER", user);
    return fetch(`${API}user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

