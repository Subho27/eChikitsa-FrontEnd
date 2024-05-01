import React, {useEffect} from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import DashboardHelper from "../helper-components/helper-doctor/DashboardHelper";
import FooterHelper from "../helper-components/FooterHelper";
import {isTokenExpired} from "../route-guard/utility";
import {useNavigate} from "react-router-dom";

function DashboardDoctor() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")

        }

    }, []);

    return (
        <div>
            <DoctorHeaderHelper data="dashboard"/>
            <DashboardHelper/>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;