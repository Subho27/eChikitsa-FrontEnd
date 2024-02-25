import React from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";

function DashboardDoctor() {

    return (
        <div>
            <DoctorHeaderHelper data="monitor"/>
            <p>Monitor</p>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;