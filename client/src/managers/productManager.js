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