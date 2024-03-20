import React from "react";
import WelcomeHelper from "../helper-components/helper-patient/WelcomeHelper";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";

function WelcomePatient() {

    return(
        <div>
            <PatientHeaderHelper data="welcome"/>
            <WelcomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default WelcomePatient;