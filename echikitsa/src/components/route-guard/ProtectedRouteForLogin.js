import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import {useEffect, useState} from "react";
import {getJwtTokenFromLocalStorage} from "../../resources/storageManagement";
import {getRoleFromLocalStorage} from "../../resources/userIdManagement";
import Home from "../common-components/Home";
import Login from "../common-components/Login";
import WelcomePatient from "../patient-components/WelcomePatient";
import DashboardDoctor from "../doctor-components/DashboardDoctor";
import WelcomeAdmin from "../admin-components/WelcomeAdmin";

const ProtectedRouteForLogin = (props) => {
    const{Component} = props;
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        let token = getJwtTokenFromLocalStorage()
        if(!token)
        {
            setAuthenticated(true);

        }

    }, [navigate]);
    let role = getRoleFromLocalStorage();
    if("PATIENT" === role)
    {

         return <WelcomePatient/>
    }
    else if("DOCTOR" === role)
    {
        return <DashboardDoctor/>

    }
    else if("ADMIN" === role)
    {
        return <WelcomeAdmin/>

    }
    else
    {
        return <Login/>
    }


};

export default ProtectedRouteForLogin;