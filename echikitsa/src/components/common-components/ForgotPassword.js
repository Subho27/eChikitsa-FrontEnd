import React, { useState } from 'react';
import HeaderHelper from "../helper-components/HeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";
import '../../css/helper-components/forgot-password-style.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ForgotPassword () {
    const [email, setEmail] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');



    const navigate = useNavigate();
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

    const [touched, setTouched] = useState({
        email: false,
        otp: false,
        newpassword: false,
        confirmpassword: false
    });

    const handleInputBlur = (fieldName) => {
        setTouched({
            ...touched,
            [fieldName]: true
        });
    };

    const sendOtp = async (event) => {

        try {

            const response = await axios.post('http://localhost:9191/auth/reset-password-otp', {email});
            setResponseMessage(response.data.message);
            alert("OTP Sent Successfully");
        } catch (error) {
            alert('Error: ' + error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post('http://localhost:9191/auth/reset-password', {email,otp,password});
            setResponseMessage(response.data.message);
            alert("Password Changed Successfully");
            navigate("/login");
        } catch (error) {
            alert('Error: '+ error);
            setResponseMessage('An error occurred. Please try again.');
        }
    };




    return (
        <div>
            <HeaderHelper/>
            <div className="mainDivFP-xx">
                <h3 className="titlePassword-xx">Password Reset</h3>
                <hr className="hor-line-xx"/>

                <div className="text-content-xx">
                    <p className="text-xx">Forgotten your password? Enter your e-mail address below, and we'll send you an OTP.</p>
                </div>
                <div className= "inputDiv-xx">
                    <input className="input-xx" placeholder={"E-mail address"} value={email} name="email"
                           onChange={handleChange}
                           onBlur={() => handleInputBlur('email')}/>
                    <button className="send-otp-button-xx" onClick={sendOtp}>Sent OTP</button>

                </div>
                {touched.email && !email.trim() && <div className="alert-box-xx">Required</div>}
                <div className= "inputDiv-xx">
                    <input className="input-n-xx" placeholder={"Enter OTP"} value={otp} name="otp"
                           onChange={handleChange}
                           onBlur={() => handleInputBlur('otp')}/>


                </div>
                {touched.otp && !otp.trim() && <div className="alert-box-xx">Required</div>}
                <div className= "inputDiv-xx">
                    <input className="input-n-xx" placeholder={"New Password"} value={password} name="password" type="password"
                           onChange={handleChange}
                           onBlur={() => handleInputBlur('newpassword')}/>


                </div>
                {touched.newpassword && !password.trim() && <div className="alert-box-xx">Required</div>}
                <div className= "inputDiv-xx">
                    <input className="input-n-xx" placeholder={"Confirm Password"} value={repassword} name="repassword" type="password"
                           onChange={handleChange}
                           onBlur={() => handleInputBlur('confirmpassword')}/>


                </div>
                {touched.confirmpassword && !repassword.trim() && <div className="alert-box-xx">Required</div>}
                <div>
                    <button name="password_reset_btn-xx" type="submit" className="btn btn-success reset-button-xx" disabled={isSubmitDisabled} onClick={handleSubmit}>Reset My Password</button>

                </div>

            </div>

            <FooterHelper/>
        </div>
    );
}

export default ForgotPassword;