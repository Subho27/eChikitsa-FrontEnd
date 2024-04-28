import React from "react";
import "../role-options.css";

const ConsultationPatient = (props) => {
    const options = [
        {
            text: "Consultation Process",
            handler: props.actionProvider.handleConsultationPatProcessAnswer,
            id: 1,
        },
        {
            text: "Consultation Fee",
            handler: props.actionProvider.handleConsultationFeePatAnswer,
            id: 2
        },
        {
            text: "Giving Consent",
            handler: props.actionProvider.handleConsentAnswer,
            id: 3
        },
        {
            text: "Consultation Data",
            handler: props.actionProvider.handleConsultationDataPatAnswer,
            id: 4
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

export default ConsultationPatient;