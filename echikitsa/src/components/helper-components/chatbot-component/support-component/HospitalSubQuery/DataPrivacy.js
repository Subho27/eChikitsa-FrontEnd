import React from "react";
import "../role-options.css";

const DataPrivacy = (props) => {
    const options = [
        {
            text: "Hospital Data",
            handler: props.actionProvider.handleHospitalDataAnswer,
            id: 1,
        },
        {
            text: "Doctors' Data",
            handler: props.actionProvider.handleDoctorDataAnswer,
            id: 2
        },
        {
            text: "Consultation Data",
            handler: props.actionProvider.handleConsultationDataAnswer,
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

export default DataPrivacy;