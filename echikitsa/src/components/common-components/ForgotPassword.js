import React, { useState } from 'react';
import HeaderHelper from "../helper-components/HeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";
import '../../css/helper-components/forgot-password-style.css'
import axios from "axios";
import {useLocation} from "react-router-dom";
function ForgotPassword () {
    const [email, setEmail] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [touched, setTouched] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');




    const handleChange  = (event) => {
        const { name, value } = event.target;
        // Update the state based on the input field name
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'otp':
                setOTP(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'repassword':
                setRepassword(value);
                break;
            default:
                break;
        }
        // Check if any field is empty and update the submit button state
        setIsSubmitDisabled(
            email.trim() === '' || otp.trim() === '' || password.trim() === '' || repassword.trim() === ''
        );
    };

    const sendOtp = async (event) => {

        try {

            const response = await axios.post('http://localhost:9191/auth/reset-password-otp', {email});
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post('http://localhost:9191/auth/reset-password', {email,otp,password});
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };




    return (
        <div>
            <HeaderHelper/>
            <div className="mainDivFP">
                <h3 className="titlePassword">Password Reset</h3>
                <hr className="hor-line"/>

                <div className="text-content">
                    <p className="text">Forgotten your password? Enter your e-mail address below, and we'll send you an OTP.</p>
                </div>
                <div className= "inputDiv">
                    <input className="input" placeholder={"E-mail address"} value={email} name="email"
                           onChange={handleChange}/>
                    <button className="send-otp-button" onClick={sendOtp}>Sent OTP</button>

                </div>
                {touched && !email.trim() && <div className="alert-box">Required</div>}
                <div className= "inputDiv">
                    <input className="input-n" placeholder={"Enter OTP"} value={otp} name="otp"
                           onChange={handleChange}/>


                </div>
                {touched && !otp.trim() && <div className="alert-box">Required</div>}
                <div className= "inputDiv">
                    <input className="input-n" placeholder={"New Password"} value={password} name="password"
                           onChange={handleChange}/>


                </div>
                {touched && !password.trim() && <div className="alert-box">Required</div>}
                <div className= "inputDiv">
                    <input className="input-n" placeholder={"Confirm Password"} value={repassword} name="repassword"
                           onChange={handleChange}/>


                </div>
                {touched && !repassword.trim() && <div className="alert-box">Required</div>}
                <div>
                    <button name="password_reset_btn" type="submit" className="btn btn-success reset-button" disabled={isSubmitDisabled} onClick={handleSubmit}>Reset My Password</button>

                </div>

            </div>

            <FooterHelper/>
        </div>
    );
}

export default ForgotPassword;