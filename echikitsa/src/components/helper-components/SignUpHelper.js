import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHospital } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/helper-components/sign-up-style.css';
import {Link} from "react-router-dom";


const SignUpHelper = () => {
    const [signupType, setSignUpType] = useState('patient');
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
        <div className="wrapper wrapper-margin" id="wrap1">
            <div className="title">
                Registration Form
            </div>
            <div className="signup-options">
                <div
                    className={`signup-option-circle ${signupType === 'patient' && 'active'}`}
                    onClick={() => handleSignUpType('patient')}>
                    <FontAwesomeIcon icon={faUser}/>
                    <span style={{ color: signupType === 'patient' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('patient')}</span>
                </div>

                <div
                    className={`signup-option-circle ${signupType === 'hospital' && 'active'}`}
                    onClick={() => handleSignUpType('hospital')}>
                    <FontAwesomeIcon icon={faHospital} />
                    <span style={{ color: signupType === 'hospital' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('hospital')}</span>
                </div>
            </div>

            {signupType === 'patient' && (
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
                            <input type="text" name="age" value={formData.age} onChange={handleInputChange}
                                   required/>
                            <label>Age</label>
                        </div>
                        <div className="field">
                            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} required/>
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
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                                   required/>
                            <label>Password</label>
                        </div>
                        <div className="field">
                            <input type="password" name="confirmPassword" value={formData.confirmPassword}
                                   onChange={handleInputChange} required/>
                            <label>Confirm Password</label>
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
            )}

            {signupType === 'hospital' && (
                <form action="#">
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="firstName" value={formData.hospitalname}
                                   onChange={handleInputChange} required/>
                            <label>Hospital Name</label>
                        </div>
                        <div className="field">
                            <input type="text" name="lastName" value={formData.category} onChange={handleInputChange} required/>
                            <label>Category</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
                            <button className="ver" onClick={() => {
                                const isHidden = document.getElementById("email-otp-check");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                            }}>
                                Send OTP
                            </button>
                            <label>Email</label>
                        </div>
                    </div>
                    <div className="fg visually-hidden" id="email-otp-check">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {emailOtpValues.map((value, index) => (
                                    <input key={index} ref={(ref) => (inputRefs.current[index] = ref)}
                                        className="input-otp" type="text" inputMode="numeric" maxLength="1" value={value}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="field">
                                <input type="submit" value={`Verify`} onClick={() => {
                                    const isHidden = document.getElementById("email-otp-check");
                                    if (isHidden !== null) {
                                        isHidden.className = "fg visually-hidden";
                                    }
                                }}/>
                            </div>
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="email" value={formData.regis} onChange={handleInputChange} required/>
                            <button className="ver" onClick={() => {
                                const isHidden = document.getElementById("regis-otp-check");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                            }}>
                                Send OTP
                            </button>
                            <label>Registration Number</label>
                        </div>
                    </div>
                    <div className="fg visually-hidden" id="regis-otp-check">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {registrationOtpValues.map((value, index) => (
                                    <input key={index} ref={(ref) => (inputRefs.current[index] = ref)}
                                           className="input-otp" type="text" inputMode="numeric" maxLength="1" value={value}
                                           onChange={(e) => handleRegistrationChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="field">
                                <input type="submit" value={`Verify`} onClick={() => {
                                    const isHidden = document.getElementById("regis-otp-check");
                                    if (isHidden !== null) {
                                        isHidden.className = "fg visually-hidden";
                                    }
                                }}/>
                            </div>
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="password" value={formData.contact} onChange={handleInputChange} required/>
                            <label>Contact</label>
                        </div>
                        <div className="field">
                            <input type="text" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required/>
                            <label>Website Link</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="state" value={formData.address} onChange={handleInputChange} required/>
                            <label>Address</label>
                        </div>
                        <div className="field">
                            <input type="text" name="city" value={formData.pincode} onChange={handleInputChange} required/>
                            <label>Pincode</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
                            <label>Password</label>
                        </div>
                        <div className="field">
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required/>
                            <label>Confirm Password</label>
                        </div>
                    </div>
                    <div className="fg form-group mt-3">
                        <span className="cc">Upload Hospital Photo</span>
                        <div className="field">
                            <input type="file" name="file" className="file-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <input type="submit" value={`Register`}/>
                    </div>
                </form>
            )}
            <div className="signup-link">
                Already Registered? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default SignUpHelper;