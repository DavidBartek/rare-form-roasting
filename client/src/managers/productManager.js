const _apiUrl = "/api/product";

export const getAllProducts = () => {
    return fetch(`${_apiUrl}`).then((res) => res.json());
};