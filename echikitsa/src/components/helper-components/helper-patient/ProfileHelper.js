import React, { useState } from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';


function ProfilePage() {
    const [profile, setProfile] = useState({
        name: 'Suraj Subedi',
        email: 'john.doe@example.com',
        mobile: '123-456-7890',
        profilePicture: 'review_profile.jpeg' // Placeholder image URL
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

    const updateProfile = () => {

        console.log('Updated profile:', updatedProfile);
        setProfile(updatedProfile);
        setUpdatedProfile({
            name: '',
            email: '',
            mobile: ''
        });
    };

    return (
        <div className="containerprofile">
            <div className="leftsidecontents">
                <img className="profile-picture" src={require("../../../images/landing_body_img/"+profile.profilePicture)} alt="Profile"/>
                <div className="profile-info">
                    <h3>{profile.name}</h3>
                </div>
                <button className="update-button">Update</button>
            </div>

            <div className="rightsidecontents">

                <div className="information">

                        <h4>Information</h4>

                        <hr/>

                </div>

                <table className="infoContent">
                    <tr>
                        <th className="thevalues">Email</th>
                        <th className="thevalues">Mobile</th>
                    </tr>
                    <tr>
                        <td className="value">xxxxxxxxx@gmail.com</td>
                        <td className="value">xxxxxxxxx</td>
                    </tr>

                    <tr>
                        <th className="thevalues">Age</th>
                        <th className="thevalues">Aadhaar</th>
                    </tr>
                    <tr>
                        <td className="value">XX Years</td>
                        <td className="value">XXXX-XXXX-XXXX</td>
                    </tr>
                    <tr>
                        <th className="thevalues">Gender</th>
                        <th className="thevalues">Address</th>
                    </tr>
                    <tr>
                        <td className="value">M</td>
                        <td className="value">XXXXXXXXXXXXXXXXXXXXXXXXXXX</td>
                    </tr>

                </table>
            <br/>

                <div className="UploadsRecords">
                    <h4>Uploads</h4>
                    <hr/>

                    <div className="fg form-group mt-3">
                        <span className="cc">Upload your Records</span>
                        <input type="file" name="file" className="file-input"/>
                    </div>
                    <button className="records-button">View Previous Records</button>
                </div>


            </div>





        </div>


    )
        ;
}

export default ProfilePage;
