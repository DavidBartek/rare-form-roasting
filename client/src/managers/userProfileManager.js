const _apiUrl = "/api/userprofile";

export const getUsers = () => {
    return fetch(`${_apiUrl}`).then((res) => res.json());
};

export const getUsersWithRolesAndEmail = () => {
    return fetch(`${_apiUrl}/withrolesandemail`).then((res) => res.json());
};

export const getUserDetails = (userId) => {
    return fetch(`${_apiUrl}/${userId}`).then((res) => res.json());
};

export const getUserDetailsWithRolesAndEmail = (userId) => {
    return fetch(`${_apiUrl}/${userId}/withrolesandemail`).then((res) => res.json());
};

export const updateUserDetails = (userId, userFirst, userLast, userEmail) => {
    return fetch (`${_apiUrl}/${userId}?newFirst=${userFirst}&newLast=${userLast}&newEmail=${userEmail}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"}
    });
};
