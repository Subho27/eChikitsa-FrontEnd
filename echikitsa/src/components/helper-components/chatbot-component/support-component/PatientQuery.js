import React from "react";

import "./role-options.css";

const PatientQuery = (props) => {
    const options = [
        {
            text: "Registration",
            handler: () => {},
            id: 1,
        },
        {
            text: "Profile",
            handler: () => {},
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
            text: "Billing",
            handler: () => {},
            id: 5
        },
        {
            text: "Data Privacy",
            handler: () => {},
            id: 6
        },
        {
            text: "Report Scam",
            handler: () => {},
            id: 7
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

export default PatientQuery;