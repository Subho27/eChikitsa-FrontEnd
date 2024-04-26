import {getJwtTokenFromLocalStorage, removeJwtTokenFromLocalStorage} from "../../resources/storageManagement";
import {removeUserIdFromLocalStorage} from "../../resources/userIdManagement";
import {useNavigate} from "react-router-dom";



export const isTokenExpired = (logout) => {
    const token = getJwtTokenFromLocalStorage(); // Assuming token is stored in localStorage
    if (!token) {removeJwtTokenFromLocalStorage();
        removeUserIdFromLocalStorage();

        // alert("Session has been expired");
        return true;} // Token not present
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const expirationTime = tokenData.exp * 1000; // Expiration time in milliseconds
    if (Date.now() >= expirationTime) {
        // Token is expired, call logout function
        removeJwtTokenFromLocalStorage();
        removeUserIdFromLocalStorage();

        alert("Session has been expired1");
        return true;

    }
    return false; // Token is not expired
};