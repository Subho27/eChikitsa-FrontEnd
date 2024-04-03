import React, { useState, useRef } from 'react';
import '../../css/helper-components/login-style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faUserMd } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
// import {authentication} from '../../firebase/firebaseConfig'
import {getJwtTokenFromLocalStorage, saveJwtTokenToLocalStorage} from "../../resources/storageManagement";

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



    const handleLogin = async (e) => {
        e.preventDefault();
        // Logic to handle login based on login method
        if (loginMethod === 'password') {
            //console.log('Logging in with email and password:', email, password);

            try {
                const headers = { 'Content-Type' : 'application/json' }
                let role;
                if(loginType == 'patient')
                {
                   role = "PATIENT"
                }
                if(loginType == 'doctor')
                {
                    role = "DOCTOR"
                }
                if(loginType == 'admin'){
                    role = "ADMIN"

                }

                const response = await axios.post('http://localhost:9191/auth/login', {email, password,role},{headers}).then((response) => {

                    if (response.data && response.data.role ==loginType.toUpperCase()) {
                        //console.log(response.data)
                        saveJwtTokenToLocalStorage(response.data.token)
                        if(loginType == 'patient')
                        {
                            let path = '/welcome'
                            navigate(path);
                        }
                        if(loginType == 'doctor')
                        {
                            let path = '/dashboard'
                            navigate(path);
                        }
                        if(loginType == 'admin'){
                            let path = '/admin'
                            navigate(path);

                        }



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
            // Implement login with mobile number and OTP
        }
    };

    return (
        <div className="wrapper" id="wrap">
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

            <form onSubmit={handleLogin}>
                <div className="field" style={{ position: 'relative' }}>
                    <input type="text" value={loginMethod === 'password' ? email : mobileNumber} onChange={loginMethod === 'password' ? (e) => setEmail(e.target.value) : handleMobileNumberChange} required/>
                    {loginMethod === 'otp' && !isOtpSent && (
                        <button className="send-otp-btn" type="button" onClick={handleGenerateOtp}>Send OTP</button>
                    )}
                    <label>{loginMethod === 'password' ? 'Email Address' : 'Mobile Number'}</label>
                </div>
                {loginMethod === 'password' && (
                    <div className="field">
                        <input type="password" value={password} onChange={handlePasswordChange} required/>
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
                            <div className="field">
                                <input type="submit" value="Verify"/>
                            </div>
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
                    <button type="submit" className="button-background">Login</button>
                </div>
            </form>

            <div className="content">
                <div className="checkbox-style">
                    <input type="checkbox" id="remember-me"/>
                    <span className="remember-text">Remember me</span>
                </div>
                <div className="pass-link">
                    <a href="#">Forgot password?</a>
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
