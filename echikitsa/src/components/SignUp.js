import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHospital } from '@fortawesome/free-solid-svg-icons';
import '../css/SignUp.css';
import 'bootstrap/dist/css/bootstrap.css';


const Login = () => {
    const [loginType, setLoginType] = useState('patient');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        state:'',
        city:'',
        confirmPassword: '',


        gender: '',
    });
    const [selectedGender, setSelectedGender] = useState('');
    const handleLoginType = (type) => {
        setLoginType(type.toLowerCase());
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    const handleVerification = () => {

        console.log('Verification button clicked');
    };

    return (
        <div className="wrapper">
            <div className="title">
                Registration Form
            </div>
            <div className="login-options">
                <div
                    className={`login-option-circle ${loginType === 'patient' && 'active'}`}
                    onClick={() => handleLoginType('patient')}
                >
                    <FontAwesomeIcon icon={faUser}/>
                    <span style={{ color: loginType === 'patient' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('patient')}</span>
                </div>

                <div
                    className={`login-option-circle ${loginType === 'hospital' && 'active'}`}
                    onClick={() => handleLoginType('hospital')}
                >
                    <FontAwesomeIcon icon={faHospital} />
                    <span style={{ color: loginType === 'hospital' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('hospital')}</span>
                </div>
            </div>

            {loginType === 'patient' && (
                <form action="#">
                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </div>
                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Phone Number</label>
                        </div>
                    </div>

                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                            <label>State</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <label>City</label>
                        </div>
                    </div>

                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                    </div>

                    <div className="fg">
                        <div className="content">
                            <span className="gen">Gender</span>

                            <div className="radio">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={selectedGender === 'male'}
                                    onChange={handleGenderChange}
                                />
                                <span className="remember-text">Male</span>
                            </div>

                            <div className="radio">
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={selectedGender === 'female'}
                                    onChange={handleGenderChange}
                                />
                                <span className="remember-text">Female</span>
                            </div>

                            <div className="radio">
                                <input
                                    type="radio"
                                    id="others"
                                    name="gender"
                                    value="others"
                                    checked={selectedGender === 'others'}
                                    onChange={handleGenderChange}
                                />
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
            )}

            {loginType === 'hospital' && (
                <form action="#">
                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.hospitalname}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Hospital Name</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Category</label>
                        </div>
                    </div>
                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />

                            <button className="ver"

                                onClick={handleVerification}
                            >
                                Verify
                            </button>
                            <label>Email</label>
                        </div>
                        {/*<button onClick={handleVerification}>Verify</button>*/}

                    </div>

                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="email"
                                value={formData.regis}
                                onChange={handleInputChange}
                                required
                            />
                            <button className="ver" onClick={handleVerification}>
                                Verify
                            </button>
                            <label>Registration Number</label>
                        </div>
                    </div>


                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="password"
                                value={formData.contact}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Contact</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Website Link</label>
                        </div>
                    </div>

                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="state"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Address</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="city"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Pincode</label>
                        </div>
                    </div>

                    <div className="fg">

                        <div className="field">
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                    </div>

                    <div className="fg form-group mt-3">
                        <span className="cc">Upload Hospital Photo</span>
                        <input type="file" name="file" className="file-input"/>
                    </div>


                    <div className="field">
                        <input type="submit" value={`Register`}/>
                    </div>
                </form>
            )}

            <div className="signup-link">
                Already Registered? <a href="#">Login</a>
            </div>



        </div>
    );
};

export default Login;