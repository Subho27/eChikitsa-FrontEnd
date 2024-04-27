import React from "react";
import "../role-options.css";

const Billing = (props) => {
    const options = [
        {
            text: "Platform Fee",
            handler: props.actionProvider.handlePlatformFeeAnswer,
            id: 1,
        },
        {
            text: "Consultation Fee",
            handler: props.actionProvider.handleConsultationFeeAnswer,
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

export default Billing;