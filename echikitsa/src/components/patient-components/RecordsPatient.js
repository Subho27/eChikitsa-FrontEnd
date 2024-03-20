import React from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import RecordsHelper from "../helper-components/helper-patient/RecordsHelper";

function RecordsPatient() {

    return(
        <div>
            <PatientHeaderHelper data="record"/>
            <RecordsHelper/>
            <FooterHelper/>
        </div>
    );
}

export default RecordsPatient;