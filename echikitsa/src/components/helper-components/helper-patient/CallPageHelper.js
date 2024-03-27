import React, {useEffect, useRef, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import {Link} from "react-router-dom";
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import Collapsible from "react-collapsible";
import "../../../css/helper-components/helper-patient/call-page-style.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function CallPageHelper(effect, deps) {
    const [prevRecords, setPrevRecords] = useState([])
    const [today, setToday] = useState("")
    const [suggestDate, setSuggestDate] = useState("");
    const [diagnosisSummary, setDiagnosisSummary] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);

    //region Call Handle
    const [patientLocalStream, setPatientLocalStream] = useState(null);
    const [patientRemoteStream, setPatientRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isCaller, setIsCaller] = useState(false);
    let oCount = 0;
    let aCount = 0;

    const constraints = {
        'video': true,
        'audio': true
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            // console.log('Got MediaStream:', stream);
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });

    async function playVideoFromCamera() {
        try {
            const constraints = {'video': true, 'audio': true};
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const videoElement = document.querySelector('video#patientLocalStream');
            videoElement.srcObject = stream;
            return stream;
        } catch(error) {
            console.error('Error opening video camera.', error);
            throw error;
        }
    }
    //endregion

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

    const switchView = async() => {
        let videoArray = document.getElementsByName("switch-call-patient");
        const remote = videoArray.item(0).id;
        videoArray.item(0).id = videoArray.item(1).id;
        videoArray.item(1).id = remote;
    }

    useEffect(() => {
        setPrevRecords(askRecord);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        setToday(tomorrowFormatted);

        //region Call Handle
        let pc;

        const initializePeerConnection = async () => {


            const stream = await playVideoFromCamera();
            setPatientLocalStream(stream);

            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
                apiKey: "AIzaSyDwzwWNy1tobd0RTnrNUqjfVyVOU3-FqlE",
                authDomain: "echikitsa-b4fc8.firebaseapp.com",
                databaseURL: "https://echikitsa-b4fc8-default-rtdb.asia-southeast1.firebasedatabase.app",
                projectId: "echikitsa-b4fc8",
                storageBucket: "echikitsa-b4fc8.appspot.com",
                messagingSenderId: "254572421559",
                appId: "1:254572421559:web:f53a89bb97e76a1f038832",
                measurementId: "G-0T5936KCPF"
            };
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            // Set up signaling channel with Firebase
            const database = firebase.database();
            const signalingChannel = database.ref('signalling');

            if(stream) {

                // Create peer connection
                pc = new RTCPeerConnection({
                    iceServers: [{
                        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                        credential: 'webrtc',
                        username: 'webrtc'
                    }]
                });

                pc.addEventListener('icecandidate', event => {
                    if (event.candidate) {
                        const candidate = JSON.stringify(event.candidate);
                        signalingChannel.push({ iceCandidate: candidate });
                    }
                });
                pc.addEventListener('connectionstatechange', event => {
                    if (pc.connectionState === 'connected') {
                        console.log("Connected");
                    }
                });

                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                });

                const remoteVideo = document.querySelector('video#patientRemoteStream');
                pc.addEventListener('track', async (event) => {
                    const [patientRemoteStream] = event.streams;
                    remoteVideo.srcObject = patientRemoteStream;
                });

                setPeerConnection(pc);

                return signalingChannel;
            }
            else{
                console.log("Problem with stream");
            }
        };

        initializePeerConnection().then((signalingChannel) => {
            signalingChannel.on('child_added', async snapshot => {
                let message = snapshot.val();
                if (message.recipient === "callee" && !isCaller && message.offer) {
                    oCount++;
                    if(oCount === 2) return;
                    let offer = JSON.parse(message.offer);
                    await handleOffer(offer);
                } else if (message.recipient === "caller" && isCaller && message.answer) {
                    aCount++;
                    if(aCount === 1) return;
                    let answer = JSON.parse(message.answer);
                    await handleAnswer(answer);
                } else if (message.iceCandidate) {
                    let answer = JSON.parse(message.iceCandidate);
                    await handleIceCandidate(answer);
                }
            });
        });

        async function handleOffer(offer) {
            console.log("Handle Offer");
            console.log(pc);
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(offer))
                    .then(async function () {
                        let answerCallee = await pc.createAnswer();
                        await pc.setLocalDescription(answerCallee);
                        answerCallee = JSON.stringify(answerCallee);
                        const answerMessage = {
                            answer : answerCallee,
                            recipient: "caller"
                        }
                        firebase.database().ref('signalling').push(answerMessage);
                    })
                    .then((data) => {
                    })
                    .catch((error) => {
                        console.error('Error pushing data to Firebase:', error);
                    });
            }
            else {
                console.log("Peer connection not initialized");
            }
        }

        async function handleAnswer(answer) {
            console.log("Handle Answer");
            console.log(pc);
            if (pc.signalingState !== 'stable') {
                pc.setRemoteDescription(new RTCSessionDescription(answer)).catch(error => {
                    console.error('Error handling answer:', error);
                });
            } else {
                console.log("Connection already in stable state, ignoring answer");
            }
        }

        async function handleIceCandidate(iceCandidate) {
            pc.addIceCandidate(iceCandidate).catch(error => {
                console.error('Error adding ICE candidate:', error);
            });
        }
        //endregion
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
                        <video className="large-video-call-patient" id="patientRemoteStream" name="switch-call-patient" autoPlay playsInline controls={false}/>
                        <video className="small-video-call" id="patientLocalStream" name="switch-call-patient" autoPlay playsInline controls={false} onClick={switchView}/>
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