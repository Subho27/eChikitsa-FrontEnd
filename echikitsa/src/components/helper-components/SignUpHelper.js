import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHospital } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/helper-components/sign-up-style.css';
import {Link} from "react-router-dom";
import Validation from "../validation/validation";
import {isDisabled} from "bootstrap/js/src/util";
import button from "bootstrap/js/src/button";


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


    const [formIsValid, setFormIsValid] = useState(false);


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

        // Consider using a separate validation function
        validateField(name, value);

    };

    // useEffect(() => {
    //     setEmailValid(Validation.validate(formData.email));
    //
    // }, [formData]);

    let isValid = true;
    const [firstNameValid, setFirstNameValid] = useState("");
    const [lastNameValid, setLastNameValid] = useState("");
    const [emailValid, setEmailValid] = useState("");
    const validateField = (fieldName, fieldValue) => {

        if (fieldName === 'firstName') {
            if (!fieldValue.match(/^[a-zA-Z]/)) {
                setFirstNameValid('First Name is invalid - ONLY LETTERS');
                console.log(firstNameValid);
                isValid = false;
            }
            else {
                setFirstNameValid('');
                isValid = true;
            }
        }
        if(fieldName === 'lastName'){
            if(!fieldValue.match(/^[a-zA-Z]/)){
                setLastNameValid('Last Name is invalid - ONLY LETTERS');
                isValid = false;
            }
            else{
                setLastNameValid('');
                isValid = true;
            }
        }
        if(fieldName === 'email'){
            if (!fieldValue.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setEmailValid('Not valid.');
                isValid = false;
            } else {
                setEmailValid('');
                isValid = true;
            }
        }
        // else if (fieldName === 'email') {
        //     isValid = Validation.validateEmail(fieldValue); // Assuming Validation component
        // } else if (fieldName === 'password'){
        //     // Add password strength validation logic \(e\.g\., minimum length, lowercase, uppercase, numbers, symbols\)
        //     const passwordRegex = /^\(?\=\.\*\\d\)\(?\=\.\*\[a\-z\]\)\(?\=\.\*\[A\-Z\]\)\[^\\s\]\{8,\}<span>;
        //     isValid = passwordRegex.test(fieldValue);
        //     if (!isValid) {
        //         setFirstNameValid('Password must be at least 8 characters and include lowercase, uppercase, numbers, and symbols');
        //     } else {
        //         setFirstNameValid('');
        //     }
        // } else if (fieldName === 'confirmPassword') {
        //     // Check if confirm password matches password
        //     isValid = fieldValue === formData.password;
        //     if (!isValid) {
        //         setFirstNameValid('Confirm Password does not match Password');
        //     } else {
        //         setFirstNameValid('');
        //     }
        // }
        // Add validation logic for other fields (e.g., phone number format, age range)

        // Update overall form validity based on individual field validations
        setFormIsValid(isValid && checkAllFieldsValid()); // Check all fields are filled
    };

    const checkAllFieldsValid = () => {
        // Define required fields using a dedicated object or array
        const requiredFields = {
            firstname: true,
            lastname: true,
            email: true,
            phoneNumber: true,
            password: true,
            confirmPassword: true,
            // Add other required fields here
        };

        // Loop through formData and check for missing values in required fields
        for (const fieldName in formData) {
            if (requiredFields[fieldName] && !formData[fieldName]) {
                return false; // Early return if a required field is empty
            }
        }

        return true; // All required fields have values
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
                            <p>{firstNameValid}</p>
                            <label>First Name</label>
                        </div>
                        <div className="field">
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                   required/>
                            <p>{lastNameValid}</p>
                            <label>Last Name</label>
                        </div>
                    </div>
                    <div className="fg">
                        <div className="field">
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange}
                                   required/>
                            <p>{emailValid}</p>
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
                    <div className="fg form-group mt-3 upload-photo-section">
                        <span className="upload-photo-label">Upload Hospital Photo</span>
                        <div className="upload-photo-button">
                            <input type="file" name="file" className="file-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <input
                            type="submit"
                            value={`Register`}
                            disabled={!formIsValid}
                        />
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