import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-doctor/doc-records-style.css";
import Collapsible from "react-collapsible";
import Select from "react-select";
import axios from "axios";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {isTokenExpired} from "../../route-guard/utility";
import {useNavigate} from "react-router-dom";



const DocRecordHelper = () => {
    const [expandedRecordId, setExpandedRecordId] = useState(null);
    const [isAge, setIsAge] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [isGender, setIsGender] = useState(false);
    const [filters, setFilters] = useState({ age: "", gender: "", date: "" });
    const [selectedOption, setSelectedOption] = useState(null);
    const userId =  getUserIdFromLocalStorage();
    const[dummyPatientRecords, setDummyPatientRecords] = useState([]);
    const navigate = useNavigate();
    const toggleExpandedRecord = (recordId) => {
        setExpandedRecordId(expandedRecordId === recordId ? null : recordId);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

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
                    `https://localhost:8083/echikitsa-backend/ehr/get-record-doctor/10`, { headers }
                );
                // console.log(responses.data);
                setDummyPatientRecords(responses.data);
                // console.log("the value of records"+responses.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        getRecordByDoctorId();
    }, []); // E

    useEffect(() => {
        if(selectedOption !== null) {
            const e = {
                "target" : {
                    "name" : "gender",
                    "value" : selectedOption.value
                }
            }
            handleFilterChange(e);
        }
    }, [selectedOption])

    const filteredRecords = dummyPatientRecords.filter((record) => {
        return (
            (filters.age === "" || record.age.toString() === filters.age) &&
            (filters.gender === "" || record.gender === filters.gender) &&
            (filters.date === "" || record.date === filters.date)
        );
    });
    // Sort the dummyPatientRecords array by date
    dummyPatientRecords.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });


    const downloadDocument = () => {
        // Add logic to download document
        console.log("Downloading document...");
    };

    const getLastPrescription = (repeatPatient) => {
        if (repeatPatient === "n") {
            // Show pop-up for new patient
            alert("New patient. No previous prescription available.");
        } else {
            // Add logic to get last prescription
            console.log("Getting last prescription...");
        }
    };

    //region Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage, setHospitalsPerPage] = useState(7);
    // const [currentPosts, setCurrentPosts] = useState([]);
    const indexOfLastPost = currentPage * hospitalsPerPage;
    const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
    const currentPosts = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = filteredRecords.length;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setNoOfOpened(0);
    }
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }
    //endregion

    const [noOfOpened, setNoOfOpened] = useState(0);
    useEffect(() => {
        let changed = 930 + noOfOpened*95;
        console.log(changed);
        console.log(document.getElementById("change-height").style.height);
        document.getElementById("change-height").style.height = `${changed}px`;
    }, [noOfOpened]);

    return (
        <div className="Container">
            <div className="DocRecordTitle visually-hidden">
                <span>Previous Records</span>
            </div>
            <div className="doc-record-right" id="change-height">
                <div className="whole-table-section">
                    <div className="table-header-section">
                        <div className="table-title">
                            Previous Consultation Records
                        </div>
                        <div className="table-filter-section">
                            {isAge && <input
                                type="number"
                                placeholder="Age"
                                name="age"
                                className="DocRecordAgeFilter"
                                value={filters.age}
                                onChange={handleFilterChange}
                            />}
                            <img src={require("../../../images/doctor-page-images/age.png")} alt="Age" className="doc-search-button-table"
                                 onClick={() => {
                                     setIsAge(!isAge);
                                     setIsDate(false);
                                     setIsGender(false);
                                 }}/>
                            {isGender && <Select
                                className="DocRecordGenderFilter"
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'others', label: 'Others' },
                                ]}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}/>}
                            <img src={require("../../../images/doctor-page-images/gender.png")} alt="Gender" className="doc-search-button-table"
                                 onClick={() => {
                                     setIsGender(!isGender);
                                     setIsDate(false);
                                     setIsAge(false);
                                 }}/>
                            {isDate && <input
                                type="date"
                                name="date"
                                className="DocRecordDateFilter"
                                value={filters.date}
                                onChange={handleFilterChange}
                            />}
                            <img src={require("../../../images/doctor-page-images/date.png")} alt="Date" className="doc-search-button-table"
                                 onClick={() => {
                                     setIsDate(!isDate);
                                     setIsAge(false);
                                     setIsGender(false);
                                 }}/>
                        </div>
                        {/*<div className="table-search">*/}
                        {/*    <div className="search-widget">*/}
                        {/*        <input*/}
                        {/*            className="search-section visually-hidden"*/}
                        {/*            id="search-field"*/}
                        {/*            placeholder="Filter Here..."*/}
                        {/*            onChange={(e) => setQuery(e.target.value.toLowerCase())} />*/}
                        {/*        <i className="fa fa-search search-button-table" onClick={handleSearchClick}></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="table-body-section">
                        <div className="column-header-section">
                            <div className="doc-table-cell-section">Appointment Date</div>
                            <div className="doc-table-cell-section">Patient Name</div>
                            <div className="doc-table-cell-section">Gender</div>
                            <div className="doc-table-cell-section">Age</div>
                            <div className="doc-table-cell-section">Reason</div>
                            <div className="doc-table-cell-section">Prescription</div>
                            <div className="doc-table-cell-small-section"></div>
                        </div>
                        <hr className="table-row-divider"/>
                        <div className="table-data-section">
                            {currentPosts.map((item) => (
                                <div key={item.id}>
                                    <Collapsible
                                        trigger={
                                            <div className="table-row-section">
                                                <div className="doc-table-cell-section">{item.date}</div>
                                                <div
                                                    className="doc-table-cell-section">{item.firstName + " " + item.lastName}</div>
                                                <div className="doc-table-cell-section">{item.gender}</div>
                                                <div className="doc-table-cell-section">{item.age}</div>
                                                <div className="doc-table-cell-section">{item.reason}</div>
                                                <div className="doc-table-cell-section">
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
                                                <div className="doc-table-cell-small-section"><img className="down-icon" src={require("../../../images/doctor-page-images/down-arrow.png")} alt="Down"/></div>
                                            </div>
                                        }
                                        triggerWhenOpen={
                                            <div className="table-row-section">
                                                <div className="doc-table-cell-section">{item.date}</div>
                                                <div
                                                    className="doc-table-cell-section">{item.firstName + " " + item.lastName}</div>
                                                <div className="doc-table-cell-section">{item.gender}</div>
                                                 <div className="doc-table-cell-section">{item.age}</div>
                                                 <div className="doc-table-cell-section">{item.reason}</div>
                                                 <div className="doc-table-cell-section"><img className="download-icon" src={require("../../../images/patient_landing_page/download.png")} alt="Download"/></div>
                                                 <div className="doc-table-cell-small-section"><img className="down-icon" src={require("../../../images/doctor-page-images/up-arrow.png")} alt="Up"/></div>
                                             </div>
                                         }
                                         onOpening={() => setNoOfOpened(noOfOpened+1)}
                                         onClose={() => setNoOfOpened(noOfOpened-1)}>
                                        <div className="table-row-section">
                                            <div className="doc-table-cell-child-section"><strong>Repeat : </strong>{item.patient_type}</div>
                                            <div className="doc-table-cell-child-section"><strong>Last Appointment : </strong>{item.date}</div>
                                            <div className="doc-table-cell-child-section"><strong>Height : </strong>{item.height}</div>
                                            <div className="doc-table-cell-child-section"><strong>Weight : </strong>{item.weight}</div>
                                            <div className="doc-table-cell-child-section"><strong>Blood Group : </strong>{item.bloodGroup}</div>
                                        </div>
                                    </Collapsible>
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
            <div className="DocRecordFilters visually-hidden">
                <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    className="DocRecordAgeFilter"
                    value={filters.age}
                    onChange={handleFilterChange}
                />
                <select name="gender" className="DocRecordGenderFilter" value={filters.gender} onChange={handleFilterChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="date"
                    name="date"
                    className="DocRecordDateFilter"
                    value={filters.date}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="DocRecordList visually-hidden">
                <div className="records">
                    <div className="record imp">
                        <div className="field field-heading">ID</div>
                        <div className="field field-heading">First Name</div>
                        <div className="field field-heading">Last Name</div>
                        <div className="field field-heading">Gender</div>
                        <div className="field field-heading">Age</div>
                        <div className="field field-heading">Repeat Patient</div>
                        <div className="field field-heading">Date</div>
                    </div>
                    {filteredRecords.map((record) => (
                        <React.Fragment key={record.id}>
                            <div className={`DocRecordListItem ${expandedRecordId === record.id ? 'expanded' : ''}`} onClick={() => toggleExpandedRecord(record.id)}>
                                <div className="field">{record.id}</div>
                                <div className="field">{record.firstName}</div>
                                <div className="field">{record.lastName}</div>
                                <div className="field">{record.gender}</div>
                                <div className="field">{record.age}</div>
                                <div className="field">{record.patient_type}</div>
                                <div className="field">{record.date}</div>
                            </div>
                            {expandedRecordId === record.id && (
                                <div className="DocRecordAdditionalDetails">
                                    <hr/>
                                    <table>
                                        <thead>
                                        <tr>
                                            {/*<th>Date of Birth</th>*/}
                                            <th>Weight</th>
                                            <th>Last Appointment</th>
                                            <th>Height</th>
                                            <th>Registration Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{record.dob}</td>
                                            <td>{record.weight} kg</td>
                                            <td>{record.date}</td>
                                            <td>{record.height}</td>
                                            <td>{record.registrationDate}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="DocRecordHistory">
                                        <div className="DocRecordBlood">
                                            <h4>Blood Group</h4>
                                            <span className="DocRecordBloodGroup">{record.bloodGroup}</span>
                                        </div>
                                        <div className="DocRecordPatientHistory">
                                            <h4>Patient History</h4>
                                            <p className="tags">
                                                {record.patientHistory.map((item, index) => (
                                                    <span key={index} className="DocRecordTag">{item}</span>
                                                ))}
                                            </p>
                                        </div>
                                        <div className="DocRecordActionButtons">
                                            <button className="DocRecordDocumentButton" onClick={downloadDocument}>Download Document</button>
                                            <button className="DocRecordDocumentButton" onClick={() => getLastPrescription(record.repeatPatient)}>
                                                Get Last Prescription
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DocRecordHelper;
