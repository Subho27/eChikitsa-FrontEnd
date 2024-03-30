import React, {useRef, useState} from 'react';
import Collapsible from 'react-collapsible';
import '../../../css/helper-components/helper-admin/welcome-page-style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {dummy} from "./dummy";
import axios from "axios";
import {getJwtTokenFromLocalStorage, saveJwtTokenToLocalStorage} from "../../../resources/storageManagement";

function AdminWelcomeHelper() {
    const [signupType, setSignUpType] = useState('patient');

    const [adminActiveId, setAdminActiveId] = useState(null);

    const [query, setQuery] = useState("");


    const toggleActivation = (id) => {
        setAdminActiveId((prevId) => (prevId === id ? null : id));
    };


    const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());

    };
    const filteredData = dummy.filter(item =>
        item.DoctorName.toLowerCase().includes(query.toLowerCase()) ||
        item.Specialization.toLowerCase().includes(query.toLowerCase()) ||
        item.Email.toLowerCase().includes(query.toLowerCase())
    );
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        yeraOfExp: '',
        role:'DOCTOR',
        age:'',
        aadhaar:'',
        state:'',
        city:'',
        degree: '',
        gender: '',
        registrationNumber:'',
        specialization:''

    });
//******************************************************************************
    const [hospitalData, setHospitalData] = useState({
        name :'',
        email :'',
        phone :'',
        address :'',
        website :'',
        departments :[]




    });

    const handleInputChangeHospital = (e) => {
        const { name, value, type, checked } = e.target;

        setHospitalData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        //console.log(hospitalData);
    };

    // Function to handle specialisation selection
    const handleSpecialisationChange = (event) => {
        const { options } = event.target;
        const selectedSpecialisations = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedSpecialisations.push(options[i].value);
            }
        }
        setHospitalData(prevState => ({
            ...prevState,
            specialisation: selectedSpecialisations
        }));
    };
    const handleUpdateHospitalDetails = async (e) => {
        e.preventDefault();
        //console.log(hospitalData);
            try {
                const token = getJwtTokenFromLocalStorage();
                const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }

                const response = await axios.post('http://localhost:9191/api/updateHospitalDetails/?id=1', hospitalData,{headers}).then((response) => {
                    console.log(response.data);
                    if (response.data) {
                        alert(response.data)

                    }
                    else {
                        alert("Something went wrong !!")
                    }

                });
            } catch (error) {
                console.error('Error:', error);

            }



    };

