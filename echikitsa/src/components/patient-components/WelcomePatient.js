import React, {useEffect} from "react";
import WelcomeHelper from "../helper-components/helper-patient/WelcomeHelper";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import {useLocation, useNavigate} from "react-router-dom";
import {isTokenExpired} from "../route-guard/utility";

function WelcomePatient() {
    const {state}=useLocation();
    // const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            // navigate("/login")

        }

    }, []);


    return(

        <div>
            <PatientHeaderHelper data="welcome"/>
            <WelcomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default WelcomePatient;