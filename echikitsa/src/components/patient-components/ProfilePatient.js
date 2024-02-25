import React from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import ProfileHelper from "../helper-components/helper-patient/ProfileHelper";

function ProfilePatient() {

    return(
        <div>
            <PatientHeaderHelper/>
            <ProfileHelper/>
            <FooterHelper/>
        </div>
    );
}

export default ProfilePatient;