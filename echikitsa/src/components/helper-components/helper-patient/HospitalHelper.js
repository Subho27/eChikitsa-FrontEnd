import React, {useEffect, useState} from 'react';
import '../../../css/helper-components/helper-patient/hospital-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function HospitalHelper () {


    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]); // Select the first doctor by default
    const [selectedDoctors, setSelectedDoctors] = useState(doctors);

    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleSpecialityChange = (event) => {
        setSelectedSpeciality(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleNameChange = (event) => {
        const selectedDoctorId = parseInt(event.target.value, 10);
        const doctor = selectedDoctors.find(doctor => doctor.id === selectedDoctorId);
        setSelectedDoctor(doctor);
    };

    useEffect(() => {
        let doctor = doctors;
        if(selectedSpeciality !== "") {
            doctor = doctor.filter(doctor => doctor.specialization === selectedSpeciality);
        }
        if(selectedType !== "") {
            doctor = doctor.filter(doctor => selectedType==="junior"? doctor.experience<15 : doctor.experience>=15);
        }
        setSelectedDoctors(doctor);
        setSelectedDoctor((doctor.length === 0) ? doctors[0] : doctor[0]);

    }, [selectedSpeciality, selectedType]);

    return (
        <div>
            <div className="mainDiv">
                <div className="hospital-name-details">
                    <h1>Sanjeevani Hospital</h1>
                </div>
                <div className="hospital-description">
                    <div className="hospital-details">
                        <div className="hospital-details-section">
                            <div className="hospital-detail-header">Hospital Details</div>
                            <div className="hospital-details-image-section">
                                <img className="hospital-details-image" src={require("../../../images/patient_landing_page/Hospital_Img/hospital1.jpg")} alt="Hospital"/>
                            </div>
                            <table className="hospital-detail-table">
                                <tbody>
                                <tr className="hospital-detail-row">
                                    <td>Email</td>
                                    <td>info@harmonymedicalcenter.com</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>(555) 123-4567</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>Mumbai, Maharashtra, India</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td>www.harmonymedicalcenter.com</td>
                                </tr>
                                <tr>
                                    <td>No. of Doctors</td>
                                    <td>13</td>
                                </tr>
                                <tr>
                                    <td>No. of Senior Doctors</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Specialisations Available</td>
                                    <td>General Medicine, Pediatrics</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>4.5</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="doctors-details-section">
                        <div className="doctors-list-filter">
                            <select onChange={handleTypeChange} className="filter-doctor doctor-type-filter">
                                <option selected hidden>Select Doctor type</option>
                                <option value="junior">Junior Doctor</option>
                                <option value="senior">Senior Doctor</option>
                            </select>
                            <select onChange={handleSpecialityChange} className="filter-doctor doctor-speciality-filter">
                                <option selected hidden>Select Specialisations</option>
                                <option value="General Medicine">General Medicine</option>
                                <option value="Pediatrics">Pediatrics</option>
                            </select>
                            <select onChange={handleNameChange} className="filter-doctor doctor-name-filter">
                                <option selected hidden>Select Doctor</option>
                                {selectedDoctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="doctors-details">
                            <div className="doctor-image-section">
                                <img className="doctors-image"
                                      src={require("../../../images/landing_body_img/"+selectedDoctor.image_path)} alt="Doctor" />
                            </div>
                            <div className="doctors-details-1">
                                <table className="hospital-detail-table custom-hdt">
                                    <tbody>
                                        <tr>
                                            <td>Doctor Name</td>
                                            <td>{selectedDoctor.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Gender</td>
                                            <td>{selectedDoctor.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Age</td>
                                            <td>{selectedDoctor.age}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Specialization</td>
                                            <td>{selectedDoctor.specialization}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Experience</td>
                                            <td>{selectedDoctor.experience}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Qualifications</td>
                                            <td>{selectedDoctor.qualification}</td>
                                        </tr>
                                        <tr>
                                            <td>Languages Spoken</td>
                                            <td>English, Hindi</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Rating</td>
                                            <td>{selectedDoctor.rating}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="doctors-details-2">
                                <div><button className="consult-button-patient">CONSULT</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const doctors = [
    {
        "id": 3,
        "name": "Dr. Emily Smith",
        "gender": "Female",
        "age": 42,
        "specialization": "General Medicine",
        "experience": 18,
        "qualification": "MD, FACP",
        "rating": 4.8,
        "image_path": "doctor8.jpg"
    },
    {
        "id": 4,
        "name": "Dr. Michael Johnson",
        "gender": "Male",
        "age": 48,
        "specialization": "Pediatrics",
        "experience": 15,
        "qualification": "MD, FAAP",
        "rating": 4.6,
        "image_path": "doctor9.jpg"
    },
    {
        "id": 5,
        "name": "Dr. Sarah Lee",
        "gender": "Female",
        "age": 37,
        "specialization": "General Medicine",
        "experience": 12,
        "qualification": "MD, FACP",
        "rating": 4.4,
        "image_path": "doctor8.jpg"
    },
    {
        "id": 6,
        "name": "Dr. Christopher Brown",
        "gender": "Male",
        "age": 45,
        "specialization": "Pediatrics",
        "experience": 17,
        "qualification": "MD, FAAP",
        "rating": 4.7,
        "image_path": "doctor9.jpg"
    },
    {
        "id": 7,
        "name": "Dr. Jessica Martinez",
        "gender": "Female",
        "age": 40,
        "specialization": "General Medicine",
        "experience": 14,
        "qualification": "MD, FACP",
        "rating": 4.5,
        "image_path": "doctor8.jpg"
    },
    {
        "id": 8,
        "name": "Dr. David Wilson",
        "gender": "Male",
        "age": 50,
        "specialization": "Pediatrics",
        "experience": 20,
        "qualification": "MD, FAAP",
        "rating": 4.9,
        "image_path": "doctor9.jpg"
    },
    {
        "id": 9,
        "name": "Dr. Olivia Taylor",
        "gender": "Female",
        "age": 38,
        "specialization": "General Medicine",
        "experience": 13,
        "qualification": "MD, FACP",
        "rating": 4.3,
        "image_path": "doctor9.jpg"
    },
    {
        "id": 10,
        "name": "Dr. James Anderson",
        "gender": "Male",
        "age": 47,
        "specialization": "Pediatrics",
        "experience": 18,
        "qualification": "MD, FAAP",
        "rating": 4.8,
        "image_path": "doctor8.jpg"
    },
    {
        "id": 11,
        "name": "Dr. Sophia Garcia",
        "gender": "Female",
        "age": 36,
        "specialization": "General Medicine",
        "experience": 11,
        "qualification": "MD, FACP",
        "rating": 4.2,
        "image_path": "doctor8.jpg"
    },
    {
        "id": 12,
        "name": "Dr. Ethan Rodriguez",
        "gender": "Male",
        "age": 49,
        "specialization": "Pediatrics",
        "experience": 19,
        "qualification": "MD, FAAP",
        "rating": 4.7,
        "image_path": "doctor9.jpg"
    }
];

export default HospitalHelper