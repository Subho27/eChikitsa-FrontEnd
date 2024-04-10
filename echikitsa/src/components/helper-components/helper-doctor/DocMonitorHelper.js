import React, {useEffect, useState} from "react";
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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
            reason: "Allergy",
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

    //region Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage, setHospitalsPerPage] = useState(7);
    const [currentPosts, setCurrentPosts] = useState([]);
    const totalPosts = filteredData.length;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }
    //endregion

    useEffect(() => {
        const indexOfLastPost = currentPage * hospitalsPerPage;
        const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
        const updatedCurrentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
        setCurrentPosts(updatedCurrentPosts);
    }, [filteredData, currentPage, hospitalsPerPage])

    return (
        <div className="MonitorContainer">
            <div className="Recordright">
                <div className="whole-table-section">
                    <div className="table-header-section">
                        <div className="table-title">
                            Senior Doctor Call Monitoring
                        </div>
                    </div>
                    <div className="table-body-section">
                        <div className="column-super-header-section">
                            <div className="column-super-doctor super-head">Doctor Detail</div>
                            <div className="column-super-patient super-head">Patient Detail</div>
                            <div className="column-super-call super-head">Call Detail</div>
                        </div>
                        <hr className="table-row-divider"/>
                        <div className="column-sub-header-section">
                            <div className="column-super-doctor">
                                <div className="table-cell-doctor">Doctor Name</div>
                                <div className="table-cell-doctor">Specialization</div>
                            </div>
                            <div className="column-super-patient">
                                <div className="table-cell-patient">Patient Name</div>
                                <div className="table-cell-patient">Gender</div>
                                <div className="table-cell-patient">Age</div>
                                <div className="table-cell-patient">Repeat</div>
                            </div>
                            <div className="column-super-call">
                                <div className="table-cell-call">Reason</div>
                                <div className="table-cell-call">Call Status</div>
                                <div className="table-cell-call">Action</div>
                            </div>
                        </div>
                        <hr className="table-row-divider"/>
                        <div className="table-data-section">
                            {currentPosts.map((item) => (
                                <div key={item.id}>
                                    <div className="table-row-section">
                                        <div className="column-super-doctor">
                                            <div className="table-cell-doctor">{"Dr. " + item.doctor.firstName + " " + item.doctor.lastName}</div>
                                            <div className="table-cell-doctor">{item.doctor.specialization}</div>
                                        </div>
                                        <div className="column-super-patient">
                                            <div className="table-cell-patient">{item.patient.firstName + " " + item.patient.lastName}</div>
                                            <div className="table-cell-patient">{item.patient.gender}</div>
                                            <div className="table-cell-patient">{item.patient.age}</div>
                                            <div className="table-cell-patient">{item.patient.repeatPatient.toUpperCase()}</div>
                                        </div>
                                        <div className="column-super-call">
                                            <div className="table-cell-call">{item.reason}</div>
                                            <div className={`table-cell-call ${(item.callStatus==="ongoing")?`present`:`past`}`}>{item.callStatus.toUpperCase()}</div>
                                            <div className="table-cell-call">{item.callStatus === "ongoing" && <button className="monitor-call-now">JOIN CALL</button>}</div>
                                        </div>
                                    </div>
                                    <hr className="monitor-table-row-divider"/>
                                </div>
                            ))}
                        </div>
                        <nav>
                            <ul className='pagination custom-pagination'>
                                {pageNumbers.map(number => (
                                    <li key={number} className='page-item'>
                                <span onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                                    {number}
                                </span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocMonitorHelper;
