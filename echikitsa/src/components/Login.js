import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserMd, faUserCog } from '@fortawesome/free-solid-svg-icons';
import '../css/login.css'; // Import your CSS file

const Login = () => {
    const [loginType, setLoginType] = useState('patient'); // Default login type
    const [loginMethod, setLoginMethod] = useState('password'); // Default login method

    const handleLoginType = (type) => {
        setLoginType(type.toLowerCase());
    };

    const handleLoginMethodToggle = () => {
        setLoginMethod(loginMethod === 'password' ? 'otp' : 'password');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getInputLabel = () => {
        if (loginMethod === 'password') {
            return 'Email Address';
        } else if (loginMethod === 'otp') {
            return 'Mobile Number';
        }
    };

    return (
        <div className="wrapper">
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
            <form action="#">
                <div className="field">
                    <input type="text" required/>
                    <label>{getInputLabel()}</label>
                </div>
                <div className="field">
                    <input type={loginMethod === 'password' ? 'password' : 'text'} required/>
                    <label>{loginMethod === 'password' ? 'Password' : 'OTP'}</label>
                </div>
                <div className="content">
                    <div className="checkbox">
                        <input type="checkbox" id="remember-me"/>
                        <span className="remember-text">Remember me</span>
                    </div>
                    <div className="pass-link">
                        <a href="#">Forgot password?</a>
                    </div>
                </div>
                <div className="field">
                    <button type="button" onClick={handleLoginMethodToggle}>
                        Login via {capitalizeFirstLetter(loginMethod === 'password' ? 'OTP' : 'password')}
                    </button>
                </div>
                <div className="field">
                    <input type="submit" value={`Login as ${capitalizeFirstLetter(loginType)}`}/>
                </div>
            </form>
            <div className="signup-link">
                Not a member? <a href="#">Signup now</a>
            </div>
        </div>
    );
};

export default Login;
