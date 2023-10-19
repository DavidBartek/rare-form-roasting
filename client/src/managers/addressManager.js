const _apiUrl = "/api/shippingaddress";

export const getAddressDetails = (addressId) => {
    return fetch(`${_apiUrl}/${addressId}`).then((res) => res.json());
};

export const updateAddressDetails = (updatedAddress) => {
    return fetch(`${_apiUrl}/${updatedAddress.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAddress)
    });
};

export const removeAddress = (addressId) => {
    return fetch(`${_apiUrl}/${addressId}`, {
        method: "DELETE"
    });
};