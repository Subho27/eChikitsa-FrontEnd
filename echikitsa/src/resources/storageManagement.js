// Save JWT token to localStorage
const saveJwtTokenToLocalStorage = (token) => {
    localStorage.setItem('jwtToken', token);
};

// Retrieve JWT token from localStorage
const getJwtTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken');
};

// Remove JWT token from localStorage (logout)
const removeJwtTokenFromLocalStorage = () => {
    localStorage.removeItem('jwtToken');
};

export { saveJwtTokenToLocalStorage, getJwtTokenFromLocalStorage, removeJwtTokenFromLocalStorage };