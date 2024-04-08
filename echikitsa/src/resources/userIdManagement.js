// Save JWT token to localStorage
const saveUserIdToLocalStorage = (token) => {
    localStorage.setItem('userid', token);
};

// Retrieve JWT token from localStorage
const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userid');
};

// Remove JWT token from localStorage (logout)
const removeUserIdFromLocalStorage = () => {
    localStorage.removeItem('userid');
};

export { saveUserIdToLocalStorage, getUserIdFromLocalStorage, removeUserIdFromLocalStorage };