// Save UserId to localStorage
const saveUserIdToLocalStorage = (token) => {
    localStorage.setItem('userid', token);
};

// Retrieve UserId from localStorage
const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userid');
};

// Remove UserId from localStorage (logout)
const removeUserIdFromLocalStorage = () => {
    localStorage.removeItem('userid');
};

export { saveUserIdToLocalStorage, getUserIdFromLocalStorage, removeUserIdFromLocalStorage };