import React from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import HospitalHelper from "../helper-components/helper-patient/HospitalHelper";

function HospitalDetailPatient() {

    return(
        <div>
            <PatientHeaderHelper/>
            <HospitalHelper/>
            <FooterHelper/>
        </div>
    );
}

export default HospitalDetailPatient;