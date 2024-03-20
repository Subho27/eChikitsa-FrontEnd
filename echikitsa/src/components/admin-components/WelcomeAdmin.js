import React from "react";
import AdminWelcomeHelper from "../helper-components/helper-admin/AdminWelcomeHelper";
import FooterHelper from "../helper-components/FooterHelper";
import AdminHeaderHelper from "../helper-components/AdminHeaderHelper";

function WelcomeAdmin() {

    return(
        <div>
            <AdminHeaderHelper data="welcome"/>
            <AdminWelcomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default WelcomeAdmin;