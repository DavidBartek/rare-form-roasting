const _apiUrl = "/api/product";

export const getAllLiveProducts = (params) => {
    if (params) {
        return fetch(`${_apiUrl}?sort=${params}`).then((res) => res.json());
    }
    else {
        return fetch(`${_apiUrl}`).then((res) => res.json());
    }
};

export const getProductDetails = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}

export const getGrinds = () => {
    return fetch(`${_apiUrl}/grinds`).then((res) => res.json());
}

export const getWeights = () => {
    return fetch(`${_apiUrl}/weights`).then((res) => res.json());
}

export const getWeightById = (weightId) => {
    return fetch(`${_apiUrl}/weights/${weightId}`).then((res) => res.json());
}

// admin-specific fetch calls
export const getAllProductsAdmin = (params) => {
    if (params) {
        return fetch(`${_apiUrl}/admin?sort=${params}`).then((res) => res.json());
    }
    else {
        return fetch(`${_apiUrl}/admin`).then((res) => res.json());
    }
};

export const createNewProductAdmin = (newProductObj) => {
    return fetch(`${_apiUrl}/admin/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductObj)
    }).then((res) => res.json());
};

export const removeProductAdmin = (productId) => {
    return fetch(`${_apiUrl}/admin/setnotlive/${productId}`, {
        method: "DELETE"
    });
};

export const addProductToShopAdmin = (productId) => {
    return fetch(`${_apiUrl}/admin/setlive/${productId}`, {
        method: "DELETE"
    });
};

export const modifyProductAdmin = (productObj) => {
    return fetch(`${_apiUrl}/admin/modify/${productObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productObj)
    });
};