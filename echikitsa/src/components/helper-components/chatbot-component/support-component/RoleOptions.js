import React from "react";

import "./role-options.css";

const RoleOptions = (props) => {
    const options = [
        {
            text: "Hospital",
            handler: props.actionProvider.handleHospitalQuery,
            id: 1,
        },
        {
            text: "Doctor",
            handler: props.actionProvider.handleDoctorQuery,
            id: 2
        },
        {
            text: "Patient",
            handler: props.actionProvider.handlePatientQuery,
            id: 3
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

export default RoleOptions;