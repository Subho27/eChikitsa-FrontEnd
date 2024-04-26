import React, {useEffect, useState} from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import axios from "axios";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {number} from "sockjs-client/lib/utils/random";
import {toast} from "react-toastify";


function DocProfilePage() {
    const [profile, setProfile] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState("");
    const [gender, setGender] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [active, setActive] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [degree, setDegree] = useState('');
    const [experiences, setExperiences] = useState(10);
    const [specialization, setSpecialization] = useState('');
    // const [load, setLoad] = useState(false);
    const [tmp, setTmp] = useState({});
    const userId =  getUserIdFromLocalStorage();
    useEffect(() => {
        if (userId) {
            const getUserData = async (e) => {
                try {
                    const token = getJwtTokenFromLocalStorage();
                    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }

                    const response = await axios.get(`https://localhost:8083/echikitsa-backend/doctor/get/${userId}`,{headers}).then((response) => {
                         console.log(response.data);
                        if (response.data) {
                            setTmp(response.data);
                        }
                        else {
                           notify_error("Something went wrong !!")
                        }

                    });
                } catch (error) {
                    await notify_error('Error: ', error);

                }



            };
            getUserData();
        }
    }, [])
    const handlePatientSave = async (newDocumentUrl) => {

        try {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
            const updatedData = {
            };

            const response = await axios.put(`https://localhost:8083/user-handle/doctor/update-details/?id=${userId}`, tmp, { headers });
            if (response.data) {
                await notify_success(response.data);
            } else {
                await notify_error("Something went wrong !!");
            }
        } catch (error) {
            await notify_error('Error: ', error);
        }
    };

    const [updatedProfile, setUpdatedProfile] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTmp(prevState => ({
            ...prevState,
            [name]: value
        }));
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

        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button";
    }

    const onProfileSave = () => {
        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button visually-hidden";

        let element = document.getElementsByClassName("user-data-value editable");
        for(let i=0; i<element.length; i++) {
            element[i].readOnly = true;
            element[i].style.border = "none"
        }
    }

    const updateProfile = () => {

        console.log('Updated profile:', updatedProfile);
        setProfile(updatedProfile);
        setUpdatedProfile({
            name: '',
            email: '',
            mobile: ''
        });
    };

    const on = () => {
        document.getElementById("overlay-patient-profile").style.display = "block";
    }

    const off = () => {
        document.getElementById("overlay-patient-profile").style.display = "none";
    }

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

    return (
        <div>
            <div id="overlay-patient-profile" onClick={off}>
                <img className="overlay-profile" src={tmp.img_url} alt="profile"/>
            </div>
            <div className="containerProfile">
                <div className="leftSideContents">
                    <img className="profile-picture" src={tmp.img_url} alt="Profile"/>
                    <div>
                        <p className="profile-info">{((tmp.seniority_level === 'senior' ) ? "SDr. " : "JDr. ") + tmp.firstName + " " + tmp.lastName}</p>
                        <p className="address-info">{tmp.city +", "+ tmp.state}</p>
                        {/*<p className="address-info">{profile.hospital}</p>*/}
                        <p className="address-info">{tmp.age}</p>
                        <p className="address-info">Rating : {tmp.rating}/5</p>
                    </div>
                    <div className="update-picture-button-section">
                        <button className="show-button" onClick={on}>SHOW PHOTO</button>
                        <button className="update-button">UPDATE PHOTO</button>
                    </div>
                </div>
                <div className="rightSideContents">
                    <div className="information">
                        <h4>Information</h4>
                        <hr/>
                    </div>
                    <table className="infoContent">
                        <tbody>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Name : </span>
                                    <input className="user-data-value" type="text" placeholder={tmp.firstName + " " + tmp.lastName} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Email ID : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => setTmp(prevState => ({ ...prevState, email: e.target.value }))} placeholder={tmp.email} readOnly={true}/>
                                    <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Registration No. : </span>
                                    <input className="user-data-value" type="text" placeholder={tmp.registrationNumber} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Degree : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => setTmp(prevState => ({ ...prevState, degree: e.target.value }))} placeholder={tmp.degree} readOnly={true}/>
                                    <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Phone : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => setTmp(prevState => ({ ...prevState, phoneNumber: e.target.value }))} placeholder={"+91-" + tmp.phoneNumber} readOnly={true}/>
                                    <i className="fa fa-pencil 2" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Age : </span>
                                    <input className="user-data-value editable" type="text"  onChange={(e) => setTmp(prevState => ({ ...prevState, age: e.target.value }))} placeholder={tmp.age + " Years"} readOnly={true}/>
                                    <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Gender : </span>
                                    <input className="user-data-value" type="text" placeholder={tmp.gender} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Aadhaar : </span>
                                    <input className="user-data-value" type="text" placeholder={tmp.aadhaar} readOnly/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Address : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => tmp.state(e.target.value)} placeholder={tmp.state} readOnly={true}/>
                                    <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Password : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => tmp.password(e.target.value)}placeholder="   ****    " readOnly={true}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Specialization : </span>
                                    <input className="user-data-value editable" type="text"  onChange={(e) => setTmp(prevState => ({ ...prevState, specialization: e.target.value }))} placeholder={tmp.specialization} readOnly={true}/>
                                    <i className="fa fa-pencil 6" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Experience : </span>
                                    <input className="user-data-value editable" type="text" onChange={(e) => setTmp(prevState => ({ ...prevState, yearOfExp: e.target.value }))} placeholder={tmp.yearOfExp} readOnly={true}/>
                                    <i className="fa fa-pencil 7" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="update-profile-button-section">
                        <button className="update-profile-button visually-hidden" id="profile-update-button" onClick={handlePatientSave}>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocProfilePage;
