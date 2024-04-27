import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-doctor/doc-monitor-style.css";
import {Link} from "react-router-dom";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import axios from "axios";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";

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
    const [doctorPatientData,setDoctorPatientData] = useState([]);
    const token = getJwtTokenFromLocalStorage();
    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
    useEffect(() => {
        let docId = getUserIdFromLocalStorage();
        const getMonitoringPageData = async () => {
            try {
                const responses = await axios.get(
                    `https://localhost:8083/echikitsa-backend/ehr/get-record-senior-doctor-monitoring/${docId}`,{headers}

                );
                setDoctorPatientData(responses.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getMonitoringPageData();
    }, []);

    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(doctorPatientData);
    }, [doctorPatientData]);

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
                                            <div className="table-cell-doctor">{"Dr. " + item.doctorFirstName + " " + item.doctorSecondName}</div>
                                            <div className="table-cell-doctor">{item.specialization}</div>
                                        </div>
                                        <div className="column-super-patient">
                                            <div className="table-cell-patient">{item.patientFirstName + " " + item.patientLastName}</div>
                                            <div className="table-cell-patient">{item.gender}</div>
                                            <div className="table-cell-patient">{item.age}</div>
                                            <div className="table-cell-patient">{item.patient_type}</div>
                                        </div>
                                        <div className="column-super-call">
                                            <div className="table-cell-call">{item.reason}</div>
                                            <div className={`table-cell-call ${(item.callStatus  ==="ongoing")?`present`:`past`}`}>{item.callStatus}</div>
                                            {/*<div className="table-cell-call">{item.callStatus === "ongoing" && <button className="monitor-call-now">JOIN CALL</button>}</div>*/}
                                            {/*<div className="table-cell-call"> <button className="monitor-call-now">JOIN CALL</button></div>*/}

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
