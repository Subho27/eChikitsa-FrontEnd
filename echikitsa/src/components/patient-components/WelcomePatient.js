import React from "react";
import WelcomeHelper from "../helper-components/helper-patient/WelcomeHelper";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import {useLocation} from "react-router-dom";

function WelcomePatient() {
    const {state}=useLocation();


    return(
        <div>
            <PatientHeaderHelper data="welcome" id = {state.user_id}/>
            <WelcomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default WelcomePatient;