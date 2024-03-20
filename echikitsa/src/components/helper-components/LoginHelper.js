import React, { useState, useRef } from 'react';
import '../../css/helper-components/login-style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog, faUserMd } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const LoginHelper = () => {
    const [loginType, setLoginType] = useState('patient'); // Default login type
    const [loginMethod, setLoginMethod] = useState('password'); // Default login method
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const inputRefs = useRef([]);

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

    const handleLogin = (e) => {
        e.preventDefault();
        // Logic to handle login based on login method
        if (loginMethod === 'password') {
            console.log('Logging in with email and password:', email, password);
            // Implement login with email and password
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
                        Login via <span>{capitalizeFirstLetter(loginMethod === 'password' ? 'OTP' : 'password')}</span>
                    </div>
                    <Link to={(loginType === "patient") ? '/welcome' : ((loginType === "admin") ? '/admin' : '/dashboard')}>
                        <button type="submit" className="button-background">Login</button>
                    </Link>
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

            <div className="signup-link">
                Not a member? <Link to="/signup">SignUp</Link>
            </div>
        </div>
    );
};

export default LoginHelper;
