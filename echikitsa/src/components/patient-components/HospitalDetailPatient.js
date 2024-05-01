import React, {useEffect} from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import HospitalHelper from "../helper-components/helper-patient/HospitalHelper";
import {useNavigate} from "react-router-dom";
import {isTokenExpired} from "../route-guard/utility";

function HospitalDetailPatient() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);

    return(
        <div>
            <PatientHeaderHelper/>
            <HospitalHelper/>
            <FooterHelper/>
        </div>
    );
}

export default HospitalDetailPatient;