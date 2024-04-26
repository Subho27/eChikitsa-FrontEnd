import React, {useEffect, useState} from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';
import axios from "axios";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import {useLocation} from "react-router-dom";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase-config/firebaseConfigProfileImages";
import {v4} from "uuid";
import {toast} from "react-toastify";


function ProfilePage(props) {
    const [profile, setProfile] = useState({})
    const [docUpload, setDocUpload] = useState(null);
    const userId =  getUserIdFromLocalStorage();
    const [imageUpload, setImageUpload] = useState(null);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bloodGroup, setBloodGroup] = useState('');
    const [documentUrl, setDocumentUrl] = useState('');
    const [updatedProfile, setUpdatedProfile] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [active, setActive] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
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
        console.log(profile)
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
    useEffect(() => {
        const id = parseInt(window.location.pathname.split("/")[2]);
        console.log(id);

    }, []);

    useEffect(() => {
        if (userId) {
            const getUserData = async (e) => {
                try {
                    const token = getJwtTokenFromLocalStorage();
                    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }

                    const response = await axios.get(`https://localhost:8083/echikitsa-backend/user/get-user/${userId}`,{headers}).then((response) => {
                        console.log(response.data);
                        if (response.data) {
                            setProfile(response.data)
                            const { data } = response;
                            setHeight(data.height);
                            setWeight(data.weight);
                            setBloodGroup(data.bloodGroup);
                            setDocumentUrl(data.document_url);
                            setFirstName(data.firstName);
                            setLastName(data.lastName);
                            setPhoneNumber(data.phoneNumber);
                            setEmail(data.email);
                            setAadhaar(data.aadhaar);
                            setState(data.state);
                            setCity(data.city);
                            setPassword(data.password);
                            setImgUrl(data.img_url);
                            setRole(data.role);
                            setAge(data.age);
                            setGender(data.gender);
                            setActive(data.active);

                        }
                        else {
                            alert("Something went wrong !!")
                        }

                    });
                } catch (error) {
                    console.log('Error:', error);

                }



            };

                getUserData();
        }
    }, [userId])

    const handlePatientSave = async (newDocumentUrl) => {

        try {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
            const updatedData = {
                weight: weight,
                height: height,
                bloodGroup: bloodGroup,
                document_url: newDocumentUrl,
                firstName:firstName,
                lastName:lastName,
                phoneNumber:phoneNumber,
                aadhaar:aadhaar,
                email:email,
                gender:gender,
                state:state,
                city:city,
                age:age,
                role:role,
                password:password,
                img_url:imgUrl,
                active:active,

            };

            const response = await axios.put(`https://localhost:8083/user-handle/patient/update-details/?id=${userId}`, updatedData, { headers });
            console.log(response.data);
            if (response.data) {
                await notify_success(response.data);
            } else {
                await notify_error("Something went wrong !!");
            }
        } catch (error) {
            //await notify_error('Error:', error);
        }
    };
    const handlePatientSave1 = async (e) => {
            e.preventDefault();
        try {
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
            const updatedData = {
                weight: weight,
                height: height,
                bloodGroup: bloodGroup,
                document_url: documentUrl,
                firstName:firstName,
                lastName:lastName,
                phoneNumber:phoneNumber,
                aadhaar:aadhaar,
                email:email,
                gender:gender,
                state:state,
                city:city,
                age:age,
                role:role,
                password:password,
                img_url:imgUrl,
                active:active,

            };

            const response = await axios.put(`https://localhost:8083/user-handle/patient/update-details/?id=${userId}`, updatedData, { headers });
            console.log(response.data);
            if (response.data) {
                await notify_success(response.data);
            } else {
                await notify_error("Something went wrong !!");
            }
        } catch (error) {
            await notify_error('Error:', error);
        }
    };
    const uploadFiles = async (e) => {
        console.log(imageUpload);
        if (imageUpload == null) return Promise.reject("No image to upload");

        const imageRef = ref(storage, `documents/${imageUpload.name + v4()}`);

        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);

            // Update the documentUrl state with the new URL
            setDocumentUrl(url);

            await notify_success("Document uploaded successfully.");
            await handlePatientSave(url);
            return url;
        } catch (error) {
            await notify_error("Error Uploading Document: ", error);
        }
    };
    const handleDownload = (url) => {
        // Open a new tab with the provided URL
        const newTab = window.open(url, '_blank');

        // Wait for the new tab to finish loading
        newTab.onload = () => {
            // Create a temporary link element for downloading
            const downloadLink = newTab.document.createElement('a');
            downloadLink.href = url; // Set the URL of the file to download
            downloadLink.download = 'filename'; // Set the filename for the downloaded file
            newTab.document.body.appendChild(downloadLink);

            // Simulate a click on the download link
            downloadLink.click();

            // Remove the download link from the new tab's document
            newTab.document.body.removeChild(downloadLink);

            // Optionally, close the new tab after initiating download
            // newTab.close();
        };
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



    return (
        <div>
            <div id="overlay-patient-profile" onClick={off}>
                <img className="overlay-profile" src={profile.img_url} alt="profile"/>
            </div>
            <div className="containerProfile">
                <div className="leftSideContents">
                    <img className="profile-picture" src={profile.img_url} alt="Profile"/>
                    <div>
                        <p className="profile-info">{profile.firstName + " " + profile.lastName}</p>
                        <p className="address-info">{profile.address}</p>
                    </div>
                    <div className="update-picture-button-section">
                        <button className="show-button" onClick={on}>SHOW PHOTO</button>
                        <button className="update-button">UPDATE PHOTO</button>
                    </div>
                    <div className="vital-section">
                        <div className="vital-height vitals">
                            <p>Height</p>
                            <div className="patient-data">{profile.height + " cm"}</div>
                        </div>
                        <div className="vital-weight vitals">
                            <p>Weight</p>
                            <div className="patient-data">{profile.weight + " kg"}</div>
                        </div>
                        <div className="vital-blood vitals">
                            <p>Blood Group</p>
                            <div className="patient-data">{profile.bloodGroup}</div>
                        </div>
                    </div>
                    <p className="note">
                        <strong>Note : </strong>No need to update height/weight if it has changed ±5. If more than that
                        please update it.
                    </p>
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
                                    <input className="user-data-value" type="text" placeholder={profile.firstName + " " + profile.lastName} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Email ID : </span>
                                    <input className="user-data-value editable" name="email"  onChange={(e) => setEmail(e.target.value)} placeholder={profile.email} readOnly={true}/>
                                    <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Phone : </span>
                                    <input className="user-data-value editable" type="text" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} placeholder={"+91-" + profile.phoneNumber} readOnly={true}/>
                                    <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Age : </span>
                                    <input className="user-data-value editable" type="text" name="age"  onChange={(e) => setAge(e.target.value)} placeholder={profile.age + " Years"} readOnly={true}/>
                                    <i className="fa fa-pencil 2" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Gender : </span>
                                    <input className="user-data-value" type="text" placeholder={profile.gender !== undefined && profile.gender.toUpperCase()} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Aadhaar : </span>
                                    <input className="user-data-value" type="text" placeholder={profile.aadhaar} readOnly/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Address : </span>
                                    <input className="user-data-value editable" type="text" name="address" value={profile.address} onChange={handleChange } placeholder={profile.city + " " + profile.state} readOnly={true}/>
                                    <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Blood Group : </span>
                                    <input className="user-data-value editable" type="text"  name = "bloodGroup" onChange={(e) => setBloodGroup(e.target.value)} placeholder={profile.bloodGroup} readOnly={true}/>
                                    <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Weight : </span>
                                    <input className="user-data-value editable" type="text" name="weight"  onChange={(e) => setWeight(e.target.value)} placeholder={profile.weight + " kg"} readOnly={true}/>
                                    <i className="fa fa-pencil 5" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Height : </span>
                                    <input className="user-data-value editable" type="text" name="height" onChange={(e) => setHeight(e.target.value)} placeholder={profile.height + " cm"} readOnly={true}/>
                                    <i className="fa fa-pencil 6" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="update-profile-button-section">
                        <button className="update-profile-button visually-hidden" id="profile-update-button" onClick={handlePatientSave1}>SAVE</button>
                    </div>
                    <br/>
                    <div className="UploadsRecords">
                        <h4>Uploads</h4>
                        <hr/>
                        <div className="upload-records-section">
                            <div className="upload-records-text">
                                <span>Upload your Records</span>
                            </div>
                            <input type="file" name="file" className="file-input-profile" accept=".pdf" onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}/>
                            <button className="upload-profile-photo-button" onClick={uploadFiles}>Upload File</button>
                        </div>
                        <div className="previous-records-section">
                            <div className="previous-records-text">
                                <span>Previous Records</span>
                            </div>
                            <div className="show-previous-record">
                                <img className="pdf-icon" src={require("../../../images/patient_landing_page/pdf.png")}
                                     alt="pre-records" onClick={() => handleDownload(profile.document_url)}/>
                                {/*<a href={profile.document_url}></a>*/}
                                {/*<button onClick={}>Download File</button>*/}
                                {/*<div className="previous-record-filename">*/}
                                {/*    <span></span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
