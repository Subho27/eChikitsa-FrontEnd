import React from "react";
import FooterHelper from "../helper-components/FooterHelper";
import PatientHeaderHelper from "../helper-components/PatientHeaderHelper";
import ProfileHelper from "../helper-components/helper-patient/ProfileHelper";

function ProfilePatient() {

    return(
        <div>
            <PatientHeaderHelper data="profile"/>
            <ProfileHelper/>
            <FooterHelper/>
        </div>
    );
}

export default ProfilePatient;