import React, { useState } from 'react';
import '../../../css/helper-components/helper-patient/profile-style.css';


function DocProfilePage() {
    const [profile, setProfile] = useState({
        name: 'Rishav Chandel',
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
                    <thead>
                    <tr>
                        <th className="thevalues">Registration ID</th>
                        <th className="thevalues">Hospital Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="value">6********9</td>
                        <td className="value">Manipal Hospital</td>
                    </tr>
                    <tr>
                        <th className="thevalues">Email</th>
                        <th className="thevalues">Mobile</th>
                    </tr>
                    <tr>
                        <td className="value">rishavchandel@manipal.ac.in</td>
                        <td className="value">9********0</td>
                    </tr>
                    <tr>
                        <th className="thevalues">Aadhar No</th>
                        <th className="thevalues">Degree</th>
                    </tr>
                    <tr>
                        <td className="value">XXXX-XXXX-XXXX</td>
                        <td className="value">MBBS, FCPS-MD</td>
                    </tr>
                    <tr>
                        <th className="thevalues">Address</th>
                        <th className="thevalues">Specialisation</th>
                    </tr>
                    <tr>
                        <td className="value">Hamirpur (HP)</td>
                        <td className="value">Heart Specialist</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>


    );
}

export default DocProfilePage;
