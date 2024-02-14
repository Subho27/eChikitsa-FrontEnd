import React from 'react';

class PatientProfile extends React.Component {
    render() {
        const { name, age, medicalConditions } = this.props;

        return (
            <div className="patient-profile">
                <h2>Patient Profile</h2>
                <div>
                    <strong>Name:</strong> {name}
                </div>
                <div>
                    <strong>Age:</strong> {age}
                </div>
                <div>
                    <strong>Medical Conditions:</strong> {medicalConditions ? medicalConditions.join(', ') : 'None'}
                </div>
            </div>
        );
    }
}

export default PatientProfile;
