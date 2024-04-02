import React, {useEffect, useState} from 'react';
import '../../../css/helper-components/helper-patient/hospital-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {useLocation} from "react-router-dom";

function HospitalHelper (props) {
    const {state}=useLocation();
    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [hospitalName, setHospitalName] = useState({});
    const [doctors,setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState([]);
    const [selectedDoctors, setSelectedDoctors] = useState("");

    useEffect(() => {
        if (state.hospital_ids) {
            const fetchHospitalName = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/hospital/get-specific-hospitals/${state.hospital_ids}`);
                    const response2 = await axios.get(`http://localhost:8081/hospital/get-doctors/${state.hospital_ids}`);
                    setHospitalName(response.data);
                    setDoctors(response2.data);
                } catch (error) {
                    console.error('Error fetching hospital name:', error);
                }
            };

            fetchHospitalName();
        }
    }, [state.hospital_ids])

    useEffect(() => {
        if (doctors.length > 0) {
            setSelectedDoctor(doctors[0]);
        }
    }, [doctors]);

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
                    <h1>{hospitalName.hospital_name}</h1>
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
                                    <td>{hospitalName.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{hospitalName.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{hospitalName.address}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td>{hospitalName.website}</td>
                                </tr>
                                <tr>
                                    <td>No. of Doctors</td>
                                    <td>{hospitalName.noOfDoctors}</td>
                                </tr>
                                <tr>
                                    <td>No. of Senior Doctors</td>
                                    <td>{hospitalName.noOFSeniorDoctors}</td>
                                </tr>
                                <tr>
                                    <td>Specialisations Available</td>

                                    <td> {hospitalName.specializationss&&hospitalName.specializationss.map((spc, index) => (
                                        <span key={index}>{spc} {index !== hospitalName.specializationss.length - 1 && ", "} </span>
                                    ))}</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>{hospitalName.rating}</td>
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
                                <option selected hidden>Select Specializations </option>
                                {Array.from(new Set(doctors.map(doctor => doctor.specialization))).map((specialization, index) => (
                                    <option key={index} value={specialization}>{specialization}</option>
                                ))}
                            </select>
                            {selectedDoctors.length > 0 &&( <select onChange={handleNameChange} className="filter-doctor doctor-name-filter">
                                <option selected hidden>Select Doctor</option>
                                {selectedDoctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                            )}
                        </div>
                        <div className="doctors-details">
                            <div className="doctor-image-section">
                                <img className="doctors-image"
                                      src={selectedDoctor && selectedDoctor.image_path && require("../../../images/landing_body_img/"+selectedDoctor.image_path)} alt="Doctor" />
                            </div>
                            <div className="doctors-details-1">
                                <table className="hospital-detail-table custom-hdt">
                                    <tbody>
                                        <tr>
                                            <td>Doctor Name</td>
                                            <td>{selectedDoctor && selectedDoctor.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Gender</td>
                                            <td>{selectedDoctor && selectedDoctor.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Age</td>
                                            <td>{selectedDoctor  && selectedDoctor.age}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Specialization</td>
                                            <td>{selectedDoctor && selectedDoctor.specialization}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Experience</td>
                                            <td>{selectedDoctor && selectedDoctor.experience}</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Qualifications</td>
                                            <td>{selectedDoctor && selectedDoctor.qualification}</td>
                                        </tr>
                                        <tr>
                                            <td>Languages Spoken</td>
                                            <td>English, Hindi</td>
                                        </tr>
                                        <tr>
                                            <td>Doctor Rating</td>
                                            <td>{selectedDoctor && selectedDoctor.rating}</td>
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



export default HospitalHelper