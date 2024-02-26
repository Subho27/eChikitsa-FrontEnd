import React from "react";
import DoctorHeaderHelper from "../helper-components/DoctorHeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";
import DocRecordHelper from "../helper-components/helper-doctor/DocRecordHelper";

function DashboardDoctor() {

    return (
        <div>
            <DoctorHeaderHelper data="records"/>
            <DocRecordHelper/>
            <FooterHelper/>
        </div>
    );
}

export default DashboardDoctor;