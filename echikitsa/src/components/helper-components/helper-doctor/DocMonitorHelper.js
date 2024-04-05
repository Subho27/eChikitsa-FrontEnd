import React, { useState } from "react";
import "../../../css/helper-components/helper-doctor/doc-monitor-style.css";
import {Link} from "react-router-dom";

const DocMonitorHelper = () => {
    const [seniorDoctorCallHistory, setSeniorDoctorCallHistory] = useState([
        { id: 1, status: "not joined" }, // Example history item
        // Add more history items as needed
    ]);

    const [seniorDoctorCallStatus, setSeniorDoctorCallStatus] = useState("not joined");

    const joinCall = (callId) => {
        setSeniorDoctorCallStatus("joined");
        setSeniorDoctorCallHistory(prev => {
            return prev.map(call => {
                if (call.id === callId) {
                    return { ...call, status: "joined" };
                }
                return call;
            });
        });
    };

    // Dummy data for demonstration
    const doctorPatientData = [
        {
            doctor: {
                id: 11,
                firstName: "Alice",
                lastName: "Smith",
                specialization: "Cardiologist",
                isSeniorDoctor: true
            },
            patient: {
                id: 11,
                firstName: "John",
                lastName: "Doe",
                gender: "Male",
                age: 40,
                repeatPatient: "n"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 12,
                firstName: "Bob",
                lastName: "Johnson",
                specialization: "Pediatrician",
                isSeniorDoctor: false
            },
            patient: {
                id: 12,
                firstName: "Alice",
                lastName: "Williams",
                gender: "Female",
                age: 25,
                repeatPatient: "r"
            },
            callStatus: "call ended"
        },
        {
            doctor: {
                id: 13,
                firstName: "Charlie",
                lastName: "Brown",
                specialization: "Dermatologist",
                isSeniorDoctor: true
            },
            patient: {
                id: 13,
                firstName: "Emma",
                lastName: "Miller",
                gender: "Female",
                age: 30,
                repeatPatient: "n"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 14,
                firstName: "David",
                lastName: "Wilson",
                specialization: "Psychiatrist",
                isSeniorDoctor: false
            },
            patient: {
                id: 14,
                firstName: "James",
                lastName: "Anderson",
                gender: "Male",
                age: 35,
                repeatPatient: "n"
            },
            callStatus: "call ended"
        },
        {
            doctor: {
                id: 15,
                firstName: "Eva",
                lastName: "Martinez",
                specialization: "Oncologist",
                isSeniorDoctor: true
            },
            patient: {
                id: 15,
                firstName: "Olivia",
                lastName: "Garcia",
                gender: "Female",
                age: 45,
                repeatPatient: "r"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 16,
                firstName: "Frank",
                lastName: "Lopez",
                specialization: "Neurologist",
                isSeniorDoctor: false
            },
            patient: {
                id: 16,
                firstName: "William",
                lastName: "Rodriguez",
                gender: "Male",
                age: 50,
                repeatPatient: "n"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 17,
                firstName: "Grace",
                lastName: "Hernandez",
                specialization: "Gynecologist",
                isSeniorDoctor: true
            },
            patient: {
                id: 17,
                firstName: "Sophia",
                lastName: "Brown",
                gender: "Female",
                age: 32,
                repeatPatient: "r"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 18,
                firstName: "Henry",
                lastName: "Gonzalez",
                specialization: "Orthopedic Surgeon",
                isSeniorDoctor: false
            },
            patient: {
                id: 18,
                firstName: "Noah",
                lastName: "Lopez",
                gender: "Male",
                age: 55,
                repeatPatient: "n"
            },
            callStatus: "call ended"
        },
        {
            doctor: {
                id: 19,
                firstName: "Isabella",
                lastName: "Perez",
                specialization: "ENT Specialist",
                isSeniorDoctor: true
            },
            patient: {
                id: 19,
                firstName: "Mia",
                lastName: "Gomez",
                gender: "Female",
                age: 25,
                repeatPatient: "r"
            },
            callStatus: "ongoing"
        },
        {
            doctor: {
                id: 20,
                firstName: "Jack",
                lastName: "Rivera",
                specialization: "Urologist",
                isSeniorDoctor: false
            },
            patient: {
                id: 20,
                firstName: "Ava",
                lastName: "Flores",
                gender: "Female",
                age: 38,
                repeatPatient: "n"
            },
            callStatus: "ongoing"
        }
    ];

    const [filteredData, setFilteredData] = useState(doctorPatientData);

    const handleDateFilter = (event) => {
        const selectedDate = new Date(event.target.value);
        const filtered = doctorPatientData.filter(item => {
            // Assuming callStartTime is the property containing the call start time in each data item
            const callStartTime = new Date(item.callStartTime);
            return callStartTime.getFullYear() === selectedDate.getFullYear() &&
                callStartTime.getMonth() === selectedDate.getMonth() &&
                callStartTime.getDate() === selectedDate.getDate();
        });
        setFilteredData(filtered);
    };

    return (
        <div className="MonitorContainer">
            <div className="MonitorTitle">
                <span>Doctor Call Monitoring</span>
            </div>
            <div className="DateFilter">
                <div className="dateFilter">Filter by Date:</div>
                <input type="date" id="dateFilter" className="date" onChange={handleDateFilter} />
            </div>
            <div className="MonitorTable">
                <div className="TableHead">
                    <div className="DoctorDetail">Doctor Detail</div>
                    <div className="PatientDetail" id="PatientTitle">Patient Detail</div>
                    <div className="CallDetail">Call Status</div>
                </div>
                <div className="MonitorTableRow">
                    <div className="DoctorDetail">
                        <div className="DocRef">
                            <div className="Ref">ID</div>
                            <div className="Ref">Name</div>
                            <div className="Ref">Specialisation</div>
                        </div>
                    </div>
                    <div className="PatientDetail">
                        <div className="PatRef">
                            <div className="Ref">ID</div>
                            <div className="Ref">Name</div>
                            <div className="Ref">Gender</div>
                            <div className="Ref">Age</div>
                            <div className="Ref">Repeat</div>
                        </div>
                    </div>
                    <div className="CallDetail">
                        <div className="CallRef">
                            <div className="Ref">Status</div>
                            <div className="Ref">Action</div>
                        </div>
                    </div>
                </div>
                {filteredData.map(({ doctor, patient, callStatus }) => (
                    <div key={doctor.id} className="MonitorTableRow">
                        <div className="DoctorDetail">
                            <div className="DocRef">
                                <div className="Ref">{doctor.id}</div>
                                <div className="Ref">{doctor.firstName} {doctor.lastName}</div>
                                <div className="Ref">{doctor.specialization}</div>
                            </div>
                        </div>
                        <div className="PatientDetail">
                            <div className="PatRef">
                                <div className="Ref">{patient.id}</div>
                                <div className="Ref">{patient.firstName} {patient.lastName}</div>
                                <div className="Ref">{patient.gender}</div>
                                <div className="Ref">{patient.age}</div>
                                <div className="Ref">{patient.repeatPatient}</div>
                            </div>
                        </div>
                        <div className="CallDetail">
                            <div className="CallRef">
                                <div className="Ref">{callStatus === "call ended"?<div className="join">Call Ended</div>:
                                    <div className="status">Ongoing</div> }</div>
                                <div className="Ref">
                                    {callStatus === "ongoing" ? (
                                        <Link to="/monitor-call/subho"><div className="joinbutton" onClick={() => joinCall(doctor.id)}>Join Call</div></Link>
                                    ) : (
                                        <div className="join">{seniorDoctorCallStatus === "joined" ? "Call Joined" : "Not Joined"}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocMonitorHelper;
