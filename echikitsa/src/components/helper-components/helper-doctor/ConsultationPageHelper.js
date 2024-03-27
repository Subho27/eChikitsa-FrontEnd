import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import {Link} from "react-router-dom";
import Collapsible from "react-collapsible";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function ConsultationPageHelper(effect, deps) {
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

    //region Call Handle
    const [doctorLocalStream, setDoctorLocalStream] = useState(null);
    const [doctorRemoteStream, setDoctorRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isCaller, setIsCaller] = useState(true);
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
            const videoElement = document.querySelector('video#doctorLocalStream');
            videoElement.srcObject = stream;
            return stream;
        } catch(error) {
            console.error('Error opening video camera.', error);
            throw error;
        }
    }
    //endregion

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

    //region handle Call button
    const handleCallButton = async () => {
        try {
            let offerSender = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offerSender);
            offerSender = JSON.stringify(offerSender);
            const offerMessage = {
                offer: offerSender,
                recipient: "callee"
            };
            firebase.database().ref("signalling").push(offerMessage)
                .then((data) => {
                })
                .catch((error) => {
                    console.error('Error pushing data to Firebase:', error);
                });
        } catch (error) {
            console.error('Error initiating call:', error);
        }
    };
    //endregion

    const switchView = async() => {
        let videoArray = document.getElementsByName("switch-call-doctor");
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
            setDoctorLocalStream(stream);

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

                const remoteVideo = document.querySelector('video#doctorRemoteStream');
                pc.addEventListener('track', async (event) => {
                    const [doctorRemoteStream] = event.streams;
                    remoteVideo.srcObject = doctorRemoteStream;
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


    return (
        <div className="consult-page-container">
            <div className="upcoming-container">
                <div className="in-queue-section">
                    <span className="in-queue-text">IN-QUEUE : 18</span>
                </div>
                <div className="next-in-queue-section">
                    <div>
                        <span className="next-in-queue-text">NEXT IN QUEUE : <span className="next-value">SURAJ SUBEDI</span></span>
                    </div>
                    <div>
                        <span className="next-in-queue-text">AGE : <span className="next-value">25</span></span>
                    </div>
                    <div>
                        <span className="next-in-queue-text">GENDER : <span className="next-value">MALE</span></span>
                    </div>
                    <div>
                        <span className="next-in-queue-text">DIAGNOSIS : <span className="next-value">HEALTH CHECKUP</span></span>
                    </div>
                    <div>
                        <span className="next-in-queue-text">REVISIT : <span className="next-value">NO</span></span>
                    </div>
                </div>
            </div>
            <div className="call-container">
                <div className="video-call-section">
                    <div className="video-section">
                        <video className="large-video-call" id="doctorRemoteStream" name="switch-call-doctor" autoPlay playsInline controls={false}/>
                        <video className="small-video-call" id="doctorLocalStream" name="switch-call-doctor" autoPlay playsInline controls={false} onClick={switchView}/>
                    </div>
                    <div className="control-button-section">
                        <div className="time-duration-section"><span className="time-duration">02:34</span></div>
                        <div className="button-section">
                            <button className="call-buttons">
                                <img className="button-icon" src={require("../../../images/doctor-page-images/sound-icon.png")} onClick={handleCallButton} alt="Sound"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon" src={require("../../../images/doctor-page-images/mute-icon.png")} alt="Mute"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon" src={require("../../../images/doctor-page-images/video-icon.png")} alt="Video"/>
                            </button>
                            <button className="call-buttons">
                                <img className="button-icon" src={require("../../../images/doctor-page-images/more-icon.png")} alt="More"/>
                            </button>
                            <Link to="/dashboard"><button className="call-buttons">
                                <img className="button-icon" src={require("../../../images/doctor-page-images/call-end-icon.png")} alt="End"/>
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div className="activity-section">
                    <div>
                        <Collapsible trigger="Ask for previous record" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div>
                                <table className="ask-record-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Doctor</th>
                                            <th>Records</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prevRecords.map((record, index) => (
                                            <tr key={index}>
                                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                                <td>{record.doctor_name}</td>
                                                <td><a href={record.download_link} target="_blank" rel="noopener noreferrer">Download Here</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Collapsible>
                    </div>
                    <div>
                        <Collapsible trigger="Suggest next date" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div className="next-date-section">
                                <input className="next-date" type="date" id="next-date" name="next-date" min={today} />
                                <button className="next-date-submit" onClick={suggestADate}>Suggest</button>
                            </div>
                            <div className="next-date-result"><span>Suggested next date : {suggestDate}</span></div>
                        </Collapsible>
                    </div>
                    <div>
                        <Collapsible trigger="Add single word diagnosis" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div className="next-date-section">
                                <input className="diagnosis-field" type="text" id="diagnosis-summary" name="diagnosis-summary" />
                                <button className="next-date-submit" id="diagnosis-submit" onClick={summaryDiagnosis}>Submit</button>
                            </div>
                            <div className="next-date-result"><span>Diagnosis Summary : {diagnosisSummary}</span>
                                <span className="cancel-summary" onClick={cancelDiagnosis}>{diagnosisSummary !== "" ? " X " : ""}</span></div>
                        </Collapsible>
                    </div>
                    <div>
                        <Collapsible trigger="Choose medicine and dosage" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div className="next-date-section dosage-section">
                                <select className="medicine" id="medicine" name="medicine" >
                                    <option>Medicine 1</option>
                                    <option>Medicine 2</option>
                                    <option>Medicine 3</option>
                                    <option>Medicine 4</option>
                                    <option>Medicine 5</option>
                                    <option>Medicine 6</option>
                                </select>
                                <select className="after-before" id="after-before" name="after-before" >
                                    <option>After</option>
                                    <option>Before</option>
                                </select>
                                <select className="dosage" id="dosage-1" name="dosage-1" >
                                    <option>0</option>
                                    <option>1</option>
                                </select>
                                <span style={{ color:"black", fontWeight:"bolder" }}>-</span>
                                <select className="dosage" id="dosage-2" name="dosage-2" >
                                    <option>0</option>
                                    <option>1</option>
                                </select>
                                <span style={{ color:"black", fontWeight:"bolder" }}>-</span>
                                <select className="dosage" id="dosage-3" name="dosage-3" >
                                    <option>0</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <button className="next-date-submit" onClick={submittedMedicines}>Submit</button>
                            <div className="dosage-result">
                                {medicines.length === 0 ? "" :
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Medicine Name</th>
                                            <th>After/Before food</th>
                                            <th>Dosage</th>
                                            <th>Cancel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicines.map((medicine, index) => (
                                            <tr key={index}>
                                                <td>{medicine.name}</td>
                                                <td>{medicine.food}</td>
                                                <td>{medicine.dos1}-{medicine.dos2}-{medicine.dos3}</td>
                                                <td className="cancel-summary" onClick={() => cancelMedicine(index)}>X</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> }
                            </div>
                        </Collapsible>
                    </div>
                    <div>
                        <Collapsible trigger="Write prescription" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div className="chat-box">
                                {prescription.map((prescription, index) => (
                                    <p key={index}>
                                        <span>{index + 1 + ". "}</span> {prescription}
                                        <span className="cancel-summary" onClick={() => cancelPrescription(index)}>{"  X"}</span>
                                    </p>
                                ))}
                            </div>
                            <div className="chat-box-section">
                                <input className="diagnosis-field" type="text" id="chat-field" name="chat-field" />
                                <button className="chat-field-submit" onClick={writePrescription}>Submit</button>
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


export default ConsultationPageHelper;