//*****************************************


    const [selectedValues, setSelectedValues] = useState([]);
    const departmentOptions = [
        "Cardiology",
        "Orthopedics",
        "Neurology",
        "Dermatology",
        "Pediatrics",
        "Oncology",
        "Ophthalmology",
        "Psychiatry",
        "Urology",
        "Gastroenterology"
    ];

    const handleCheckboxChange = (department) => {
        if (selectedValues.includes(department)) {
            setSelectedValues(selectedValues.filter(item => item !== department));
        } else {
            setSelectedValues([...selectedValues, department]);
        }
        setHospitalData(prevState => ({
            ...prevState,
            departments: selectedValues
        }));
    };



    const [selectedGender, setSelectedGender] = useState('');
    const handleSignUpType = (type) => {
        setSignUpType(type.toLowerCase());
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleActivation = (id) => {
        setAdminActiveId(id); // Update activeId to the id of the doctor being activated
        // Additional logic for activation
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleGenderChange = (e) => {
        //setSelectedGender(e.target.value);
        formData.gender = e.target.value;
        setSelectedGender(e.target.value);
    };



    // EMAIL - OTP functions
    const [emailOtpValues, setEmailOtpValues] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    const handleEmailChange = (index, value) => {
        const newOtpValues = [...emailOtpValues];
        newOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputRefs.current[index].value = '';
                inputRefs.current[index - 1].focus();
            }
        } else if (index < emailOtpValues.length - 1 && value.length === 1) {
            inputRefs.current[index + 1].focus();
        }
        setEmailOtpValues(newOtpValues);
    };

    // REGISTRATION - OTP functions
    const [registrationOtpValues, setRegistrationOtpValues] = useState(Array(6).fill(''));
    const inputRRefs = useRef([]);

    const handleRegistrationChange = (index, value) => {
        const newerOtpValues = [...registrationOtpValues];
        newerOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputRRefs.current[index].value = '';
                inputRRefs.current[index - 1].focus();
            }
        } else if (index < registrationOtpValues.length - 1 && value.length === 1) {
            inputRRefs.current[index + 1].focus();
        }
        setRegistrationOtpValues(newerOtpValues);
    };

    const makeEditable = (e) => {
        let target = e.target.className.split(" ");
        target = parseInt(target[target.length - 1]);
        let element = document.getElementsByClassName("user-data-value editable")[target];
        element.readOnly = false;

        let selector = document.getElementById("selector-specialisation");
        selector.className = "department-selector";
        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button";
    }

    const onProfileSave = () => {
        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button visually-hidden";

        let selector = document.getElementById("selector-specialisation");
        selector.className = "department-selector visually-hidden";
        let element = document.getElementsByClassName("user-data-value editable");
        for(let i=0; i<element.length; i++) {
            element[i].readOnly = true;
        }
    }


    // *************************************************
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        //console.log(formData)
        try {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const response = await axios.post('http://localhost:9191/api/addDoctor/?id=1',formData,{headers}).then((response) => {

            });
        } catch (error) {
            console.error('Error:', error);

        }

    }


    //**************************************************
    return (
        <div className="admin-welcome">
            <div className="admin-welcome-action">
                <Collapsible trigger="Appoint a Doctor" className="admin-ask-record" openedClassName="admin-ask-record-open"
                             triggerClassName="admin-ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                    <form action="#">
                        <div className="fg">

                            <div className="field">
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                       required/>
                                <label>First Name</label>
                            </div>
                            <div className="field">
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                       required/>
                                <label>Last Name</label>
                            </div>
                        </div>
                        <div className="fg">
                            <div className="field">
                                <input type="text" name="email" value={formData.email} onChange={handleInputChange}
                                       required/>
                                <label>Email</label>
                            </div>
                            <div className="field">
                                <input type="text" name="phoneNumber" value={formData.phoneNumber}
                                       onChange={handleInputChange} required/>
                                <label>Phone Number</label>
                            </div>
                        </div>

                        <div className="fg">
                            <div className="admin-spec-field">
                                <div className="admin-specialization-label">
                                    <span>Specialization</span>
                                </div>
                                <div className="admin-specialsel">
                                    <select name="specialization" value={formData.specialization} onChange={handleInputChange}
                                            required>
                                        <option value="">Select Specialization</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="Ophthalmology">Ophthalmology</option>
                                        <option value="Gastroenterology">Gastroenterology</option>
                                        <option value="Oncology">Oncology</option>
                                        <option value="Endocrinology">Endocrinology</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Nephrology">Nephrology</option>
                                        <option value="Pulmonology">Pulmonology</option>
                                        <option value="Rheumatology">Rheumatology</option>
                                        <option value="Urology">Urology</option>
                                        <option value="Hematology">Hematology</option>
                                        <option value="Psychiatry">Psychiatry</option>
                                        <option value="Dentistry">Dentistry</option>
                                        <option value="Emergency Medicine">Emergency Medicine</option>
                                        <option value="Radiology">Radiology</option>
                                        <option value="Anesthesiology">Anesthesiology</option>
                                        <option value="Pathology">Pathology</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange}
                                       required/>
                                <label>Registration Number</label>
                            </div>
                        </div>

                        <div className="fg">
                            <div className="field">
                                <input type="text" name="age" value={formData.age} onChange={handleInputChange}
                                       required/>
                                <label>Age</label>
                            </div>
                            <div className="field">
                                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange}
                                       required/>
                                <label>Aadhaar</label>
                            </div>
                        </div>

                        <div className="fg">
                            <div className="field">
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange}
                                       required/>
                                <label>State</label>
                            </div>
                            <div className="field">
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required/>
                                <label>City</label>
                            </div>
                        </div>

                        <div className="fg">
                            <div className="field">
                                <input type="text" name="yeraOfExp" value={formData.yeraOfExp} onChange={handleInputChange}
                                       required/>
                                <label>Years of Experience</label>
                            </div>
                            <div className="field">
                                <input type="text" name="degree" value={formData.degree}
                                       onChange={handleInputChange} required/>
                                <label>Degree</label>
                            </div>
                        </div>

                        <div className="fg">
                            <div className="content">
                                <span className="gen">Gender</span>
                                <div className="radio">
                                    <input type="radio" id="male" name="gender" value="male"
                                           checked={selectedGender === 'male'} onChange={handleGenderChange}/>
                                    <span className="remember-text">Male</span>
                                </div>
                                <div className="radio">
                                    <input type="radio" id="female" name="gender" value="female"
                                           checked={selectedGender === 'female'} onChange={handleGenderChange}/>
                                    <span className="remember-text">Female</span>
                                </div>

                                <div className="radio">
                                    <input type="radio" id="others" name="gender" value="others"
                                           checked={selectedGender === 'others'} onChange={handleGenderChange}/>
                                    <span className="remember-text">Others</span>
                                </div>
                            </div>
                        </div>

                        <div className="fg form-group mt-3">
                            <div className="admin-cc">
                                <span>Upload your Photo</span>
                            </div>
                            <input type="file" name="file" className="file-input"/>
                        </div>

                        <div className="field">
                            <input type="submit" value={`APPOINT`} onClick={handleAddDoctor} className="admin-appoint"/>
                            {/*<button type="submit" className="button-background"  >Login</button>*/}
                        </div>
                    </form>
                </Collapsible>
                <Collapsible trigger="Doctor's List" className="admin-ask-record" openedClassName="admin-ask-record-open"
                             triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">

                    <div className="Container">
                        <div className="recordRight">
                            <div className="searchall">
                                <input
                                    className="searchs"
                                    placeholder="Search..."
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                />
                                <i className="fas fa-search"></i>
                            </div>

                            <table className="adminRecordTable">
                                <tbody>
                                <tr>
                                    <th>Doctor Name </th>
                                    <th>Specialization </th>
                                    <th>Email</th>
                                    {/*<th>Active</th>*/}
                                </tr>
                                {filteredData.map((item) => (<tr key={item.id}>

                                        <td>{item.DoctorName}</td>
                                        <td>{item.Specialization}</td>
                                        <td>{item.Email}</td>
                                        {/*<td>{item.Active}</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Collapsible>
                <Collapsible trigger="Terminate Doctor's Contract" className="admin-ask-record" openedClassName="admin-ask-record-open"
                             triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                    <div className="Container">
                        <div className="recordRight">
                            <div className="searchall">
                                <input
                                    className="searchs"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={handleSearch}
                                />
                                <i className="fas fa-search"></i>
                            </div>

                            <table className="adminRecordTable">
                                <tbody>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Email</th>
                                    <th>Active/Deactive</th>
                                </tr>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.DoctorName}</td>
                                        <td>{item.Email}</td>
                                        <td>
                                            <div className="ActiveDeactive">
                                                <button
                                                    id="admin-activate-button"
                                                    onClick={() => toggleActivation(item.id)}
                                                    className={adminActiveId === item.id ? 'adminActive' : 'adminInactive'}
                                                >
                                                    {adminActiveId === item.id ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </Collapsible>
                <Collapsible trigger="Update Hospital Details" className="admin-ask-record" openedClassName="admin-ask-record-open"
                             triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                    <table className="infoContent">
                        <tbody>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Hospital Name : </span>
                                    <input className="user-data-value editable" name="name" value={hospitalData.name} onChange={handleInputChangeHospital} type="text" placeholder={hospitalData.name} readOnly={true}/>
                                    <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Email ID : </span>
                                    <input className="user-data-value editable" name="email" value={hospitalData.email} onChange={handleInputChangeHospital} type="text" placeholder={hospitalData.email} readOnly={true}/>
                                    <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Phone : </span>
                                    <input className="user-data-value editable" name="phone" value={hospitalData.phone} onChange={handleInputChangeHospital} type="text" placeholder={hospitalData.phone} readOnly={true}/>
                                    <i className="fa fa-pencil 2" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Address : </span>
                                    <input className="user-data-value editable"  name="address" value={hospitalData.address} onChange={handleInputChangeHospital} type="text" placeholder={hospitalData.address} readOnly={true}/>
                                    <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Website : </span>
                                    <input className="user-data-value editable" name="website" value={hospitalData.website} onChange={handleInputChangeHospital} type="text" placeholder={hospitalData.website} readOnly={true}/>
                                    <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Specialisation : </span>
                                    <input className="user-data-value editable" name="specialisation" value={hospitalData.specialisation} onChange={handleSpecialisationChange}type="text" placeholder="Select specialisations to add" readOnly/>
                                    <i className="fa fa-pencil 5" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="department-selector visually-hidden" id="selector-specialisation">
                        <h2>Select Departments:</h2>
                        <div className="checkbox-container">
                            {departmentOptions.map((department, index) => (
                                <div key={index}>
                                    <div
                                        className={selectedValues.includes(department) ? 'selected checkbox-item' : 'checkbox-item'}
                                        onClick={() => handleCheckboxChange(department)}>
                                        <input
                                            type="checkbox"
                                            value={department}
                                            checked={selectedValues.includes(department)}
                                            onChange={() => handleCheckboxChange(department)}
                                        />
                                        <span>{department}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedValues.length > 0 && (
                            <p>You selected: {selectedValues.join(', ')}</p>
                        )}
                    </div>
                    <div className="update-profile-button-section">
                        <button className="update-profile-button visually-hidden" id="profile-update-button" onClick={handleUpdateHospitalDetails}>SAVE</button>
                    </div>
                </Collapsible>
            </div>
            <div className="admin-welcome-hospital">
                <div className="hospital-details-section">
                    <div className="hospital-detail-header">Hello, ADMIN</div>
                    <div className="hospital-details-image-section">
                        <img className="hospital-details-image" src={require("../../../images/patient_landing_page/Hospital_Img/hospital1.jpg")} alt="Hospital"/>
                    </div>
                    <table className="admin-hospital-detail-table">
                        <tbody>
                        <tr>
                            <td>Hospital Name</td>
                            <td>Sanjeevani Hospital</td>
                        </tr>
                        <tr>
                            <td>Registration No.</td>
                            <td>KAR789200HILL</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>info@harmonymedicalcenter.com</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>(555) 123-4567</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>Mumbai, Maharashtra, India</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>www.harmonymedicalcenter.com</td>
                        </tr>
                        <tr>
                            <td>No. of Doctors</td>
                            <td>13</td>
                        </tr>
                        <tr>
                            <td>No. of Senior Doctors</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Specialisations Available</td>
                            <td>General Medicine, Pediatrics</td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td>4.5</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminWelcomeHelper;