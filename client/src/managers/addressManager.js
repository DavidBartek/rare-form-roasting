const _apiUrl = "/api/shippingaddress";

export const createNewAddress = (addressObj) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addressObj)
    }).then((res) => res.json());
};

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