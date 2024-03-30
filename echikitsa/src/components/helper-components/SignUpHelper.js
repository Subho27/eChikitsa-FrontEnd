import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHospital } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/helper-components/sign-up-style.css';
import {Link, useNavigate} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import {firebaseConfig} from "../firebase-config/firebaseConfigs";
import axios from "axios";


const SignUpHelper = () => {
    const navigate = useNavigate();

    const [signupType, setSignUpType] = useState('patient');

//******************************************************************************************************

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role:'PATIENT',
        phoneNumber: '',
        password: '',
        age:'',
        aadhaar:'',
        state:'',
        city:'',
        confirmPassword: '',
        gender: '',

    });
    const [formDataHospital, setFormDataHospital] = useState({
        hospitalname: '',
        category: '',
        email: '',
        role:'ADMIN',
        phoneNumber: '',
        password: '',
        registrationNumber:'',
        address:'',
        confirmPassword: '',
        website:'',
        pincode:''


    });

    const handleInputChangeHospital = (e) => {
        const { name, value, type, checked } = e.target;

        setFormDataHospital((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    //***********************************************************************************************

    const [confResult, setConfResult] = useState({});

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
        formData.gender = e.target.value;
        setSelectedGender(e.target.value);
    };

    //region EMAIL Patient - OTP functions
    const [emailOtpValues, setEmailOtpValues] = useState(Array(6).fill(''));
    const inputRefsPatient = useRef([]);

    const handleEmailChange = (index, value) => {
        const newOtpValues = [...emailOtpValues];
        newOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputRefsPatient.current[index].value = '';
                inputRefsPatient.current[index - 1].focus();
            }
        } else if (index < emailOtpValues.length - 1 && value.length === 1) {
            inputRefsPatient.current[index + 1].focus();
        }
        setEmailOtpValues(newOtpValues);
    };
    //endregion

    //region EMAIL Hospital - OTP functions
    const [emailOtpValuesHospital, setEmailOtpValuesHospital] = useState(Array(6).fill(''));
    const inputHRefs = useRef([]);

    const handleEmailChangeHospital = (index, value) => {
        const newOtpValues = [...emailOtpValuesHospital];
        newOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputHRefs.current[index].value = '';
                inputHRefs.current[index - 1].focus();
            }
        } else if (index < emailOtpValuesHospital.length - 1 && value.length === 1) {
            inputHRefs.current[index + 1].focus();
        }
        setEmailOtpValuesHospital(newOtpValues);
    };
    //endregion

    //region REGISTRATION - OTP functions
    const [phoneOtpValues, setPhoneOtpValues] = useState(Array(6).fill(''));
    const inputPRefs = useRef([]);

    const handleRegistrationChange = (index, value) => {
        const newerOtpValues = [...phoneOtpValues];
        newerOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputPRefs.current[index].value = '';
                inputPRefs.current[index - 1].focus();
            }
        } else if (index < phoneOtpValues.length - 1 && value.length === 1) {
            inputPRefs.current[index + 1].focus();
        }
        setPhoneOtpValues(newerOtpValues);
    };
    //endregion

    const verifyOtp = (id) => {
        let verificationCode = '';
        if(id === 0) { verificationCode = emailOtpValues.join(''); }
        else if(id === 1) { verificationCode = phoneOtpValues.join(''); }
        else { verificationCode = emailOtpValuesHospital.join(''); }
        confResult.confirm(verificationCode).then((result) => {
            console.log("Success");
            if(id === 0) {
                document.getElementById("patient-email-otp-check").className = "fg visually-hidden";
            }
            else if(id === 1) {
                document.getElementById("phone-otp-check-patient").className = "fg visually-hidden";
                document.getElementById("phone-patient-send-otp").innerText = "Verified";
                document.getElementById("phone-patient-send-otp").style.backgroundColor = "#39c239";
            }
            else {
                document.getElementById("email-otp-check-Hospital").className = "fg visually-hidden";
            }
        }).catch((error) => {
            console.log("Error");
        });
    }

    const sendOtp = () => {
        const phoneNumber = document.getElementById("phone-number").value;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setConfResult(confirmationResult);
            }).catch((error) => {
            console.log("expire");
        });
    }

    const onClickSendOtp = () => {
        firebase.auth().useDeviceLanguage();
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                    },
                    'expired-callback': () => {
                        console.log('expired');
                    },
                    'error-callback': (error) => {
                        console.log(error);
                    }
                });
                window.recaptchaVerifier.render().then(() =>{
                    sendOtp();
                });
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }, []);

    ///*****************************************************************************************************
    const handleSignUp = async (e) => {
        e.preventDefault();
        // Logic to handle login based on login method
        if (signupType === 'patient') {
            console.log(formData)

            try {

                const response = await axios.post('http://localhost:9191/api/signUp', formData).then((response) => {
                    console.log(response.data);
                    if (response.data) {
                        alert("registered successfully !!")

                        let path = '/login'
                        //navigate(path);

                    }
                    else {
                        alert("Something went wrong !!")
                    }

                });
            } catch (error) {
                console.error('Error:', error);

            }


        }
        else
        {
            console.log(formDataHospital);
        }
    };
    //****************************************

    return (
        <div className="wrapper wrapper-margin" id="wrap1">
            <div id='recaptcha-container'></div>
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
                <form onSubmit={handleSignUp}>
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
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
                            <button className="ver" onClick={() => {
                                const isHidden = document.getElementById("patient-email-otp-check");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                                onClickSendOtp();
                            }}>
                                Send OTP
                            </button>
                            <label>Email</label>
                        </div>
                    </div>
                    <div className="fg visually-hidden" id="patient-email-otp-check">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {emailOtpValues.map((value, index) => (
                                    <input key={index} ref={(ref) => (inputRefsPatient.current[index] = ref)}
                                           className="input-otp" type="text" inputMode="numeric" maxLength="1" value={value}
                                           onChange={(e) => handleEmailChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="field">
                                <input type="submit" value={`Verify`} onClick={() => {verifyOtp(0);}}/>
                            </div>
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="phoneNumber" id="phone-number" onChange={handleInputChange} required/>
                            <button className="ver" id="phone-patient-send-otp" onClick={() => {
                                const isHidden = document.getElementById("phone-otp-check-patient");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                                onClickSendOtp();
                            }}>
                                Send OTP
                            </button>
                            <label>Phone Number</label>
                        </div>
                    </div>
                    <div className="fg visually-hidden" id="phone-otp-check-patient">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {phoneOtpValues.map((value, index) => (
                                    <input key={index} ref={(ref) => (inputPRefs.current[index] = ref)}
                                           className="input-otp" type="text" inputMode="numeric" maxLength="1" value={value}
                                           onChange={(e) => handleRegistrationChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="field">
                                <input type="submit" value={`Verify`} onClick={() => {verifyOtp(1);}}/>
                            </div>
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
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

                    <div className="fg form-group mt-3 upload-photo-section">
                        <span className="upload-photo-label">Upload your Photo</span>
                        <div className="upload-photo-button">
                            <input type="file" name="file" className="file-input"/>
                        </div>
                    </div>

                    <div className="field">
                        <input type="submit" value={`Register`}/>
                    </div>
                </form>
            )}

            {signupType === 'hospital' && (
                <form onSubmit={handleSignUp}>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="hospitalname" value={formDataHospital.hospitalname}
                                   onChange={handleInputChangeHospital} required/>
                            <label>Hospital Name</label>
                        </div>
                        <div className="field">
                            <input type="text" name="category" value={formDataHospital.category} onChange={handleInputChangeHospital} required/>
                            <label>Category</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="email" value={formDataHospital.email} onChange={handleInputChangeHospital} required/>
                            <button className="ver" onClick={() => {
                                const isHidden = document.getElementById("email-otp-check-Hospital");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                                onClickSendOtp();
                            }}>
                                Send OTP
                            </button>
                            <label>Email</label>
                        </div>
                    </div>
                    <div className="fg visually-hidden" id="email-otp-check-Hospital">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {emailOtpValuesHospital.map((value, index) => (
                                    <input key={index} ref={(ref) => (inputHRefs.current[index] = ref)}
                                        className="input-otp" type="text" inputMode="numeric" maxLength="1" value={value}
                                        onChange={(e) => handleEmailChangeHospital(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="field">
                                <input type="submit" value={`Verify`} onClick={() => {verifyOtp(2);}}/>
                            </div>
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChangeHospital} required/>
                            <label>Registration Number</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="phoneNumber" value={formDataHospital.phoneNumber} onChange={handleInputChangeHospital} required/>
                            <label>Contact</label>
                        </div>
                        <div className="field">
                            <input type="text" name="website" value={formDataHospital.website} onChange={handleInputChangeHospital} required/>
                            <label>Website Link</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="address" value={formDataHospital.address} onChange={handleInputChangeHospital} required/>
                            <label>Address</label>
                        </div>
                        <div className="field">
                            <input type="text" name="pincode" value={formDataHospital.pincode} onChange={handleInputChangeHospital} required/>
                            <label>Pincode</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="password" name="password" value={formDataHospital.password} onChange={handleInputChangeHospital} required/>
                            <label>Password</label>
                        </div>
                        <div className="field">
                            <input type="password" name="confirmPassword" value={formDataHospital.confirmPassword} onChange={handleInputChangeHospital} required/>
                            <label>Confirm Password</label>
                        </div>
                    </div>
                    <div className="fg form-group mt-3 upload-photo-section">
                        <span className="upload-photo-label">Upload Hospital Photo</span>
                        <div className="upload-photo-button">
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