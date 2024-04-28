import React from "react";
import "../role-options.css";

const RegistrationDoctor = (props) => {
    const options = [
        {
            text: "Registration Process",
            handler: props.actionProvider.handleRegistrationDoctorAnswer,
            id: 1,
        },
        {
            text: "Verifying Credentials",
            handler: props.actionProvider.handleVerifyDocCredentialsAnswer,
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

export default RegistrationDoctor;