// TokenExpirationHandler.js
import React, { useEffect } from 'react';
import { getJwtTokenFromLocalStorage, removeJwtTokenFromLocalStorage } from "../../resources/storageManagement";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function isTokenExpired(token) {
    if (!token) return true; // Token not present
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const expirationTime = tokenData.exp*1000; // Expiration time in milliseconds
    console.log(expirationTime, " ",tokenData.exp, " ",Date.now())
    return Date.now() >= expirationTime; // Check if current time is past expiration time
}

function logoutAndRedirect(navigate, redirectTo) {
    // Clear stored token from localStorage or sessionStorage
    try{
        removeJwtTokenFromLocalStorage();
        console.log("before nav")
        // Redirect user to specified page
        // navigate(redirectTo);
        console.log("after nav")
    }
    catch (error) {
        alert("Your session has been ended. :(");
        navigate(redirectTo);
    }
}

function withTokenExpirationCheck(WrappedComponent) {
    return function TokenExpirationHandler(props) {
        const navigate = useNavigate();

        // Setup Axios interceptor outside useEffect
        const responseInterceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401 || status === 500) {
                        // If server responds with 401 or 500, token might be expired or there's a server error
                        // logoutAndRedirect(navigate, '/login'); // Logout and redirect to login page
                    }
                }
                // Allow other errors to be propagated
                return Promise.reject(error);
            }
        );

        useEffect(() => {
            return () => {
                // Cleanup: Remove response interceptor when component unmounts
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [responseInterceptor]);

        useEffect(() => {
            const token = getJwtTokenFromLocalStorage();
            if (isTokenExpired(token)) {
                logoutAndRedirect(navigate, '/login'); // Logout and redirect to login page if token has expired
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };
}

export default withTokenExpirationCheck;
