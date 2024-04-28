import React from "react";

import "./role-options.css";

const PatientQuery = (props) => {
    const options = [
        {
            text: "Registration",
            handler: props.actionProvider.handleRegistrationPatientSubQuery,
            id: 1,
        },
        {
            text: "Profile",
            handler: props.actionProvider.handleProfilePatientSubQuery,
            id: 2
        },
        {
            text: "Consultation",
            handler: props.actionProvider.handleConsultationPatientSubQuery,
            id: 3
        },
        {
            text: "Prescription",
            handler: props.actionProvider.handlePrescriptionPatientSubQuery,
            id: 4,
        },
        {
            text: "Data Privacy",
            handler: props.actionProvider.handlePatDataPrivacySubQuery,
            id: 6
        },
        {
            text: "Report Scam",
            handler: props.actionProvider.handleReportScamAnswer,
            id: 7
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

export default PatientQuery;