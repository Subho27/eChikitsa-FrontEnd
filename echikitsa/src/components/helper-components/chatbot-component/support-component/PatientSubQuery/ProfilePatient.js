import React from "react";
import "../role-options.css";

const ProfilePatient = (props) => {
    const options = [
        {
            text: "Access patient profile",
            handler: props.actionProvider.handleAccessPatientAnswer,
            id: 1,
        },
        {
            text: "View Patient Details",
            handler: props.actionProvider.handleViewPatDetailsAnswer,
            id: 2
        },
        {
            text: "Update Patient Details",
            handler: props.actionProvider.handleUpdatePatDetailsAnswer,
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

export default ProfilePatient;