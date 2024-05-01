import React, {useEffect} from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import RecordsHelper from "../helper-components/helper-patient/RecordsHelper";
import {useNavigate} from "react-router-dom";
import {isTokenExpired} from "../route-guard/utility";

function RecordsPatient() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);

    return(
        <div>
            <PatientHeaderHelper data="record"/>
            <RecordsHelper/>
            <FooterHelper/>
        </div>
    );
}

export default RecordsPatient;