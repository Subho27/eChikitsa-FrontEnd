import React from "react";
import "../role-options.css";

const ManageDoctors = (props) => {
    const options = [
        {
            text: "Appoint New Doctor",
            handler: props.actionProvider.handleAddDoctorAnswer,
            id: 1,
        },
        {
            text: "View Doctor",
            handler: props.actionProvider.handleViewDoctorAnswer,
            id: 2
        },
        {
            text: "Promote Doctor",
            handler: props.actionProvider.handlePromoteDoctorAnswer,
            id: 3
        },
        {
            text: "Deactivate Doctor",
            handler: props.actionProvider.handleDeactivateDoctorAnswer,
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

export default ManageDoctors;