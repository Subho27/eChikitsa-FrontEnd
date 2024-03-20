import React, { useState } from "react";
import "../../../css/helper-components/helper-doctor/doc-records-style.css";

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
    const [filters, setFilters] = useState({ age: "", gender: "", date: "" });

    const toggleExpandedRecord = (recordId) => {
        setExpandedRecordId(expandedRecordId === recordId ? null : recordId);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

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

    return (
        <div className="DocRecordContainer">
            <div className="DocRecordTitle">
                <span>Previous Records</span>
            </div>
            <div className="DocRecordFilters">
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
            <div className="DocRecordList">
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
