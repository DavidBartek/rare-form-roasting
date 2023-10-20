const _apiUrl = "/api/product";

export const getAllLiveProducts = (params) => {
    if (params) {
        return fetch(`${_apiUrl}?sort=${params}`).then((res) => res.json());
    }
    else {
        return fetch(`${_apiUrl}`).then((res) => res.json());
    }
};