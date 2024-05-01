import React, {useEffect} from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import ProfileHelper from "../helper-components/helper-patient/ProfileHelper";
import {useNavigate} from "react-router-dom";
import {isTokenExpired} from "../route-guard/utility";

function ProfilePatient() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);
    return(
        <div>
            <PatientHeaderHelper data="profile"/>
            <ProfileHelper/>
            <FooterHelper/>
        </div>
    );
}

export default ProfilePatient;