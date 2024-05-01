import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getJwtTokenFromLocalStorage } from "../../../resources/storageManagement";
import { getUserIdFromLocalStorage } from "../../../resources/userIdManagement";
import { isTokenExpired } from "../../route-guard/utility";
import { useNavigate } from "react-router-dom";
import '../../../css/helper-components/helper-patient/records-style.css';

function RecordHelper() {
    const [query, setQuery] = useState("");
    const [dummy, setDummy] = useState([]);
    const userId = getUserIdFromLocalStorage();
    const navigate = useNavigate();
    const [currentPosts, setCurrentPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage] = useState(7);

    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        const getRecordByDoctorId = async () => {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
            try {
                const responses = await axios.get(
                    `https://localhost:8083/echikitsa-backend/ehr/get-record-patient/${userId}`, { headers }
                );
                setDummy(responses.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        getRecordByDoctorId();
    }, [userId, navigate]);

    useEffect(() => {
        const filteredData = dummy.filter(item =>
            (item.firstName && item.firstName.toLowerCase().includes(query.toLowerCase())) ||
            (item.lastName && item.lastName.toLowerCase().includes(query.toLowerCase())) ||
            (item.hospitalName && item.hospitalName.toLowerCase().includes(query.toLowerCase())) ||
            (item.date && item.date.includes(query)) ||
            (item.reason && item.reason.toLowerCase().includes(query.toLowerCase())) ||
            (item.follow_up_date && item.follow_up_date.includes(query))
        );
        setCurrentPosts(filteredData);
    }, [query, dummy]);

    const handleSearchClick = () => {
        const searchField = document.getElementById("search-field");
        if (searchField) {
            searchField.classList.toggle("visually-hidden");
        }
    };

    const indexOfLastPost = currentPage * hospitalsPerPage;
    const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
    const currentPostsPaginated = currentPosts.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(currentPosts.length / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="Container">
            <div className="RecordTitle visually-hidden">
                <div className="textjk">Previous Consultation</div>
            </div>
            <div className="Recordright">
                <div className="whole-table-section">
                    <div className="table-header-section">
                        <div className="table-title">
                            Previous Consultation Records
                        </div>
                        <div className="table-search">
                            <div className="search-widget">
                                <input
                                    className="search-section visually-hidden"
                                    id="search-field"
                                    placeholder="Filter Here..."
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <i className="fa fa-search search-button-table" onClick={handleSearchClick}></i>
                            </div>
                        </div>
                    </div>
                    <div className="table-body-section">
                        <div className="column-header-section">
                            <div className="table-cell-section">Appointment Date</div>
                            <div className="table-cell-section">Hospital</div>
                            <div className="table-cell-section">Doctor</div>
                            <div className="table-cell-section">Next Consultation Date</div>
                            <div className="table-cell-section">Reason</div>
                            <div className="table-cell-section">Prescription</div>
                        </div>
                        <hr className="table-row-divider" />
                        <div className="table-data-section">
                            {currentPostsPaginated.map((item) => (
                                <div key={item.id}>
                                    <div className="table-row-section">
                                        <div className="table-cell-section">{item.date}</div>
                                        <div className="table-cell-section">{item.hospitalName}</div>
                                        <div className="table-cell-section">{item.firstName} {item.lastName}</div>
                                        <div className="table-cell-section">{item.follow_up_date}</div>
                                        <div className="table-cell-section">{item.reason}</div>
                                        <div className="table-cell-section">
                                            <img
                                                className="download-icon"
                                                src={require("../../../images/patient_landing_page/download.png")}
                                                alt="Download"
                                                onClick={() => {
                                                    const prescriptionUrl = item.prescription_url;
                                                    window.open(prescriptionUrl, "_blank");
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <hr className="table-row-divider" />
                                </div>
                            ))}
                        </div>
                        <nav>
                            <ul className='pagination custom-pagination'>
                                {pageNumbers.map(number => (
                                    <li key={number} className='page-item'>
                                        <span onClick={() => paginate(number)}
                                              className={`page-link ${currentPage === number ? 'active' : ''}`}>
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
}

export default RecordHelper;
