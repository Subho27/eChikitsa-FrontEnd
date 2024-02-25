import React from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import DashboardHelper from "../helper-components/helper-doctor/DashboardHelper";
import FooterHelper from "../helper-components/FooterHelper";

function DashboardDoctor() {

    return (
        <div>
            <DoctorHeaderHelper data="dashboard"/>
            <DashboardHelper/>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;