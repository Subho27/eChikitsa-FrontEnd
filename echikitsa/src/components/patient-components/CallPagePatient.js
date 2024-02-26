import React from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import CallPageHelper from "../helper-components/helper-patient/CallPageHelper";

function CallPagePatient() {

    return(
        <div>
            <PatientHeaderHelper/>
            <CallPageHelper/>
            <FooterHelper/>
        </div>
    );
}

export default CallPagePatient;