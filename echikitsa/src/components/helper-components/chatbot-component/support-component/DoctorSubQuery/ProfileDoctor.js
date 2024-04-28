import React from "react";
import "../role-options.css";

const ProfileDoctor = (props) => {
    const options = [
        {
            text: "Access Doctor profile",
            handler: props.actionProvider.handleAccessDoctorAnswer,
            id: 1,
        },
        {
            text: "View Doctor Details",
            handler: props.actionProvider.handleViewDocDetailsAnswer,
            id: 2
        },
        {
            text: "Update Doctor Details",
            handler: props.actionProvider.handleUpdateDocDetailsAnswer,
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

export default ProfileDoctor;