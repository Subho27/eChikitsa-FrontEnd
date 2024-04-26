import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useEffect, useState} from "react";
import {getJwtTokenFromLocalStorage} from "../../resources/storageManagement";
import {getRoleFromLocalStorage} from "../../resources/userIdManagement";

const ProtectedRoute = (props) => {
    const{Component,role} = props;
    const { user } = useAuth();
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        let token = getJwtTokenFromLocalStorage()
        let who = getRoleFromLocalStorage()
        if(token !== null && who === role )
        {
            setAuthenticated(true);


        }
     else {
            navigate('/login')
    }
    }, [navigate]);
    return authenticated ? <Component /> : null

};

export default ProtectedRoute;