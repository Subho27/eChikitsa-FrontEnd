import React from "react";

import "./role-options.css";

const DoctorQuery = (props) => {
    const options = [
        {
            text: "Registration",
            handler: props.actionProvider.handleRegistrationDoctorSubQuery,
            id: 1,
        },
        {
            text: "Profile",
            handler: props.actionProvider.handleProfileDoctorSubQuery,
            id: 2
        },
        {
            text: "Consultation",
            handler: () => {},
            id: 3
        },
        {
            text: "Prescription",
            handler: () => {},
            id: 4,
        },
        {
            text: "Data Privacy",
            handler: () => {},
            id: 5
        },
        {
            text: "Report Scam",
            handler: () => {},
            id: 6
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

export default DoctorQuery;