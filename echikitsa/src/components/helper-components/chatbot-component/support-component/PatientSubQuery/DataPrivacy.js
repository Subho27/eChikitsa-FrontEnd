import React from "react";
import "../role-options.css";

const PatientDataPrivacy = (props) => {
    const options = [
        {
            text: "Patient Data",
            handler: props.actionProvider.handlePatientsDataAnswer,
            id: 1,
        },
        {
            text: "Consultation Data",
            handler: props.actionProvider.handleConsultationPatDataAnswer,
            id: 1,
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

export default PatientDataPrivacy;