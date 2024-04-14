import React, {useEffect, useMemo} from 'react';
import {useState} from "react";
import '../../../css/helper-components/helper-patient/records-style.css'
import {dummy} from "./dummy";

function RecordHelper() {
    const [query, setQuery] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const filteredData = useMemo(() => {
        return dummy.filter(item =>
            item.Doctor.toLowerCase().includes(query.toLowerCase()) ||
            item.Hospital.toLowerCase().includes(query.toLowerCase()) ||
            item.Date.includes(query) ||
            item.Reason.toLowerCase().includes(query.toLowerCase()) ||
            item.NextAppointment.includes(query)
        );
    }, [query, dummy]);
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
    // const [currentPosts, setCurrentPosts] = useState([]);
    const indexOfLastPost = currentPage * hospitalsPerPage;
    const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = filteredData.length;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }
    //endregion

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
                            <div className="table-cell-section">Appointment Date</div>
                            <div className="table-cell-section">Hospital</div>
                            <div className="table-cell-section">Doctor</div>
                            <div className="table-cell-section">Next Consultation Date</div>
                            <div className="table-cell-section">Reason</div>
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