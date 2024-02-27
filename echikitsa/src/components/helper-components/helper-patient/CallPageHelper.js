import React, {useEffect, useRef, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import {Link} from "react-router-dom";
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Collapsible from "react-collapsible";
import "../../../css/helper-components/helper-patient/call-page-style.css"

function CallPageHelper(effect, deps) {
    const [prevRecords, setPrevRecords] = useState([])
    const [today, setToday] = useState("")
    const [suggestDate, setSuggestDate] = useState("");
    const [diagnosisSummary, setDiagnosisSummary] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);

    const writePrescription = () => {
        const newPrescribe = document.getElementById("chat-field").value;
        setPrescription(prevPrescription => [...prevPrescription, newPrescribe]);
    }
    const cancelPrescription =(id) => {
        setPrescription(prevPrescription => {
            const updatedPrescription = [...prevPrescription];
            updatedPrescription.splice(id, 1);
            return updatedPrescription;
        });
    }
    const [emailOtpValues, setEmailOtpValues] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    const handleConsentOtp = (index, value) => {
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


    const submittedMedicines = () => {
        const medicineName = document.getElementById("medicine").value;
        const afterBefore = document.getElementById("after-before").value;
        const dosage1 = document.getElementById("dosage-1").value;
        const dosage2 = document.getElementById("dosage-2").value;
        const dosage3 = document.getElementById("dosage-3").value;
        const prescribe = {
            "name" : medicineName,
            "food" : afterBefore,
            "dos1" : dosage1,
            "dos2" : dosage2,
            "dos3" : dosage3
        }
        setMedicines(prevMedicines => [...prevMedicines, prescribe]);
    };
    const cancelMedicine = (id) => {
        setMedicines(prevMedicines => {
            const updatedMedicines = [...prevMedicines];
            updatedMedicines.splice(id, 1);
            return updatedMedicines;
        });
    }

    const summaryDiagnosis = () => {
        const diagnosis = document.getElementById("diagnosis-summary").value;
        setDiagnosisSummary(diagnosis);
        document.getElementById("diagnosis-submit").disabled = true;
        document.getElementById("diagnosis-submit").style.cursor = "not-allowed";
    };
    const cancelDiagnosis = () => {
        setDiagnosisSummary("");
        document.getElementById("diagnosis-submit").disabled = false;
        document.getElementById("diagnosis-submit").style.cursor = "pointer";
    }

    const suggestADate = () => {
        const suggestedDate = document.getElementById("next-date").value;
        setSuggestDate(suggestedDate);
    };

    useEffect(() => {
        setPrevRecords(askRecord);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        setToday(tomorrowFormatted);
    }, [])


    function off() {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "none";
    }

    const StyledPopup = styled(Popup)`
      // use your custom style for ".popup-overlay"
      &-overlay {
        ...;
      }
      // use your custom style for ".popup-content"
      &-content {
        ...;
      }
    `;

    const StarRating = ({ totalStars }) => {
        const [rating, setRating] = useState(0);

        const handleStarClick = (star) => {
            setRating(star);
        };

        return (
            <div>
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            style={{ cursor: 'pointer', color: starValue <= rating ? 'gold' : 'gray' }}
                            onClick={() => handleStarClick(starValue)}
                        >
            ★
          </span>
                    );
                })}
            </div>
        );
    };

    return (

        <div className="consult-page-container">
            <div id="overlay" onClick={off}>
                <div id="text">Waiting</div>
            </div>

            <div className="call-container">
                <div className="video-call-section-patient">
                    <div className="video-section">
                        <img className="video-call-patient"
                             src={require("../../../images/doctor-page-images/video-call.jpg")} alt="video-call"/>
                    </div>
                    <div className="control-button-section">
                        <div className="time-duration-section"><span className="time-duration">02:34</span></div>
                        <div className="button-section">
                            <button className="call-buttons">
                                <img className="button-icon"
                                     src={require("../../../images/doctor-page-images/sound-icon.png")} alt="Sound"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon"
                                     src={require("../../../images/doctor-page-images/mute-icon.png")} alt="Mute"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon"
                                     src={require("../../../images/doctor-page-images/video-icon.png")} alt="Video"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon"
                                     src={require("../../../images/doctor-page-images/more-icon.png")} alt="More"/>
                            </button>
                            <StyledPopup className="Feedback"
                                trigger={<button className="call-buttons">
                                    <img className="button-icon"
                                         src={require("../../../images/doctor-page-images/call-end-icon.png")}
                                         alt="End"/>
                                </button>}
                                modal
                                closeOnDocumentClick
                            >
                                <div className="Feedcontent">
                                    <h4>FeedBack</h4>
                                    <div>
                                        <h1><StarRating className="stars" totalStars={5}/></h1>
                                    </div>
                                    <div className="Feedbutton">
                                        <Link to="/welcome"><button className="submit-button">Submit</button></Link>
                                        <Link to="/welcome"><button className="cancel-button">Cancel</button></Link>
                                    </div>
                                </div>
                            </StyledPopup>
                        </div>
                    </div>
                </div>
                <div className="activity-section-patient">
                    <div>
                        <Collapsible trigger="Consent for Retrieval of Past Medical Records" className="ask-record"
                                     openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger"
                                     triggerOpenedClassName="ask-record-open-trigger">
                            <div>
                                <div id="dialogBox" className="dialog">
                                    <div className="dialog-content">
                                        <div className="doctor-icon">Dr. [Doctor's Name]</div>
                                        <p className="request">is requesting access to your medical records.</p>
                                        <div className="button-container">
                                            <button id="allowButton" onClick={() => {
                                                const isHidden = document.getElementById("consent-otp-check");
                                                if (isHidden !== null) {
                                                    isHidden.className = "fg";
                                                }
                                            }}>Allow
                                            </button>
                                            <button id="cancelButton">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="visually-hidden fg" id="consent-otp-check" style={{color: "black"}}>
                                    <div className="container-otp">
                                        <div id="inputs" className="inputs">
                                            {emailOtpValues.map((value, index) => (
                                                <input key={index} ref={(ref) => (inputRefs.current[index] = ref)}
                                                       className="input-otp" type="text" inputMode="numeric"
                                                       maxLength="1" value={value}
                                                       onChange={(e) => handleConsentOtp(index, e.target.value)}/>
                                            ))}
                                        </div>
                                        <div className="field">
                                            <input type="submit" value={`Verify`} onClick={() => {
                                                const isHidden = document.getElementById("consent-otp-check");
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


                            </div>
                        </Collapsible>
                    </div>
                    <div>
                        <Collapsible trigger="Upload Documents (if required)" className="ask-record"
                                     openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger"
                                     triggerOpenedClassName="ask-record-open-trigger">
                            <div className="next-date-sections">

                                <div className="fg form-group mt-3">
                                    <input type="file" name="file" className="file-input"/>
                                </div>
                            </div>
                        </Collapsible>
                    </div>

                </div>
            </div>
        </div>

    );
}

const askRecord = [
    {
        "date": "2023-10-15",
        "doctor_name": "Dr. Smith",
        "download_link": "https://example.com/downloads/file1"
    },
    {
        "date": "2023-08-27",
        "doctor_name": "Dr. Johnson",
        "download_link": "https://example.com/downloads/file2"
    },
    {
        "date": "2023-05-09",
        "doctor_name": "Dr. Garcia",
        "download_link": "https://example.com/downloads/file3"
    }
]


export default CallPageHelper;