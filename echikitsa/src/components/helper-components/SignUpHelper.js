import React, {useEffect, useRef, useState} from 'react';
import {CitiesByState, States} from "../validation-component/CityDatabase";
import { faUser, faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {firebaseConfig} from "../firebase-config/firebaseConfigs";
import {ValidateField} from "../validation-component/validation";
import '../../css/helper-components/sign-up-style.css';
import firebase from 'firebase/compat/app';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import 'firebase/compat/database';
import 'firebase/compat/auth';
import Popup from "reactjs-popup";


const SignUpHelper = () => {

    const [signupType, setSignUpType] = useState('patient');
    const [numberVerified, setNumberVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
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
    const [validationMessage, setValidationMessage] = useState({
        firstNameMessage: '',
        lastNameMessage: '',
        emailMessage: '',
        phoneNumberMessage: '',
        passwordMessage: '',
        ageMessage:'',
        aadhaarMessage:'',
        stateMessage:'',
        cityMessage:'',
        confirmPasswordMessage: '',
        genderMessage: ''
    });
    const [confResult, setConfResult] = useState({});

    const handleSignUpType = (type) => {
        setSignUpType(type.toLowerCase());
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked  } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked  : value,
        }));

        setValidationMessage(ValidateField(name, value, validationMessage));
    };

    useEffect(() =>{
        console.log(formData);
        if(document.getElementById('patient-send-email') !== null) document.getElementById('patient-send-email').disabled = formData.email === '' || validationMessage.emailMessage !== '';
        if(document.getElementById('patient-send-phone') !== null) document.getElementById('patient-send-phone').disabled = formData.phoneNumber === '' || validationMessage.phoneNumberMessage !== '';
        if(document.getElementById('hospital-send-email') !== null) document.getElementById('hospital-send-email').disabled = formData.email === '' || validationMessage.emailMessage !== '';

        if(Object.values(formData).every((value) => value !== '') && Object.values(validationMessage).every((message) => message === '')) {
            if(document.getElementById('register') !== null) document.getElementById('register').disabled = false;
            if(document.getElementById('register-patient') !== null && numberVerified && emailVerified) document.getElementById('register-patient').disabled = false;
        } else {
            if(document.getElementById('register') !== null) document.getElementById('register').disabled = true;
            if(document.getElementById('register-patient') !== null) document.getElementById('register-patient').disabled = true;
        }

        if(formData.confirmPassword !== '' && formData.confirmPassword !== formData.password) {
            setValidationMessage((prevMessages) => ({
                ...prevMessages,
                confirmPasswordMessage: "Does not match with Password."
            }));
        }
    }, [formData])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleGenderChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            gender: e.target.value
        }));
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

    //region OTP Verification
    const verifyOtp = (id) => {
        let verificationCode = '';
        if(id === 0) { verificationCode = emailOtpValues.join(''); }
        else if(id === 1) { verificationCode = phoneOtpValues.join(''); }
        else { verificationCode = emailOtpValuesHospital.join(''); }
        confResult.confirm(verificationCode).then((result) => {
            console.log("Success");
            if(id === 0) {
                setEmailVerified(true);
                document.getElementById("patient-email-otp-check").className = "fg visually-hidden";
            }
            else if(id === 1) {
                setNumberVerified(true);
                document.getElementById("patient-send-phone").className = "fg visually-hidden";
                document.getElementById("patient-send-phone").innerText = "Verified";
                document.getElementById("patient-send-phone").style.backgroundColor = "#39c239";
            }
            else {
                document.getElementById("email-otp-check-Hospital").className = "fg visually-hidden";
            }
        }).catch((error) => {
            console.log("Error");
        });
    }

    const sendOtp = () => {
        const phoneNumber = "+91" + document.getElementById("phone-number").value;
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
    //endregion

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
                <form action="#">
                    <div className="fg">

                        <div className="field">
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange}
                                   required/>
                            <label>First Name</label>
                            {validationMessage.firstNameMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.firstNameMessage}</span>
                            )}
                        </div>
                        <div className="field">
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}
                                   required/>
                            <label>Last Name</label>
                            {validationMessage.lastNameMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.lastNameMessage}</span>
                            )}
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
                            <button className="ver" id="patient-send-email" onClick={() => {
                                const isHidden = document.getElementById("patient-email-otp-check");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                            }} >
                                Send OTP
                            </button>
                            <label>Email</label>
                            {validationMessage.emailMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.emailMessage}</span>
                            )}
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
                            <button className="ver" id="patient-send-phone" onClick={() => {
                                const isHidden = document.getElementById("phone-otp-check-patient");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
                                onClickSendOtp();
                            }}>
                                Send OTP
                            </button>
                            <label>Phone Number</label>
                            {validationMessage.phoneNumberMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.phoneNumberMessage}</span>
                            )}
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
                            {validationMessage.ageMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.ageMessage}</span>
                            )}
                        </div>
                        <div className="field">
                            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} required/>
                            <label>Aadhaar</label>
                            {validationMessage.aadhaarMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.aadhaarMessage}</span>
                            )}
                        </div>
                    </div>

                    <div className="fg">
                        <div className="field">
                            <input type="text" name="state" value={formData.state} onChange={handleInputChange}
                                   list="states-list" required/>
                            <label>State</label>
                            <datalist id="states-list">
                                {States.map((state, index) => (
                                    <option key={index} value={state} />
                                ))}
                            </datalist>
                            {validationMessage.stateMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.stateMessage}</span>
                            )}
                        </div>
                        <div className="field">
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                                   list="cities-list" required/>
                            <label>City</label>
                            <datalist id="cities-list">
                                {(States.includes(formData.state)) && CitiesByState[formData.state].map((state, index) => (
                                    <option key={index} value={state} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    <div className="fg">
                        <div className="field">
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                                   required/>
                            <label>Password</label>
                            {validationMessage.passwordMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.passwordMessage}</span>
                            )}
                        </div>
                        <div className="field">
                            <input type="password" name="confirmPassword" value={formData.confirmPassword}
                                   onChange={handleInputChange} required/>
                            <label>Confirm Password</label>
                            {validationMessage.confirmPasswordMessage !== '' && (
                                <span className="tooltip-message">{validationMessage.confirmPasswordMessage}</span>
                            )}
                        </div>
                    </div>

                    <div className="fg">
                        <div className="content">
                            <span className="gen">Gender</span>
                            <div className="radio">
                                <input type="radio" id="male" name="gender" value="male"
                                       checked={formData.gender === 'male'} onChange={handleGenderChange}/>
                                <span className="remember-text">Male</span>
                            </div>
                            <div className="radio">
                                <input type="radio" id="female" name="gender" value="female"
                                       checked={formData.gender === 'female'} onChange={handleGenderChange}/>
                                <span className="remember-text">Female</span>
                            </div>
                            <div className="radio">
                                <input type="radio" id="others" name="gender" value="others"
                                       checked={formData.gender === 'others'} onChange={handleGenderChange}/>
                                <span className="remember-text">Others</span>
                            </div>
                        </div>
                    </div>

                    <div className="fg form-group mt-3 upload-photo-section">
                        <span className="upload-photo-label">Upload your Photo</span>
                        <div className="upload-photo-button">
                            <input type="file" name="file" className="file-input" accept='image/*' required/>
                        </div>
                    </div>

                    <div className="field">
                        <input type="submit" value={`Register`} id="register-patient"/>
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
                            <button className="ver" id="hospital-send-email" onClick={() => {
                                const isHidden = document.getElementById("email-otp-check-Hospital");
                                if (isHidden !== null) {
                                    isHidden.className = "fg";
                                }
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
                            <input type="text" name="email" value={formData.regis} onChange={handleInputChange} required/>
                            <label>Registration Number</label>
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
                    <div className="fg form-group mt-3 upload-photo-section">
                        <span className="upload-photo-label">Upload Hospital Photo</span>
                        <div className="upload-photo-button">
                            <input type="file" name="file" className="file-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <input type="submit" value={`Register`} id="register"/>
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