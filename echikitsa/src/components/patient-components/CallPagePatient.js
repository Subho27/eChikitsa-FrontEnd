import React, {useEffect} from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import CallPageHelper from "../helper-components/helper-patient/CallPageHelper";
import {useNavigate} from "react-router-dom";
import {isTokenExpired} from "../route-guard/utility";

function CallPagePatient() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);

    return(
        <div>
            <CallPageHelper/>
        </div>
    );
}

export default CallPagePatient;