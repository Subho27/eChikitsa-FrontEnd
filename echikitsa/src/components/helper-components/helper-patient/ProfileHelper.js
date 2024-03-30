import React, {useState} from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';


function ProfilePage() {
    const [profile, setProfile] = useState({
        "firstName": "John",
        "lastName": "Doe",
        "mobile": "8782788392",
        "address": "123 Main Street, City, Country",
        "email": "john.doe@example.com",
        "age": 30,
        "gender": "Male",
        "aadhar": "1234 - 5678 - 9012",
        "weight": "70",
        "height": "180",
        "bloodGroup": "O+",
        "profilePicture": "review_profile.jpeg",
        "prevRecords": "previous.pdf"
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

        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button";
    }

    const onProfileSave = () => {
        let saveButton = document.getElementById("profile-update-button");
        saveButton.className = "update-profile-button visually-hidden";

        let element = document.getElementsByClassName("user-data-value editable");
        for(let i=0; i<element.length; i++) {
            element[i].readOnly = true;
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
                                    <input className="user-data-value editable" type="text" placeholder={profile.email} readOnly={true}/>
                                    <i className="fa fa-pencil 0" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Phone : </span>
                                    <input className="user-data-value editable" type="text" placeholder={"+91-" + profile.mobile} readOnly={true} />
                                    <i className="fa fa-pencil 1" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Age : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.age + " Years"} readOnly={true}/>
                                    <i className="fa fa-pencil 2" onClick={makeEditable}></i>
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
                                    <i className="fa fa-pencil 3" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Password : </span>
                                    <input className="user-data-value editable" type="text" placeholder="XXXXXXXXXXXXXX" readOnly={true}/>
                                    <i className="fa fa-pencil 4" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Weight : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.weight + " kg"} readOnly={true}/>
                                    <i className="fa fa-pencil 5" onClick={makeEditable}></i>
                                </div>
                            </td>
                            <td>
                                <div className="user-data">
                                    <span className="user-data-label">Height : </span>
                                    <input className="user-data-value editable" type="text" placeholder={profile.height + " cm"} readOnly={true}/>
                                    <i className="fa fa-pencil 6" onClick={makeEditable}></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="update-profile-button-section">
                        <button className="update-profile-button visually-hidden" id="profile-update-button" onClick={onProfileSave}>SAVE</button>
                    </div>
                    <br/>
                    <div className="UploadsRecords">
                        <h4>Uploads</h4>
                        <hr/>
                        <div className="upload-records-section">
                            <div className="upload-records-text">
                                <span>Upload your Records</span>
                            </div>
                            <input type="file" name="file" className="file-input"/>
                        </div>
                        <div className="previous-records-section">
                            <div className="previous-records-text">
                                <span>Previous Records</span>
                            </div>
                            <div className="show-previous-record">
                                <img className="pdf-icon" src={require("../../../images/patient_landing_page/pdf.png")} alt="pre-records"/>
                                <div className="previous-record-filename">
                                    <span>{profile.prevRecords}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
