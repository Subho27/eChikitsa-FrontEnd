import React from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";
import DocProfilePage from "../helper-components/helper-doctor/DocProfileHelper";

function DashboardDoctor() {

    return (
        <div>
            <DoctorHeaderHelper data="profile"/>
            <DocProfilePage/>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;