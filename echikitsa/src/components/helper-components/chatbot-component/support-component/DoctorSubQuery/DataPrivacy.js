import React from "react";
import "../role-options.css";

const DoctorDataPrivacy = (props) => {
    const options = [
        {
            text: "Doctor Data",
            handler: props.actionProvider.handleDoctorsDataAnswer,
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

export default DoctorDataPrivacy;