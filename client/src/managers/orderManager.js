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

// gets the current in-process order for a logged-in user
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

export const deleteOrderProduct = (opId) => {
    return fetch(`${_apiUrl}/delete/${opId}`, {
        method: "DELETE"
    });
};

export const placeOrder = (orderId, addressId) => {
    return fetch(`${_apiUrl}/submit/${orderId}?addressId=${addressId}`, {
        method: "DELETE"
    });
};

export const getJustPlacedOrder = (userId) => {
    return fetch(`${_apiUrl}/complete/${userId}`).then((res) => res.json());
}

// admin-only

export const getAllOrders = (params) => {
    if (params) {
        return fetch(`${_apiUrl}/admin?sort=${params}`).then((res) => res.json());
    }
    else {
        return fetch(`${_apiUrl}/admin`).then((res) => res.json());
    }
};

export const markOrderFulfilled = (orderId) => {
    return fetch(`${_apiUrl}/admin/fulfill/${orderId}`, {
        method: "DELETE"
    });
};

export const markOrderCancelled = (orderId) => {
    return fetch(`${_apiUrl}/admin/cancel/${orderId}`, {
        method: "DELETE"
    });
};