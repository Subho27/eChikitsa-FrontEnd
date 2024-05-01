import React, {useEffect} from "react";
import AdminWelcomeHelper from "../helper-components/helper-admin/AdminWelcomeHelper";
import FooterHelper from "../helper-components/FooterHelper";
import AdminHeaderHelper from "../helper-components/AdminHeaderHelper";
import {isTokenExpired} from "../route-guard/utility";
import {useNavigate} from "react-router-dom";

function WelcomeAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);


    return(
        <div>
            <AdminHeaderHelper data="welcome"/>
            <AdminWelcomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default WelcomeAdmin;