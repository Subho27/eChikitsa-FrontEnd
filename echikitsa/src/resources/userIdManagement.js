// Save UserId to localStorage
const saveUserIdToLocalStorage = (userId,role) => {
    localStorage.setItem('userid', userId);
    localStorage.setItem('role', role);
};

// Retrieve UserId from localStorage
const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userid');
};
const getRoleFromLocalStorage = () => {
    return localStorage.getItem('role');
};

// Remove UserId from localStorage (logout)
const removeUserIdFromLocalStorage = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('role');
};

export { saveUserIdToLocalStorage, getUserIdFromLocalStorage, removeUserIdFromLocalStorage,getRoleFromLocalStorage };