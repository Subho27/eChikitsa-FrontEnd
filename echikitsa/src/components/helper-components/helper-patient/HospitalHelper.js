import React, {useEffect, useState} from 'react';
import '../../../css/helper-components/helper-patient/hospital-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import {isTokenExpired} from "../../route-guard/utility";

function HospitalHelper (props) {
    const {state}=useLocation();

    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [hospitalName, setHospitalName] = useState({});
    const [doctors,setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState([]);
    const [selectedDoctors, setSelectedDoctors] = useState("");

    //region Call Constants
    const [assignedDoctorId, setAssignedDoctorId] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [firstMember, setFirstMember] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [havePosition, setHavePosition] = useState(false);
    const [position, setPosition] = useState(0);
    const navigate = useNavigate();
    //endregion
    const token = getJwtTokenFromLocalStorage();
    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }

    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        if (state.hospital_ids) {
            const fetchHospitalName = async () => {
                try {
                    const response = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-specific-hospitals/${state.hospital_ids}`,{headers});
                    setHospitalName(response.data);
                    console.log(response.data);
                    const response2 = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-doctors/${state.hospital_ids}`,{headers});

                    setDoctors(response2.data);

                     console.log(response2.data);

                } catch (error) {
                    console.log('Error fetching hospital name:', error);
                }
            };

            fetchHospitalName();
        }
    }, [state.hospital_ids])

    useEffect(() => {
        // Only set selectedDoctor if doctors array is not empty
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

    const consultSD = async (e) => {
        const selectedDoctorId = parseInt(e.target.id);
        await axios.post("http://localhost:9193/local/add-to-queue-sd", {
            patientId : getUserIdFromLocalStorage(),
            doctorId : selectedDoctorId
        }).then( async (response) => {
            console.log(response);
            if(response.data !== null) {
                await axios.get(`http://localhost:9193/local/size/${response.data.user_id}`)
                    .then( async (response) => {
                        // console.log(response.data == 1);
                        if(response.data == 1) {
                            setFirstMember(true);
                        } else {
                            setIsWaiting(true);
                        }
                    })
                // setAssignedDoctorId(response.data.user_id);
                setAssignedDoctorId(selectedDoctorId)
            } else {
                let sock = new SockJS('http://localhost:9193/ws-endpoint');
                const stompClient = over(sock);
                await stompClient.connect({}, () => {
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    stompClient.subscribe(waiting, async (message) => {
                        console.log(message);
                        setPosition(parseInt(JSON.parse(message.body).position));
                        setHavePosition(true);
                        setAssignedDoctorId(selectedDoctorId)
                        // if(JSON.parse(message.body).doctorId !== null) {
                        //     setAssignedDoctorId(JSON.parse(message.body).doctorId);
                        // }
                    });
                });
                setIsWaiting(true);
            }
        });
    }

    useEffect(() => {
        if (assignedDoctorId) {
            const initializeWebSocket = () => {
                let sock = new SockJS('http://localhost:9193/ws-endpoint');
                const stompClient = over(sock);
                stompClient.connect({}, () => {
                    setStompClient(stompClient);
                    const topic = `/topic/next-id/${assignedDoctorId}`;
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    if(firstMember) {
                        setFirstMember(false);
                        navigate(`/call`, { replace: true, state : {assignedDoctorId} });
                    } else {
                        stompClient.subscribe(waiting, async (message) => {
                            // console.log(message);
                            setPosition(parseInt(JSON.parse(message.body).position));
                            setHavePosition(true);
                        });
                        stompClient.subscribe(topic, (message) => {
                            // console.log(message);
                            if (JSON.parse(message.body).body.body.patientId == getUserIdFromLocalStorage()) {
                                // navigate(`/call/${assignedDoctorId}`);
                                navigate(`/call`, { replace: true, state : {assignedDoctorId} });
                            }
                            // else {
                            //     setIsWaiting(true);
                            // }
                        });
                        // setIsWaiting(true);
                    }
                });
            };
            initializeWebSocket();
        }

        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, [assignedDoctorId]);

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

    const quitWaiting = async () => {
        await axios.post("http://localhost:9193/local/cancel-waiting", {
            patientId: getUserIdFromLocalStorage(),
            doctorId: assignedDoctorId
        }).then(async (response) => {
            console.log(response.data);
            if(response.data.toString() === "true") {
                const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
                stompClient.connect({}, async () => {
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    const topic = `/topic/next-id/${assignedDoctorId}`;
                    await stompClient.unsubscribe(waiting);
                    await stompClient.unsubscribe(topic);
                    await stompClient.send("/app/reload-position");
                    alert("You chose not to wait for our Doctor. Please try again after some time.");
                    setIsWaiting(false);
                });
            }
        })
    }

    return (
        <div>
            {isWaiting && (<div id="overlay-waiting">
                <div className="waiting-text-section">
                    <p className="hang-tight-text">HANG TIGHT</p>
                    <p className="waiting-text">You're now in a virtual queue, waiting for our doctor to be free.</p>
                    {!havePosition && <p className="queue-text">Note : Getting your position...</p>}
                    {havePosition && <p className="queue-text">Note : You are currently in position <span className="queue-position">{position.toString().padStart(2, "0")}</span></p>}
                    <img className="queue-image" src={require("../../../images/patient_landing_page/queue.jpg")} alt="queue"/>
                    <button className="quit-waiting" onClick={quitWaiting}>QUIT WAITING</button>
                </div>
            </div>)}
            <div className="mainDiv">
                <div className="hospital-name-details">
                    <h1>{hospitalName.hospital_name} Hospital</h1>
                </div>
                <div className="hospital-description">
                    <div className="hospital-details">
                        <div className="hospital-details-section">
                            <div className="hospital-details-image-section-page">
                                <img className="hospital-details-image" src={hospitalName.image_path} alt="Hospital"/>
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

                                    <td> {hospitalName.specializationss && hospitalName.specializationss.map((spc, index) => (
                                        <span
                                            key={index}>{spc} {index !== hospitalName.specializationss.length - 1 && ", "} </span>
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
                            <select onChange={handleSpecialityChange}
                                    className="filter-doctor doctor-speciality-filter">
                                <option selected hidden>Select Specializations</option>
                                {Array.from(new Set(doctors.map(doctor => doctor.specialization))).map((specialization, index) => (
                                    <option key={index} value={specialization}>{specialization}</option>
                                ))}
                            </select>
                            {selectedDoctors.length > 0 && (
                                <select onChange={handleNameChange} className="filter-doctor doctor-name-filter">
                                    <option selected hidden>Select Doctor</option>
                                    {selectedDoctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        {(selectedDoctors.length === 0 && !selectedDoctor) ? (
                            <div className="no-doctors-message">
                                <h1>No doctors available</h1>
                            </div>
                        ) : (
                            <div className="doctors-details">
                                <div className="doctor-image-section">
                                    <img className="doctors-image" src={selectedDoctor.image_path} alt="Doctor"/>
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
                                            <td>3</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="doctors-details-2">
                                    <div>
                                        <button className="consult-button-patient" onClick={consultSD}
                                                id={selectedDoctor.id}>
                                            CONSULT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
}

// const doctors = [
//     {
//         "id": 3,
//         "name": "Dr. Emily Smith",
//         "gender": "Female",
//         "age": 42,
//         "specialization": "General Medicine",
//         "experience": 18,
//         "rating": 4.8,
//         "image_path": "doctor8.jpg"
//     },
//     {
//         "id": 4,
//         "name": "Dr. Michael Johnson",
//         "gender": "Male",
//         "age": 48,
//         "specialization": "Pediatrics",
//         "experience": 15,
//         "qualification": "MD, FAAP",
//         "rating": 4.6,
//         "image_path": "doctor9.jpg"
//     },
//     {
//         "id": 5,
//         "name": "Dr. Sarah Lee",
//         "gender": "Female",
//         "age": 37,
//         "specialization": "General Medicine",
//         "experience": 12,
//         "qualification": "MD, FACP",
//         "rating": 4.4,
//         "image_path": "doctor8.jpg"
//     },
//     {
//         "id": 6,
//         "name": "Dr. Christopher Brown",
//         "gender": "Male",
//         "age": 45,
//         "specialization": "Pediatrics",
//         "experience": 17,
//         "qualification": "MD, FAAP",
//         "rating": 4.7,
//         "image_path": "doctor9.jpg"
//     },
//     {
//         "id": 7,
//         "name": "Dr. Jessica Martinez",
//         "gender": "Female",
//         "age": 40,
//         "specialization": "General Medicine",
//         "experience": 14,
//         "qualification": "MD, FACP",
//         "rating": 4.5,
//         "image_path": "doctor8.jpg"
//     },
//     {
//         "id": 8,
//         "name": "Dr. David Wilson",
//         "gender": "Male",
//         "age": 50,
//         "specialization": "Pediatrics",
//         "experience": 20,
//         "qualification": "MD, FAAP",
//         "rating": 4.9,
//         "image_path": "doctor9.jpg"
//     },
//     {
//         "id": 9,
//         "name": "Dr. Olivia Taylor",
//         "gender": "Female",
//         "age": 38,
//         "specialization": "General Medicine",
//         "experience": 13,
//         "qualification": "MD, FACP",
//         "rating": 4.3,
//         "image_path": "doctor9.jpg"
//     },
//     {
//         "id": 10,
//         "name": "Dr. James Anderson",
//         "gender": "Male",
//         "age": 47,
//         "specialization": "Pediatrics",
//         "experience": 18,
//         "qualification": "MD, FAAP",
//         "rating": 4.8,
//         "image_path": "doctor8.jpg"
//     },
//     {
//         "id": 11,
//         "name": "Dr. Sophia Garcia",
//         "gender": "Female",
//         "age": 36,
//         "specialization": "General Medicine",
//         "experience": 11,
//         "qualification": "MD, FACP",
//         "rating": 4.2,
//         "image_path": "doctor8.jpg"
//     },
//     {
//         "id": 12,
//         "name": "Dr. Ethan Rodriguez",
//         "gender": "Male",
//         "age": 49,
//         "specialization": "Pediatrics",
//         "experience": 19,
//         "qualification": "MD, FAAP",
//         "rating": 4.7,
//         "image_path": "doctor9.jpg"
//     }
// ];

export default HospitalHelper