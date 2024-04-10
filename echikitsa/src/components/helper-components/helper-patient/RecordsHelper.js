import React, {useEffect, useMemo} from 'react';
import {useState} from "react";
import '../../../css/helper-components/helper-patient/records-style.css'
import {dummy} from "./dummy";

function RecordHelper() {
    const [query, setQuery] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const [filteredData, setFilteredData] = useState(dummy.filter(item =>
        item.Doctor.toLowerCase().includes(query.toLowerCase()) ||
        item.Hospital.toLowerCase().includes(query.toLowerCase()) ||
        item.Date.includes(query)||item.Active.toLowerCase().includes(query.toLowerCase())
    ));
    const handleToggleRow = (id) => {
        const isRowExpanded = expandedRows.includes(id);
        setExpandedRows(prevState => {
            if (isRowExpanded) {
                return prevState.filter(rowId => rowId !== id);
            } else {
                return [...prevState, id];
            }
        });
    };

    const isRowExpanded = (id) => {
        return expandedRows.includes(id);
    };

    // console.log(dummy.filter(user=>user.Doctor.toLowerCase().includes("sm")));

    const handleSearchClick = () => {
        document.getElementById("search-field").className = "search-section";
    };

    //region Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage, setHospitalsPerPage] = useState(7);
    const [currentPosts, setCurrentPosts] = useState([]);
    // const indexOfLastPost = currentPage * hospitalsPerPage;
    // const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
    // setCurrentPosts(filteredData.slice(indexOfFirstPost, indexOfLastPost));
    const totalPosts = filteredData.length;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }
    //endregion

    //region Sort Table
    const [sortByADate, setSortByADate] = useState(true);
    const [sortByHospital, setSortByHospital] = useState(true);
    const [sortByDoctor, setSortByDoctor] = useState(true);
    const [sortByNDate, setSortByNDate] = useState(true);
    const [sortByReason, setSortByReason] = useState(true);
    const sortData = async (e) => {
        let sorted = [...filteredData];
        if (e.target.id === "aDate") {
            if (sortByADate) {
                setSortByADate(false);
                sorted = sorted.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            } else {
                setSortByADate(true);
                sorted = sorted.sort((a, b) => new Date(b.Date) - new Date(a.Date));
            }
        } else if (e.target.id === "hospital") {
            if (sortByHospital) {
                setSortByHospital(false);
                sorted = sorted.sort((a, b) => a.Hospital.localeCompare(b.Hospital));
            } else {
                setSortByHospital(true);
                sorted = sorted.sort((a, b) => b.Hospital.localeCompare(a.Hospital));
            }
        } else if (e.target.id === "doctor") {
            if (sortByDoctor) {
                setSortByDoctor(false);
                sorted = sorted.sort((a, b) => a.Doctor.localeCompare(b.Doctor));
            } else {
                setSortByDoctor(true);
                sorted = sorted.sort((a, b) => b.Doctor.localeCompare(a.Doctor));
            }
        } else if (e.target.id === "nDate") {
            if (sortByNDate) {
                setSortByNDate(false);
                sorted = sorted.sort((a, b) => new Date(a.NextAppointment) - new Date(b.NextAppointment));
            } else {
                setSortByNDate(true);
                sorted = sorted.sort((a, b) => new Date(b.NextAppointment) - new Date(a.NextAppointment));
            }
        } else if (e.target.id === "reason") {
            if (sortByReason) {
                setSortByReason(false);
                sorted = sorted.sort((a, b) => a.Reason.localeCompare(b.Reason));
            } else {
                setSortByReason(true);
                sorted = sorted.sort((a, b) => b.Reason.localeCompare(a.Reason));
            }
        }
        await setFilteredData(sorted);
    };
    //endregion

    useEffect(() => {
        const indexOfLastPost = currentPage * hospitalsPerPage;
        const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
        const updatedCurrentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
        setCurrentPosts(updatedCurrentPosts);
    }, [filteredData, currentPage, hospitalsPerPage])

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
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                                <i className="fa fa-search search-button-table" onClick={handleSearchClick}></i>
                            </div>
                        </div>
                    </div>
                    <div className="table-body-section">
                        <div className="column-header-section">
                            <div className="table-cell-section">Appointment Date <i className="fa fa-sort sort-table-data" id="aDate" onClick={sortData}></i></div>
                            <div className="table-cell-section">Hospital <i className="fa fa-sort sort-table-data" id="hospital" onClick={sortData}></i></div>
                            <div className="table-cell-section">Doctor <i className="fa fa-sort sort-table-data" id="doctor" onClick={sortData}></i></div>
                            <div className="table-cell-section">Next Consultation Date <i className="fa fa-sort sort-table-data" id="nDate" onClick={sortData}></i></div>
                            <div className="table-cell-section">Reason <i className="fa fa-sort sort-table-data" id="reason" onClick={sortData}></i></div>
                            <div className="table-cell-section">Prescription</div>
                        </div>
                        <hr className="table-row-divider"/>
                        <div className="table-data-section">
                            {currentPosts.map((item) => (
                                <div key={item.id}>
                                    <div className="table-row-section">
                                        <div className="table-cell-section">{item.Date}</div>
                                        <div className="table-cell-section">{item.Hospital}</div>
                                        <div className="table-cell-section">{item.Doctor}</div>
                                        <div className="table-cell-section">{item.NextAppointment}</div>
                                        <div className="table-cell-section">{item.Reason}</div>
                                        <div className="table-cell-section"><img className="download-icon" src={require("../../../images/patient_landing_page/download.png")} alt="Download"/></div>
                                    </div>
                                    <hr className="table-row-divider"/>
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
}

export default RecordHelper;