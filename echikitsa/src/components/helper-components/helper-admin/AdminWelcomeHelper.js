import React, {useEffect, useRef, useState} from 'react';
import '../../../css/helper-components/helper-admin/welcome-page-style.css'
import '../../../css/helper-components/helper-patient/profile-style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {getJwtTokenFromLocalStorage, saveJwtTokenToLocalStorage} from "../../../resources/storageManagement";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {storage} from "../../firebase-config/firebaseConfigProfileImages";
import {v4} from "uuid";
import Select from "react-select";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {toast} from "react-toastify";
import {isTokenExpired} from "../../route-guard/utility";

function AdminWelcomeHelper(props) {
    const [signupType, setSignUpType] = useState('patient');
    const [adminActiveId, setAdminActiveId] = useState(null);
    const [query, setQuery] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [hospitalName, setHospitalName] = useState({});
    const [doctors,setDoctors] = useState([]);
    const [hospitalNameValue, setHospitalNameValue] = useState("");
    const [hospitalEmailValue, setHospitalEmailValue] = useState("");
    const [hospitalPhoneNumberValue, setHospitalPhoneNumberValue] = useState("");
    const [hospitalAddressValue, setHospitalAddressValue] = useState("");
    const [hospitalWebsiteValue, setHospitalWebsiteValue] = useState("");
    const [departmentName, setDepartmentName] = useState([])

    const {state}=useLocation();
    const [selectedOption, setSelectedOption] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        if (getUserIdFromLocalStorage()) {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const fetchHospitalName = async () => {
                try {
                    const response = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-specific-hospitals/${getUserIdFromLocalStorage()}`,{headers})
                    setHospitalName(response.data);
                    const { data } = response;
                    setHospitalData(data);
                    setHospitalNameValue(data.hospital_name);
                    setHospitalEmailValue(data.email);
                    setHospitalPhoneNumberValue(data.phoneNumber);
                    setHospitalAddressValue(data.address);
                    setHospitalWebsiteValue(data.website);

                    const response2 = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-doctors/${getUserIdFromLocalStorage()}`,{headers});
                    setDoctors(response2.data);

                } catch (error) {
                    console.log('Error fetching hospital name:', error);
                }
            };

            const fetchAllDepartments = async () => {
                try {
                    const response = await axios.get('https://localhost:8083/echikitsa-backend/department/get-all-departments',{headers});
                    setDepartments(response.data);
                }
                catch (error) {
                    console.log('Error fetching all departments:', error);
                }
            };
            const fetchDoctorDetails = async () => {
                try {
                    const response2 = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-doctors/${getUserIdFromLocalStorage()}`,{headers});
                    const doctorsData = response2.data.map(doctor => ({
                        doctorName: doctor.name,
                        specialization: doctor.specialization,
                        email: doctor.email,
                        isActive:doctor.active
                    }));

                    setDoctors(doctorsData);
                }
                catch (error) {
                    console.log('Error fetching all doctors:', error);
                }
            };


            const fetchDepartmentsByHospitalId = async () => {
                try {
                    const response = await axios.get(`https://localhost:8083/echikitsa-backend/hospital/get-all-departments-by-hospitalId/${getUserIdFromLocalStorage()}`,{headers});
                    const departmentsByHospitalId = response.data.map(department => department.department_id);
                    setSelectedValues(departmentsByHospitalId);
                    // console.log(departmentsByHospitalId);
                    const departmentsByHospitalIds = response.data.map(department => department.department_name);
                    // setDepartmentName(departmentsByHospitalIds)
                    // console.log(departmentsByHospitalIds);
                    const options = departmentsByHospitalIds.map(department => ({
                        value: department,
                        label: department
                    }));
                    setDepartmentName(options);
                } catch (error) {
                    console.log('Error fetching departments by hospital ID:', error);
                }
            };
            console.log(departmentName);

            fetchAllDepartments();
            // fetchDoctorDetails()
            fetchDepartmentsByHospitalId();
            fetchHospitalName();
        }
    }, [getUserIdFromLocalStorage()]);

    const [hospitalData, setHospitalData] = useState({
        name :hospitalName.hospital_name,
        email :hospitalName.email,
        phoneNumber :hospitalName.phoneNumber,
        address : hospitalName.address,
        website :hospitalName.website,
        departments :[]


    });


    const handleCheckboxChange = (departmentId, department_name) => {
        // Toggle selection status of the department
        const isSelected = selectedValues.includes(departmentId);
        const updatedValues = isSelected
            ? selectedValues.filter(value => value !== departmentId) // Remove department if already selected
            : [...selectedValues, departmentId]; // Add department if not selected

        // Update selectedValues state
        setSelectedValues(updatedValues);

        // Update hospitalData.departments based on the updated selectedValues
        const updatedDepartments = updatedValues.map(id => ({
            department_id: id,
            department_name: departments.find(dep => dep.department_id === id).department_name
        }));

        setHospitalData(prevState => ({
            ...prevState,
            departments: updatedDepartments
        }));
    };


    const handleDoctorStatus = async (id) => {
        // setAdminActiveId((prevId) => (prevId === id ? null : id));
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        const updatedDoctors = doctors.map((doctor) => {
            if (doctor.id === id) {
                return { ...doctor, active: !doctor.active};
            }
            return doctor;
        });
        setDoctors(updatedDoctors);
        const token = getJwtTokenFromLocalStorage();
        const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
        try {
            const response = await axios.put("https://localhost:8083/user-handle/admin/doctor-status-update",id,{headers}).then((response) => {
            notify_success(response.data.token);

            });

        } catch (e) {
            await notify_error("Error: ", e);

        }
        // setAdminActiveId((prevId) => (prevId === id ? null : id));
    };
    const handlePromoteDoctor = async (id) => {
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        // setAdminActiveId((prevId) => (prevId === id ? null : id));
        const updatedDoctors = doctors.map((doctor) => {
            if (doctor.id === id) {
                return { ...doctor, seniority_level: "senior"};
            }
            return doctor;
        });
        setDoctors(updatedDoctors);
        const token = getJwtTokenFromLocalStorage();
        const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
        try {
            const response = await axios.put("https://localhost:8083/user-handle/admin/promote-doctor",id,{headers}).then((response) => {
            notify_success("Doctor Promoted Successfully");

            });

        } catch (e) {
            await notify_error("Error");

        }
        // setAdminActiveId((prevId) => (prevId === id ? null : id));
    };



    const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());

    };
    const [filteredData, setFilteredData] = useState([]);
    // let filteredData = doctors.filter(item =>
    //     item.name.toLowerCase().includes(query.toLowerCase()) ||
    //     item.specialization.toLowerCase().includes(query.toLowerCase()) ||
    //     item.email.toLowerCase().includes(query.toLowerCase())
    // );

    useEffect(() => {
        if (doctors && doctors.length  > 0 ) {
            if(query === "") {
                setFilteredData(doctors);
            }
            else {
                setFilteredData(doctors.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.specialization.toLowerCase().includes(query.toLowerCase()) ||
                    item.email.toLowerCase().includes(query.toLowerCase())
                ));
            }
        }
    }, [doctors, query]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        yearOfExp: '',
        role:'DOCTOR',
        age:'',
        aadhaar:'',
        state:'',
        city:'',
        degree: '',
        gender: '',
        registrationNumber:'',
        specialization:'',
        img_url:'',
        seniorityLevel:'junior'
    });



    const uploadFiles = () => {
        console.log(imageUpload)
        if (imageUpload == null) return notify_error("No image to upload");

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        return uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                formData.img_url = url;
                console.log("Image uploaded successfully. Download URL:", url);
                return url; // Return the download URL
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
                throw error; // Propagate the error
            });
    };

    const handleInputChangeHospital = (e) => {
        const { name, value, type, checked } = e.target;

        setHospitalData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
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
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        //console.log(hospitalData);
        try {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const updatedData = {
                hospital_name: hospitalNameValue,
                email: hospitalEmailValue,
                phoneNumber: hospitalPhoneNumberValue,
                address: hospitalAddressValue,
                website: hospitalWebsiteValue,
                departments: hospitalData.departments // Preserve existing departments
            };

            const response = await axios.put(`https://localhost:8083/user-handle/admin/updateHospitalDetails/?id=${getUserIdFromLocalStorage()}`, updatedData,{headers}).then((response) => {
                console.log(response.data);
                if (response.data) {
                    notify_success(response.data.token)
                    setHospitalName(prevState => ({
                        ...prevState,
                        ...updatedData
                    }));

                     hospitalName.specializationss  = updatedData.departments.map(department => department.department_name);

                }
                else {
                    notify_error(response.data.token)
                }

            });
        } catch (error) {
            await notify_error('Error: ', error.data);

        }



    };

    const notify_success = async (response) =>{
        toast.success(
            <div>{response}</div>
        )
    }

    const notify_error = async (response) =>{
        toast.error(
            <div>{response}</div>
        )
    }

    const handleAddDoctor = async (e) => {
        // e.preventDefault();
        if (isTokenExpired()) {
            // Token has expired, handle accordingly (e.g., redirect to login)
            navigate("/login")
            return;
        }
        let res;
        await uploadFiles();
        try {
            setDoctors(d => [...d, formData]);
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const response = await axios.post(`https://localhost:8083/user-handle/admin/addDoctor/?id=${getUserIdFromLocalStorage()}`,formData,{headers}).then((response) => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    yearOfExp: '',
                    role:'DOCTOR',
                    age:'',
                    aadhaar:'',
                    state:'',
                    city:'',
                    degree: '',
                    gender: '',
                    registrationNumber:'',
                    specialization:'',
                    img_url:'',
                    seniorityLevel:'junior'
                });
                notify_success(response.data.token);
            });
        } catch (error) {
            await notify_error("Error: ",error);

        }

    }

    const [selectedValue, setSelectedValue] = useState('');
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
        // setSelectedGender(e.target.value);
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
        element.style.borderRadius = "5px"
        element.style.border = "2px solid #1D2A4D"
        element.focus();
        element.select();

        if (e.target.classList.contains('5')) {
            let selector = document.getElementById("selector-specialisation");
            selector.className = "department-selector";
        }
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
            element[i].style.border = "none"
        }
    }

    useEffect(() => {
        if(selectedOption !== null) {
            setFormData((prevData) => ({
                ...prevData,
                'specialization': selectedOption.value,
            }));
        }
    }, [selectedOption])


    return (
        <div className="admin-welcome">
            <div className="admin-welcome-action">
                <Tabs className="admin-tabs" selectedTabClassName="admin-selected-tab">
                    <TabList className="admin-tab-header">
                        <Tab className="admin-tab-header-items">Appoint a Doctor</Tab>
                        <Tab className="admin-tab-header-items">Doctor's List</Tab>
                        <Tab className="admin-tab-header-items">Terminate Contract</Tab>
                        <Tab className="admin-tab-header-items">Update Hospital Details</Tab>
                    </TabList>
                    <TabPanel className="admin-tab-panel-items">
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
                                        <Select
                                            name="specialization"
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={departmentName}
                                            required
                                        />
                                        {/*<select*/}
                                        {/*    name="specialization"*/}
                                        {/*    value={formData.specialization}*/}
                                        {/*    onChange={handleInputChange}*/}
                                        {/*    required*/}
                                        {/*>*/}
                                        {/*    <option value="">Select Specialization</option>*/}
                                        {/*    {departmentName.map((department, index) => (*/}
                                        {/*        <option key={index} value={department}>{department}</option>*/}
                                        {/*    ))}*/}
                                        {/*</select>*/}
                                    </div>
                                </div>
                                <div className="field">
                                    <input type="text" name="registrationNumber" value={formData.registrationNumber}
                                           onChange={handleInputChange}
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
                                    <input type="text" name="yearOfExp" value={formData.yearOfExp} onChange={handleInputChange}
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
                                {/*<input type="file" name="file" className="file-input" value={formData.img_url} onChange={handleInputChange}/>*/}
                                <input type="file" name="file" className="file-input" required onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}/>
                            </div>

                            <div className="field">
                                <input type="submit" value={`APPOINT`} onClick={handleAddDoctor} className="admin-appoint"/>
                                {/*<button type="submit" className="button-background"  >Login</button>*/}
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel className="admin-tab-panel-items">
                        <div className="container-terminate">
                            <div className="record-right-terminate">
                                <div className="searchall">
                                    <input
                                        className="searchs"
                                        placeholder="Search..."
                                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                    />
                                    <i className="fas fa-search"></i>
                                </div>

                                <table className="admin-record-table-terminate">
                                    <tbody>
                                    <tr>
                                        <th>Doctor Name</th>
                                        <th>Specialization</th>
                                        <th>Email</th>
                                        <th>Promote As Senior</th>
                                    </tr>
                                    {filteredData.map((item) => (<tr key={item.id} className="terminate-row">
                                            <td>{item.name}</td>
                                            <td>{item.specialization}</td>
                                            <td>{item.email}</td>
                                            {/*<td>{item.seniority_level}</td>*/}
                                            <td>
                                                <div className="ActiveDeactive">
                                                    <button
                                                        id="admin-activate-button"
                                                        onClick={() => handlePromoteDoctor(item.id)}
                                                        className={item.seniority_level === "junior" ? 'adminInactive' : ''}
                                                        disabled={item.seniority_level === "senior"}
                                                    >
                                                        {item.seniority_level === "junior" ? 'Senior' : 'Junior'}
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="admin-tab-panel-items">
                        <div className="container-terminate">
                            <div className="record-right-terminate">
                                <div className="searchall">
                                    <input
                                        className="searchs"
                                        placeholder="Search..."
                                        value={query}
                                        onChange={handleSearch}
                                    />
                                    <i className="fas fa-search"></i>
                                </div>

                                <table className="admin-record-table-terminate">
                                    <tbody>
                                    <tr>
                                        <th>Doctor Name</th>
                                        <th>Email</th>
                                        <th>Active/Deactive</th>
                                    </tr>
                                    {filteredData.map((item) => (
                                        <tr key={item.id} className="terminate-row">
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <div className="ActiveDeactive">
                                                    <button
                                                        id="admin-activate-button"
                                                        onClick={() => handleDoctorStatus(item.id)}
                                                        className={item.active ? 'adminActive' : 'adminInactive'}
                                                    >
                                                        {item.active ? 'Deactivate' : 'Activate'}

                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="admin-tab-panel-items">
                        <table className="infoContent">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Hospital Name : </span>
                                        <input className="user-data-value editable" name="name" onChange={(e) => setHospitalNameValue(e.target.value)} type="text" placeholder={hospitalName.hospital_name} readOnly={true}/>
                                        <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Email ID : </span>
                                        <input className="user-data-value editable" name="email"  onChange={(e) => setHospitalEmailValue(e.target.value)} type="text" placeholder={hospitalName.email} readOnly={true}/>
                                        <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Phone : </span>
                                        <input className="user-data-value editable" name="phoneNumber"  onChange={(e) => setHospitalPhoneNumberValue(e.target.value)} type="text" placeholder={hospitalName.phoneNumber} readOnly={true}/>
                                        <i className="fa fa-pencil 2" onClick={makeEditable}></i>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Address : </span>
                                        <input className="user-data-value editable"  name="address"  onChange={(e) => setHospitalAddressValue(e.target.value)} type="text" placeholder={hospitalName.address} readOnly={true}/>
                                        <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Website : </span>
                                        <input className="user-data-value editable" name="website"  onChange={(e) => setHospitalWebsiteValue(e.target.value)} type="text" placeholder={hospitalName.website} readOnly={true}/>
                                        <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-data">
                                        <span className="user-data-label">Specialisation : </span>
                                        <input className="user-data-value editable" name="specialisation" onChange={handleSpecialisationChange} type="text" placeholder="Select specialisations to add" readOnly/>
                                        <i className="fa fa-pencil 5" onClick={makeEditable}></i>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="department-selector visually-hidden" id="selector-specialisation">
                            <h2>Select Departments:</h2>
                            <div className="checkbox-container">
                                {departments.map((department, index) => (
                                    <div key={index}>
                                        <div
                                            className={selectedValues.includes(department.department_id) ? 'selected checkbox-item' : 'checkbox-item'}>
                                            <input
                                                type="checkbox"
                                                value={department.department_id}
                                                checked={selectedValues.includes(department.department_id)}
                                                onChange={() => handleCheckboxChange(department.department_id, department.department_name)}
                                            />
                                            <span>{department.department_name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/*{selectedValues.length > 0 && (*/}
                            {/*    <p>You selected: {selectedValues.join(', ')}</p>*/}
                            {/*)}*/}
                        </div>
                        <div className="update-profile-button-section">
                            <button className="update-profile-button visually-hidden" id="profile-update-button"
                                    onClick={handleUpdateHospitalDetails}>SAVE
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="admin-welcome-hospital">
                <div className="hospital-details-section">
                    <div className="hospital-details-image-section">
                        <img className="hospital-details-image" src={hospitalName.image_path} alt="Hospital"/>
                    </div>
                    <table className="admin-hospital-detail-table">
                        <tbody>
                        <tr>
                            <td>Hospital Name</td>
                            <td>{hospitalName.hospital_name} Hospital</td>
                        </tr>
                        <tr>
                            <td>Registration No.</td>
                            <td>{hospitalName.registrationNumber}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{hospitalName.email} </td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{hospitalName.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{hospitalName.address}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>{hospitalName.website}</td>
                        </tr>
                        <tr>
                            <td>No. of Doctors</td>
                            <td>{hospitalName.noOfDoctors}</td>
                        </tr>
                        <tr>
                            <td>No. of Senior Doctors</td>
                            <td>{hospitalName.noOFSeniorDoctors}</td>
                        </tr>
                        <tr>
                            <td>Specialisations Available</td>
                            <td> {hospitalName.specializationss && hospitalName.specializationss.map((spc, index) => (
                                <span
                                    key={index}>{spc} {index !== hospitalName.specializationss.length - 1 && ", "} </span>
                            ))}</td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td>{hospitalName.rating}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminWelcomeHelper;
