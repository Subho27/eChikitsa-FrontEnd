import React from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";
import DocMonitorHelper from "../helper-components/helper-doctor/DocMonitorHelper";

function DashboardDoctor() {

    return (
        <div>
            <DoctorHeaderHelper data="monitor"/>
            <DocMonitorHelper/>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;