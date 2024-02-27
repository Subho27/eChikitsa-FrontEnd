import React, {useRef, useState} from 'react';
import Collapsible from 'react-collapsible';
import '../../../css/helper-components/helper-admin/welcome-page-style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {dummy} from "./dummy";

function AdminWelcome() {
    const [signupType, setSignUpType] = useState('patient');

    const [activeId, setActiveId] = useState(null);

    const [query, setQuery] = useState("");


    const toggleActivation = (id) => {
        setActiveId((prevId) => (prevId === id ? null : id));
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
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        age:'',
        aadhaar:'',
        state:'',
        city:'',
        confirmPassword: '',
        gender: '',

    });
    const [selectedValue, setSelectedValue] = useState('');

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
        setActiveId(id); // Update activeId to the id of the doctor being activated
        // Additional logic for activation
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleGenderChange = (e) => {
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
    return (
        <div >
            <Collapsible trigger="Add Doctor" className="ask-record" openedClassName="ask-record-open"
                         triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
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
                        <div className="field">
                            <div className="specialsel">
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
                            <label className="specialization-label">Specialization</label>

                        </div>
                        <div className="field">
                        <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange}
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
                            <input type="text" name="password" value={formData.password} onChange={handleInputChange}
                                   required/>
                            <label>Years of Experience</label>
                        </div>
                        <div className="field">
                            <input type="text" name="confirmPassword" value={formData.confirmPassword}
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
                        <span className="cc">Upload your Photo</span>
                        <input type="file" name="file" className="file-input"/>
                    </div>

                    <div className="field">
                        <input type="submit" value={`Register`}/>
                    </div>
                </form>
            </Collapsible>
            <Collapsible trigger="View Doctor" className="ask-record" openedClassName="ask-record-open"
                         triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">

                <div className="Container">
                    <div className="RecordTitle">
                        <div className="textjk">Doctors</div>
                    </div>
                    <div className="Recordright">
                        <div className="searchall">
                            <input
                                className="searchs"
                                placeholder="Search..."
                                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                            />
                            <i className="fas fa-search"></i>
                        </div>

                        <table className="recordTable">
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
            <Collapsible trigger="Delete Doctor" className="ask-record" openedClassName="ask-record-open"
                         triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">

                <div className="Container">
                    <div className="RecordTitle">
                        <div className="textjk">Doctors</div>
                    </div>
                    <div className="Recordright">
                        <div className="searchall">
                            <input
                                className="searchs"
                                placeholder="Search..."
                                value={query}
                                onChange={handleSearch}
                            />
                            <i className="fas fa-search"></i>
                        </div>

                        <table className="recordTable">
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
                                                onClick={() => toggleActivation(item.id)}
                                                className={activeId === item.id ? 'active' : 'inactive'}
                                            >
                                                {activeId === item.id ? 'Deactivate' : 'Activate'}
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
            <Collapsible trigger="Update Hospital" className="ask-record" openedClassName="ask-record-open"
                         triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                <form action="#">
                    <div className="fg">

                        <div className="field">
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                   required/>
                            <label>Hospital Name</label>
                        </div>
                        <div className="field">
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                   required/>
                            <label>Contact</label>
                        </div>
                    </div>
                </form>
                <div className="department-selector">
                    <h2>Select Departments:</h2>
                    {departmentOptions.map((department, index) => (
                        <div key={index}>
                            <div
                                className={selectedValues.includes(department) ? 'selected' : ''}
                                onClick={() => handleCheckboxChange(department)}
                            >
                                <input
                                    type="checkbox"
                                    value={department}
                                    checked={selectedValues.includes(department)}
                                    onChange={() => handleCheckboxChange(department)}
                                />
                                {department}
                            </div>
                        </div>
                    ))}
                    {selectedValues.length > 0 && (
                        <p>You selected: {selectedValues.join(', ')}</p>
                    )}
                </div>
            </Collapsible>
        </div>
    );
}

export default AdminWelcome;
