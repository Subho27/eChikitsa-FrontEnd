import React from "react";
import "../role-options.css";

const Consultation = (props) => {
    const options = [
        {
            text: "Consultation Process",
            handler: props.actionProvider.handleConsultationProcessAnswer,
            id: 1,
        },
        {
            text: "Consultation Fee",
            handler: props.actionProvider.handleConsultationFeeDocAnswer,
            id: 2
        },
        {
            text: "Monitor Consultation",
            handler: props.actionProvider.handleMonitorConsultationAnswer,
            id: 3
        },
        {
            text: "Consultation Data",
            handler: props.actionProvider.handleConsultationDataDocAnswer,
            id: 4
        },
        {
            text: "Asking Consent",
            handler: props.actionProvider.handleAskingConsentDocAnswer,
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

export default Consultation;