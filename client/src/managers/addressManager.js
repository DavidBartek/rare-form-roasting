const _apiUrl = "/api/shippingaddress";

export const updateAddressDetails = (addressId, updatedAddress) => {
    console.log(addressId)
    console.log(updatedAddress);
    
    return fetch (`${_apiUrl}/${addressId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedAddress)
    });
};