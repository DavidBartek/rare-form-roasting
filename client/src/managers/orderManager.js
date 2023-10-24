const _apiUrl = "/api/order";

// get all noncurrent orders for a given user (viewed in UserOrderList)
export const getUserOrders = (userId) => {
    return fetch(`${_apiUrl}/noncurrent/${userId}`).then((res) => res.json());
};

// add a given product to cart, passes in userId
export const addToCart = (newOrderProduct, userId) => {
    return fetch(`${_apiUrl}/addtocart/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderProduct),
    }).then((res) => res.json());
};

// if exists, gets the current in-process order for a logged-in user
export const getCurrentOrder = (userId) => {
    return fetch(`${_apiUrl}/current/${userId}`).then((res) => res.json());
};

export const subtractOne = (opId) => {
    return fetch(`${_apiUrl}/subtract/${opId}`, {
        method: "DELETE"
    });
};

export const addOne = (opId) => {
    return fetch(`${_apiUrl}/add/${opId}`, {
        method: "DELETE"
    });
};