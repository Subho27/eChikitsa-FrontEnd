import React from "react";
import "../role-options.css";

const PrescriptionPatient = (props) => {
    const options = [
        {
            text: "Get Prescription",
            handler: props.actionProvider.handleGetPrescriptionAnswer,
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

export default PrescriptionPatient;