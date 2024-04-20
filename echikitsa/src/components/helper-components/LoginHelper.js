import React, {useState, useRef, useEffect} from 'react';
import '../../css/helper-components/login-style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faUserMd } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
// import {authentication} from '../../firebase/firebaseConfig'
import {getJwtTokenFromLocalStorage, saveJwtTokenToLocalStorage} from "../../resources/storageManagement";
import {saveUserIdToLocalStorage} from "../../resources/userIdManagement";
import { useAuth } from '../route-guard/AuthContext';
//import jwt from 'jsonwebtoken';
import 'firebase/compat/database';
import 'firebase/compat/auth';

import {firebaseConfig} from "../firebase-config/firebaseConfigProfileImages";
import firebase from "firebase/compat/app";

const LoginHelper = () => {
    const [loginType, setLoginType] = useState('patient'); // Default login type
    const [loginMethod, setLoginMethod] = useState('password'); // Default login method
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const { setUser } = useAuth();
    const [confResult, setConfResult] = useState({});
    const [phoneOtpValues, setPhoneOtpValues] = useState(Array(6).fill(''));

    const [passwordFieldType, setPasswordFieldType] = useState(true);

    const handleLoginType = (type) => {
        setLoginType(type.toLowerCase());
    };

    const handleLoginMethodToggle = () => {
        setLoginMethod(loginMethod === 'password' ? 'otp' : 'password');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleEmailChange = (index, value) => {
        const newOtpValues = [...otp];
        newOtpValues[index] = value;
        setOtp(newOtpValues.join(''));
        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    };

    const handleGenerateOtp = () => {
        // Simulate OTP generation and sending logic
        // You can replace this with actual OTP sending logic
        setIsOtpSent(true);
    };

    const handleForgotPassword = async (e) => {

        let role;
        if(loginType === 'patient')
        {
            role = "PATIENT"
            navigate("/forgot-password",{state:{
                    role:role}
            });
        }
        if(loginType === 'doctor')
        {
            role = "DOCTOR"
            navigate("/forgot-password",{state:{
                    role:role}
            });
        }
        if(loginType === 'admin'){
            role = "ADMIN"
            navigate("/forgot-password",{state:{
                    role:role}
            });

        }
    }



    const handleLogin = async (e) => {
        e.preventDefault();

        if (loginMethod === 'password') {

            try {
                const headers = { 'Content-Type' : 'application/json' }
                let role;
                if(loginType === 'patient')
                {
                   role = "PATIENT"
                }
                if(loginType === 'doctor')
                {
                    role = "DOCTOR"
                }
                if(loginType === 'admin'){
                    role = "ADMIN"

                }

                const response = await axios.post('http://localhost:8083/user-handle/auth/login', {email, password,role},{headers}).then((response) => {

                    if (response.data && response.data.role ===loginType.toUpperCase()) {


                        saveJwtTokenToLocalStorage(response.data.token);
                        saveUserIdToLocalStorage(response.data.id,response.data.role);

                        alert("Login Successfully")
                        if(loginType === 'patient')
                        {
                            let path = '/welcome'
                            navigate(path);

                        }
                        if(loginType === 'doctor')
                        {
                            let path = '/dashboard'
                            navigate(path);

                        }
                        if(loginType === 'admin'){
                            let path = '/admin'
                            navigate(path);


                        };





                    }
                    else {
                        alert("email and password are incorrect")
                    }
                    //console.log('Response:', response);
                });
            } catch (error) {
                console.error('Error:', error);

            }
            //**********************************************

        } else if (loginMethod === 'otp') {
            console.log('Logging in with mobile number and OTP:', mobileNumber, otp);
            let verificationCode = otp;
            //verificationCode = phoneOtpValues.join('');
            console.log("verificationCode ",verificationCode)
            confResult.confirm(verificationCode).then(async (result) => {
                // console.log("Success");
                alert("Verified")
                const headers = {'Content-Type': 'application/json'}
                let role;
                if (loginType === 'patient') {
                    role = "PATIENT"
                }
                if (loginType === 'doctor') {
                    role = "DOCTOR"
                }
                const response = await axios.post('http://localhost:8083/user-handle/auth/login-using-otp', {
                    mobileNumber,
                    role
                }, {headers}).then((response) => {

                    if (response.data && response.data.role === loginType.toUpperCase()) {
                        saveJwtTokenToLocalStorage(response.data.token);
                        saveUserIdToLocalStorage(response.data.id, response.data.role);
                        alert("Login Successfully")
                        if (loginType === 'patient') {
                            let path = '/welcome'
                            navigate(path);

                        }
                        if (loginType === 'doctor') {
                            let path = '/dashboard'
                            navigate(path);

                        }


                    } else {
                        alert("email and password are incorrect")
                    }
                });

            }).catch((error) => {
                console.log("Error");
            });



        }
    };

    const verifyOtp = () => {
        let verificationCode = '';
        verificationCode = phoneOtpValues.join('');
        confResult.confirm(verificationCode).then((result) => {
            // console.log("Success");
            alert("Verified")

        }).catch((error) => {
            console.log("Error");
        });
    }

    const sendOtp = () => {

         const phoneNumber = "+91"+document.getElementById("phone-number").value;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setConfResult(confirmationResult);
                console.log("REsult",confirmationResult)
            }).catch((error) => {
            console.log("expire");
        });
    }



    const onClickSendOtpMobile = () => {
        setIsOtpSent(true);
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

    return (
        <div className="wrapper" id="wrap">
            <div id='recaptcha-container'></div>
            <div className="title">
                Login Form
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
                    className={`login-option-circle ${loginType === 'doctor' && 'active'}`}
                    onClick={() => handleLoginType('doctor')}
                >
                    <FontAwesomeIcon icon={faUserMd}/>
                    <span style={{ color: loginType === 'doctor' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('doctor')}</span>
                </div>
                <div
                    className={`login-option-circle ${loginType === 'admin' && 'active'}`}
                    onClick={() => handleLoginType('admin')}
                >
                    <FontAwesomeIcon icon={faUserCog}/>
                    <span style={{ color: loginType === 'admin' ? '#fff' : '#262626' }}>{capitalizeFirstLetter('admin')}</span>
                </div>
            </div>

            <form >
                <div className="field" style={{ position: 'relative' }}>
                    <input type="text" id="phone-number"  value={loginMethod === 'password' ? email : mobileNumber} onChange={loginMethod === 'password' ? (e) => setEmail(e.target.value) : handleMobileNumberChange} required/>
                    {loginMethod === 'otp' && !isOtpSent && (
                        <button className="send-otp-btn" type="button" onClick={onClickSendOtpMobile}>Send OTP</button>
                    )}
                    <label>{loginMethod === 'password' ? 'Email Address' : 'Mobile Number'}</label>
                </div>
                {loginMethod === 'password' && (
                    <div className="field">
                        <input type={passwordFieldType ? "password" : "text"} value={password} onChange={handlePasswordChange} required/>
                        <i className={`${passwordFieldType ? "fa fa-eye-slash" : "fa fa-eye"} toggle-password`} onClick={() => {setPasswordFieldType(!passwordFieldType)}}></i>
                        <label>Password</label>
                    </div>
                )}
                {loginMethod === 'otp' && isOtpSent && (
                    <div className="fg">
                        <div className="container-otp">
                            <div id="inputs" className="inputs">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <input key={index} ref={(ref) => (inputRefs.current[index] = ref)}
                                           className="input-otp" type="text" inputMode="numeric" maxLength="1" value={otp[index] || ''}
                                           onChange={(e) => handleEmailChange(index, e.target.value)} required/>
                                ))}
                            </div>
                            {/*<div className="field">*/}
                            {/*    <input type="submit" onClick={() => {verifyOtp();}} value="Verify"/>*/}

                            {/*</div>*/}
                            <div id="resend-otp">
                                <p>OTP will expire in 56 sec. <a href="/">Resend OTP</a></p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="field1">
                    <div className="otp-pass-section" onClick={handleLoginMethodToggle}>
                        <div className={(loginType === 'admin')? "visually-hidden" : ""}>
                            Login via <span>{capitalizeFirstLetter(loginMethod === 'password' ? 'OTP' : 'password')}</span>
                        </div>
                    </div>
                    <button type="submit" className="button-background" onClick={handleLogin} >Login</button>
                </div>
            </form>

            <div className="content">
                {/*<div className="checkbox-style">*/}
                {/*    <input type="checkbox" id="remember-me"/>*/}
                {/*    <span className="remember-text">Remember me</span>*/}
                {/*</div>*/}
                <div className="pass-link">
                    <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
                </div>
            </div>

            <div className="signup-link" >
                <div className={(loginType === 'doctor')? "visually-hidden" : ""}>
                    Not a member? <Link to="/signup">SignUp</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginHelper;
