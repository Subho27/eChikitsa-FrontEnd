import React from "react";
import "../role-options.css";

const Profile = (props) => {
    const options = [
        {
            text: "Access Admin profile",
            handler: props.actionProvider.handleAccessAdminAnswer,
            id: 1,
        },
        {
            text: "View Details",
            handler: props.actionProvider.handleViewDetailsAnswer,
            id: 2
        },
        {
            text: "Update Details",
            handler: props.actionProvider.handleUpdateDetailsAnswer,
            id: 3
        },
        {
            text: "Add/Remove Department",
            handler: props.actionProvider.handleAddUpdateDeptAnswer,
            id: 4
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

export default Profile;