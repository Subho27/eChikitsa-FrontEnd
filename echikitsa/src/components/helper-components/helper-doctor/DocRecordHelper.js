import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-doctor/doc-records-style.css";
import Collapsible from "react-collapsible";
import Select from "react-select";

// Dummy patient records
const dummyPatientRecords = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        age: 35,
        blood: "O+",
        repeatPatient: "n",
        date: "2024-02-21",
        dob: "1989-05-15",
        weight: 70,
        lastAppointment: "2023-12-10",
        height: "6'1",
        registrationDate: "2023-12-01",
        patientHistory: ["Asthma", "Hypertension"]
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        gender: "Female",
        age: 28,
        blood: "AB+",
        repeatPatient: "r",
        date: "2024-02-20",
        dob: "1996-09-20",
        weight: 55,
        lastAppointment: "2023-11-25",
        height: "5'5",
        registrationDate: "2023-11-20",
        patientHistory: ["Fever", "Headache"]
    },
    // Create 8 more records with similar structure
    {
        id: 3,
        firstName: "David",
        lastName: "Brown",
        gender: "Male",
        age: 45,
        blood: "A-",
        repeatPatient: "n",
        date: "2024-02-19",
        dob: "1979-03-10",
        weight: 80,
        lastAppointment: "2023-10-15",
        height: "5'11",
        registrationDate: "2023-10-01",
        patientHistory: ["Diabetes", "High Cholesterol"]
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Johnson",
        gender: "Female",
        age: 42,
        blood: "B+",
        repeatPatient: "r",
        date: "2024-02-18",
        dob: "1982-07-05",
        weight: 65,
        lastAppointment: "2023-09-20",
        height: "5'6",
        registrationDate: "2023-09-01",
        patientHistory: ["Allergy", "Migraine"]
    },
    {
        id: 5,
        firstName: "Michael",
        lastName: "Williams",
        gender: "Male",
        age: 50,
        blood: "O-",
        repeatPatient: "n",
        date: "2024-02-17",
        dob: "1974-12-30",
        weight: 85,
        lastAppointment: "2023-08-15",
        height: "6'0",
        registrationDate: "2023-08-01",
        patientHistory: ["Arthritis", "Obesity"]
    },
    {
        id: 6,
        firstName: "Emma",
        lastName: "Brown",
        gender: "Female",
        age: 32,
        blood: "AB-",
        repeatPatient: "r",
        date: "2024-02-16",
        dob: "1992-04-12",
        weight: 58,
        lastAppointment: "2023-07-10",
        height: "5'4",
        registrationDate: "2023-07-01",
        patientHistory: ["Anxiety", "Depression"]
    },
    {
        id: 7,
        firstName: "Daniel",
        lastName: "Jones",
        gender: "Male",
        age: 38,
        blood: "A+",
        repeatPatient: "n",
        date: "2024-02-15",
        dob: "1986-08-20",
        weight: 75,
        lastAppointment: "2023-06-05",
        height: "5'9",
        registrationDate: "2023-06-01",
        patientHistory: ["Asthma", "Diabetes"]
    },
    {
        id: 8,
        firstName: "Olivia",
        lastName: "Davis",
        gender: "Female",
        age: 25,
        blood: "B-",
        repeatPatient: "r",
        date: "2024-02-14",
        dob: "1999-01-25",
        weight: 50,
        lastAppointment: "2023-05-25",
        height: "5'3",
        registrationDate: "2023-05-01",
        patientHistory: ["Hypertension", "Thyroid Disorder"]
    },
    {
        id: 9,
        firstName: "James",
        lastName: "Miller",
        gender: "Male",
        age: 40,
        blood: "AB+",
        repeatPatient: "n",
        date: "2024-02-21",
        dob: "1984-11-15",
        weight: 72,
        lastAppointment: "2023-04-20",
        height: "5'10",
        registrationDate: "2023-04-01",
        patientHistory: ["Heart Disease", "Stroke"]
    },
    {
        id: 10,
        firstName: "Sophia",
        lastName: "Wilson",
        gender: "Female",
        age: 30,
        blood: "O+",
        repeatPatient: "r",
        date: "2024-02-12",
        dob: "1994-06-05",
        weight: 60,
        lastAppointment: "2023-03-15",
        height: "5'7",
        registrationDate: "2023-03-01",
        patientHistory: ["Allergy", "Rheumatoid Arthritis"]
    }
];

const DocRecordHelper = () => {
    const [expandedRecordId, setExpandedRecordId] = useState(null);
    const [isAge, setIsAge] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [isGender, setIsGender] = useState(false);
    const [filters, setFilters] = useState({ age: "", gender: "", date: "" });
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleExpandedRecord = (recordId) => {
        setExpandedRecordId(expandedRecordId === recordId ? null : recordId);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

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
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Others', label: 'Others' },
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
                                                <div className="doc-table-cell-section">{item.firstName + " " + item.lastName}</div>
                                                <div className="doc-table-cell-section">{item.gender}</div>
                                                <div className="doc-table-cell-section">{item.age}</div>
                                                <div className="doc-table-cell-section">{item.patientHistory[0]}</div>
                                                <div className="doc-table-cell-section"><img className="download-icon" src={require("../../../images/patient_landing_page/download.png")} alt="Download"/></div>
                                                <div className="doc-table-cell-small-section"><img className="down-icon" src={require("../../../images/doctor-page-images/down-arrow.png")} alt="Down"/></div>
                                            </div>
                                        }
                                         triggerWhenOpen = {
                                             <div className="table-row-section">
                                                 <div className="doc-table-cell-section">{item.date}</div>
                                                 <div className="doc-table-cell-section">{item.firstName + " " + item.lastName}</div>
                                                 <div className="doc-table-cell-section">{item.gender}</div>
                                                 <div className="doc-table-cell-section">{item.age}</div>
                                                 <div className="doc-table-cell-section">{item.patientHistory[0]}</div>
                                                 <div className="doc-table-cell-section"><img className="download-icon" src={require("../../../images/patient_landing_page/download.png")} alt="Download"/></div>
                                                 <div className="doc-table-cell-small-section"><img className="down-icon" src={require("../../../images/doctor-page-images/up-arrow.png")} alt="Up"/></div>
                                             </div>
                                         }
                                         onOpening={() => setNoOfOpened(noOfOpened+1)}
                                         onClose={() => setNoOfOpened(noOfOpened-1)}>
                                        <div className="table-row-section">
                                            <div className="doc-table-cell-child-section"><strong>Repeat : </strong>{item.repeatPatient !== undefined && item.repeatPatient.toUpperCase()}</div>
                                            <div className="doc-table-cell-child-section"><strong>Last Appointment : </strong>{item.lastAppointment}</div>
                                            <div className="doc-table-cell-child-section"><strong>Height : </strong>{item.height}</div>
                                            <div className="doc-table-cell-child-section"><strong>Weight : </strong>{item.weight}</div>
                                            <div className="doc-table-cell-child-section"><strong>Blood Group : </strong>{item.blood}</div>
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
                                <div className="field">{record.repeatPatient}</div>
                                <div className="field">{record.date}</div>
                            </div>
                            {expandedRecordId === record.id && (
                                <div className="DocRecordAdditionalDetails">
                                    <hr/>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Date of Birth</th>
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
                                            <td>{record.lastAppointment}</td>
                                            <td>{record.height}</td>
                                            <td>{record.registrationDate}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="DocRecordHistory">
                                        <div className="DocRecordBlood">
                                            <h4>Blood Group</h4>
                                            <span className="DocRecordBloodGroup">{record.blood}</span>
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
