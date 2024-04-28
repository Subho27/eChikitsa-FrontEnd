import React from "react";
import "../role-options.css";

const Prescription = (props) => {
    const options = [
        {
            text: "Write a Prescription",
            handler: props.actionProvider.handleWritePrescriptionAnswer,
            id: 1,
        },
        {
            text: "Prescription Fields",
            handler: props.actionProvider.handlePrescriptionFieldsAnswer,
            id: 2
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

export default Prescription;