import React from "react";

import "./role-options.css";

const HospitalQuery = (props) => {
    const options = [
        {
            text: "Registration",
            handler: props.actionProvider.handleRegistrationSubQuery,
            id: 1,
        },
        {
            text: "Profile",
            handler: props.actionProvider.handleProfileSubQuery,
            id: 2
        },
        {
            text: "Manage Doctors",
            handler: props.actionProvider.handleManageDoctorSubQuery,
            id: 3
        },
        {
            text: "Billing",
            handler: props.actionProvider.handleBillingSubQuery,
            id: 4,
        },
        {
            text: "Data Privacy",
            handler: props.actionProvider.handleDataPrivacySubQuery,
            id: 5
        },
        {
            text: "Report Scam",
            handler: props.actionProvider.handleReportScamAnswer,
            id: 6
        }
    ];

    const optionsMarkup = options.map((option) => (
        <button
            className="role-option-button"
            key={option.id}
            onClick={option.handler}
        >
            {option.text}
        </button>
    ));

    return <div className="role-options-container">{optionsMarkup}</div>;
};

export default HospitalQuery;