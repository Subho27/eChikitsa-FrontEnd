import React, { useState } from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';


function DocProfilePage() {
    const [profile, setProfile] = useState({
        "firstName": "John",
        "lastName": "Doe",
        "mobile": "8782788392",
        "address": "123 Main Street, City, Country",
        "email": "john.doe@example.com",
        "age": 30,
        "gender": "Male",
        "aadhar": "1234 - 5678 - 9012",
        "registration": "DEL-123456",
        "degree": "MBBS(Kolkata), MD",
        "availability": "true",
        "profilePicture": "review_profile.jpeg",
        "seniority": "senior",
        "rating": "4.3",
        "specialization" : "General Medicine",
        "experience": "15",
        "hospital": "Sanjeevani Hospital"
    });

    const [updatedProfile, setUpdatedProfile] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
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
    return (
        <div>
            <div id="overlay-patient-profile" onClick={off}>
                <img className="overlay-profile" src={require("../../../images/landing_body_img/"+profile.profilePicture)} alt="profile"/>
            </div>
            <div className="containerProfile">
                <div className="leftSideContents">
                    <img className="profile-picture" src={require("../../../images/landing_body_img/"+profile.profilePicture)} alt="Profile"/>
                    <div>
                        <p className="profile-info">{((profile.seniority === "senior") ? "SDr. " : "JDr. ") + profile.firstName + " " + profile.lastName}</p>
                        <p className="address-info">{profile.address}</p>
                        <p className="address-info">{profile.hospital}</p>
                        <p className="address-info">{profile.degree}</p>
                        <p className="address-info">Rating : {profile.rating}/5</p>
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
                                    <input className="user-data-value" type="text" placeholder={profile.firstName + " " + profile.lastName} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Email ID : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.email} readOnly={true}/>
                                    <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Registration No. : </span>
                                    <input className="user-data-value" type="text" placeholder={profile.registration} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Degree : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.degree} readOnly={true}/>
                                    <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Phone : </span>
                                    <input className="user-data-value editable" type="text" placeholder={"+91-" + profile.mobile} readOnly={true}/>
                                    <i className="fa fa-pencil 2" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Age : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.age + " Years"} readOnly={true}/>
                                    <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Gender : </span>
                                    <input className="user-data-value" type="text" placeholder={profile.gender} readOnly/>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Aadhaar : </span>
                                    <input className="user-data-value" type="text" placeholder={profile.aadhar} readOnly/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Address : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.address} readOnly={true}/>
                                    <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Password : </span>
                                    <input className="user-data-value editable" type="text" placeholder="XXXXXXXXXXXXXX" readOnly={true}/>
                                    <i className="fa fa-pencil 5" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Specialization : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.specialization} readOnly={true}/>
                                    <i className="fa fa-pencil 6" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Experience : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.experience} readOnly={true}/>
                                    <i className="fa fa-pencil 7" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="update-profile-button-section">
                        <button className="update-profile-button visually-hidden" id="profile-update-button" onClick={onProfileSave}>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocProfilePage;
