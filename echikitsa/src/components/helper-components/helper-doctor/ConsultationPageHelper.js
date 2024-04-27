import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import Collapsible from "react-collapsible";
import 'firebase/compat/database';
import {Device} from "mediasoup-client";
import io from "socket.io-client";

import axios, {get} from 'axios';
import {firebaseConfig, storage} from "../../firebase-config/firebaseConfigProfileImages";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

import {over} from "stompjs";
import SockJS from "sockjs-client";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";


function ConsultationPageHelper(effect, deps) {
    const [prevRecords, setPrevRecords] = useState([]);
    const [today, setToday] = useState("");
    const [suggestDate, setSuggestDate] = useState("");
    const [diagnosisSummary, setDiagnosisSummary] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [addMedicines, setAddMedicines] = useState([]);
    const [prescriptionUrl, setPrescriptionUrl] = useState("");


    const liveClock = () => {
        const start_time = new Date(); // Store start time as a Date object
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [elapsedTime, setElapsedTime] = useState(0); // Initialize elapsed time state

        const updateTime = () => {
            // Calculate elapsed time in milliseconds
            const elapsed = new Date() - start_time;
            setElapsedTime(elapsed); // Update elapsed time state
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            // Start updating elapsed time on component mount
            const intervalId = setInterval(updateTime, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }, []); // Empty dependency array ensures the effect runs only on mount

        // Format elapsed time in hours, minutes, seconds
        // const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        return <span className="time-duration">{minutes}m : {seconds}s</span>;
    };
    const [prescriptionUpload, setPrescriptionUpload] = useState(null);
    const [hasConsent, setHasConsent] = useState(false);
    const [waitingConsent, setWaitingConsent] = useState(false);
    const [consentGiven, setConsentGiven] = useState("");
    const [patientId, setPatientId] = useState("");

    let currDate = new Date().toLocaleDateString();
    let startTime = new Date().toLocaleTimeString();

    function getDuration(startTime) {
        // Parse start time string into Date object
        const start = new Date(startTime);

        // Initialize end time as the current time
        const end = new Date();

        // Calculate the difference in milliseconds between end and start
        const durationMs = end.getTime() - start.getTime();

        // Convert milliseconds to hours, minutes, and seconds
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        // Construct the duration string in the format PT{hours}H{minutes}M{seconds}S
        return `PT${hours}H${minutes}M${seconds}S`;
    }

    let record;
    let recordId;
    const addRecord = async () => {
        try {
            record = await axios.post('https://localhost:8083/file-handle/ehr/record', {
                date: currDate,
                duration: "",
                time: startTime,
                reason: diagnosisSummary,
                patient_id: 13,
                doctor_id: getUserIdFromLocalStorage(),
                follow_up_date: suggestDate,
                patient_type: "R",
                prescription_url: prescriptionUrl
            },{headers});
            recordId = record.ehr_id;
        }
        catch(error){
            alert("Error in adding record" + error);
        }
    }

    const addDuration = async() =>{
        try {
            await axios.put('https://localhost:8083/file-handle/ehr/add-duration', {
                ehr_id: recordId,
                date: currDate,
                duration: getDuration(startTime),
                time: startTime,
                reason: diagnosisSummary,
                patient_id: 13,
                doctor_id: getUserIdFromLocalStorage(),
                follow_up_date: suggestDate,
                patient_type: "R",
                prescription_url: prescriptionUrl
            },{headers});
        }
        catch(error){
            alert("Error in adding record" + error);
        }
    }

    // Prescription WebSocket connection setup
    // const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
    // stompClient.connect({}, ()=> {
    //     const waiting = `/topic/send-data-req/${getUserIdFromLocalStorage()}`;
    //     stompClient.subscribe(waiting,  (message) => {
    //         console.log(message);
    //         return generatePDF(message.body);
    //
    //     })
    // })

    // Function to upload PDF file to Firebase Storage
    const token = getJwtTokenFromLocalStorage();
    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
    const generatePDF = async () => {
        try {
            const response = await axios.post('https://localhost:8083/file-handle/prescription/generate_pdf', {
                patient_id:2,
                doctor_id:1,
                instructions:prescription,
                medication:addMedicines,
                diagnosis:diagnosisSummary,
                nextdate:suggestDate
            }, {headers,
                responseType: 'blob' // Set response type to blob
            });

            // Create a blob URL for the PDF data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const prescriptionRef = ref(storage, `echikitsa/Patient/2/${"2"+Date.now().toLocaleString()}`);

            await uploadBytes(prescriptionRef, blob)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .then((url) => {
                    // Optionally, you can also update state or perform other actions here
                    alert("Prescription Uploaded");
                    setPrescriptionUrl(url);
                    return url;
                })
            const pdfUrl = URL.createObjectURL(blob);

            // Open the PDF in a new window/tab
            window.open(pdfUrl);

        } catch (error) {
            alert('Error generating PDF:' + error);
            throw error;
        }
    };

    const handleClick = async () => {
        try {
            // Call the generatePDF function
            await generatePDF();
        } catch (error) {
            // Handle error
            alert("Error generating, uploading PDF, and adding data:" + error);
        }
    };



    const [videoArray, setVideoArray] = useState(["Patient", "Senior Doctor"]);
    let i = 0;

    const navigate = useNavigate();

    //region Call constants
    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState("");
    const [socket, setSocket] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasSound, setHasSound] = useState(true);
    const [hasVideo, setHasVideo] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
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
        const addMedicine = [medicineName, afterBefore, dosage1, dosage2, dosage3]
        setAddMedicines(prevAddMedicines => [...prevAddMedicines, addMedicine]);
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
        let videoArray = document.getElementsByName("switch-call-doctor");
        const remote = videoArray.item(0).id;
        videoArray.item(0).id = videoArray.item(1).id;
        videoArray.item(1).id = remote;
    }

    //region Call Methods
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerOptions
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
    let params = {
        // mediasoup params
        encodings: [
            {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
            },
        ],
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
        codecOptions: {
            videoGoogleStartBitrate: 1000
        }
    }
    let device;
    let audioParams;
    let audioProducer;
    let videoProducer;
    let rtpCapabilities;
    let producerTransport;
    let consumerTransports = [];
    let videoParams = { params };
    let consumingTransports = [];

    const connectSendTransport = async () => {
        // we now call produce() to instruct the producer transport
        // to send media to the Router
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
        // this action will trigger the 'connect' and 'produce' events above

        console.log('Connect SSend Transport');
        audioProducer = await producerTransport.produce(audioParams);
        videoProducer = await producerTransport.produce(videoParams);

        audioProducer.on('trackended', () => {
            console.log('audio track ended')

            // close audio track
        })

        audioProducer.on('transportclose', () => {
            console.log('audio transport ended')

            // close audio track
        })

        videoProducer.on('trackended', () => {
            console.log('video track ended')

            // close video track
        })

        videoProducer.on('transportclose', () => {
            console.log('video transport ended')

            // close video track
        })
    }

    const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
        // for consumer, we need to tell the server first
        // to create a consumer based on the rtpCapabilities and consume
        // if the router can consume, it will send back a set of params as below
        console.log('Emitting Consume');
        await socket.emit('consume', {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async ({ params }) => {
            setPatientId(params.userId);
            if (params.error) {
                console.log('Cannot Consume')
                return
            }


            const consumer = await consumerTransport.consume({
                id: params.id,
                producerId: params.producerId,
                kind: params.kind,
                rtpParameters: params.rtpParameters
            })

            consumerTransports = [
                ...consumerTransports,
                {
                    consumerTransport,
                    serverConsumerTransportId: params.id,
                    producerId: remoteProducerId,
                    consumer,
                },
            ]

            // create a new div element for the new consumer media
            console.log('Before');
            const newElem = document.createElement('div')
            newElem.setAttribute('id', `td-${remoteProducerId}`)
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const response = await axios.get(`https://localhost:8083/echikitsa-backend/user/get-user-name/${params.userId}`,{headers});
            console.log(response);
            let name = "";
            name =  response.data.firstName + " " + response.data.lastName;

            if (params.kind === 'audio') {
                console.log('Middle');
                //append to the audio container
                newElem.innerHTML = `<audio id=${remoteProducerId} autoplay ></audio>`
            } else {
                console.log('Middle');
                //append to the video container
                newElem.setAttribute('class', 'remoteVideo')
                newElem.innerHTML = '<div class="tag">'+ name +'</div><video id="' + remoteProducerId + '" autoplay class="video" ></video>'
            }

            console.log('After');
            const videoContainer = document.getElementById('videoContainer');

            if (videoContainer) {
                videoContainer.appendChild(newElem);
            } else {
                console.log('videoContainer element not found');
                return;
            }

            console.log('And After');
            // destructure and retrieve the video track from the producer
            const { track } = consumer

            document.getElementById(remoteProducerId).srcObject = new MediaStream([track])

            console.log('Long After');
            // the server consumer started with media paused
            // so we need to inform the server to resume
            socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
        })
    }

    const signalNewConsumerTransport = async (remoteProducerId) => {
        //check if we are already consuming the remoteProducerId
        if (consumingTransports.includes(remoteProducerId)) return;
        consumingTransports.push(remoteProducerId);
        console.log('Entering Signal New Consumer Transport');
        console.log('Emitting Create web rtc transport');

        await socket.emit('createWebRtcTransport', { consumer: true }, async ({ params }) => {
            // The server sends back params needed
            // to create Send Transport on the client side
            console.log('Got Create web rtc transport');
            if (params.error) {
                console.log(params.error)
                return
            }
            // console.log(`PARAMS... ${params}`)

            let consumerTransport
            try {
                consumerTransport = device.createRecvTransport(params)
            } catch (error) {
                // exceptions:
                // {InvalidStateError} if not loaded
                // {TypeError} if wrong arguments.
                console.log(error)
                return
            }

            console.log('Consumer transport on connect');
            consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                try {
                    // Signal local DTLS parameters to the server side transport
                    // see server's socket.on('transport-recv-connect', ...)
                    console.log('Emitting tranport recv connect');
                    await socket.emit('transport-recv-connect', {
                        dtlsParameters,
                        serverConsumerTransportId: params.id,
                    })

                    // Tell the transport that parameters were transmitted.
                    callback()
                } catch (error) {
                    // Tell the transport that something was wrong
                    errback(error)
                }
            })

            console.log('Calling Connect Recv transport');
            connectRecvTransport(consumerTransport, remoteProducerId, params.id)
        })
    }

    const getProducers = () => {
        console.log('Emitting getproducers');
        socket.emit('getProducers', producerIds => {
            // console.log(producerIds)
            // for each of the producer create a consumer
            // producerIds.forEach(id => signalNewConsumerTransport(id))
            console.log('Got getProducers');
            producerIds.forEach(signalNewConsumerTransport)
        })
    }

    const createSendTransport = () => {
        // see server's socket.on('createWebRtcTransport', sender?, ...)
        // this is a call from Producer, so sender = true
        console.log('Emitting create webrtc transport');
        socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
            // The server sends back params needed
            // to create Send Transport on the client side
            if (params.error) {
                console.log(params.error)
                return
            }

            // console.log(params)

            // creates a new WebRTC Transport to send media
            // based on the server's producer transport params
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
            producerTransport = device.createSendTransport(params)

            // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
            // this event is raised when a first call to transport.produce() is made
            // see connectSendTransport() below
            producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                try {
                    console.log('producer transport on connect');
                    // Signal local DTLS parameters to the server side transport
                    // see server's socket.on('transport-connect', ...)
                    await socket.emit('transport-connect', {
                        dtlsParameters,
                    })

                    // Tell the transport that parameters were transmitted.
                    callback()

                } catch (error) {
                    errback(error)
                }
            })

            producerTransport.on('produce', async (parameters, callback, errback) => {
                // console.log(parameters)

                console.log('producer transport on produce');
                try {
                    // tell the server to create a Producer
                    // with the following parameters and produce
                    // and expect back a server side producer id
                    // see server's socket.on('transport-produce', ...)

                    console.log('Emitting transport produce');
                    await socket.emit('transport-produce', {
                        kind: parameters.kind,
                        rtpParameters: parameters.rtpParameters,
                        appData: parameters.appData,
                    }, ({ id, producersExist }) => {
                        // Tell the transport that parameters were transmitted and provide it with the
                        // server side producer's id.
                        callback({ id })

                        // if producers exist, then join room
                        console.log('Getting producers');
                        if (producersExist) getProducers()
                    })
                } catch (error) {
                    errback(error)
                }
            })

            console.log('Connect send transport');
            connectSendTransport()
        })
    }

    // A device is an endpoint connecting to a Router on the
    // server side to send/recive media
    const createDevice = async () => {
        try {
            console.log('starting create device');
            device = new Device()

            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
            // Loads the device with RTP capabilities of the Router (server side)
            await device.load({
                // see getRtpCapabilities() below
                routerRtpCapabilities: rtpCapabilities
            })

            // console.log('Device RTP Capabilities', device.rtpCapabilities)

            // once the device loads, create transport
            console.log('created device');
            createSendTransport()

        } catch (error) {
            console.log(error)
            if (error.name === 'UnsupportedError')
                console.warn('browser not supported')
        }
    }

    const joinRoom = () => {
        // console.log(socket);
        console.log('Emitting join room');
        const userId = getUserIdFromLocalStorage();
        socket.emit('joinRoom', { roomName, userId }, (data) => {
            // console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
            // we assign to local variable and will be used when
            // loading the client Device (see createDevice above)
            rtpCapabilities = data.rtpCapabilities

            console.log('Got join room');
            // once we have rtpCapabilities from the Router, create Device
            createDevice()
        })
    }

    const streamSuccess = (stream) => {
        const localVideo = document.querySelector('video#doctorLocalStream');
        localVideo.srcObject = stream
        setLocalStream(stream);
        setMediaStream(stream);
        // stream.getAudioTracks()[0].enabled = false;
        audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
        videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

        console.log('Setting local stream success');
        joinRoom()
    }

    const getLocalStream = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: {
                    min: 640,
                    max: 1920,
                },
                height: {
                    min: 400,
                    max: 1080,
                }
            }
        })
            .then(streamSuccess)
            .catch(error => {
                console.log(error)
            })
    }
    //endregion

    //region Call Use Effects
    useEffect(() => {
        if (!socket) return; // Exit if socket is null

        const handleProducerClosed = ({ remoteProducerId }) => {
            // server notification is received when a producer is closed
            // we need to close the client-side consumer and associated transport
            const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId);
            if(producerToClose != null) {
                producerToClose.consumerTransport.close();
                producerToClose.consumer.close();
            }

            // remove the consumer transport from the list
            consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId);

            // remove the video div element
            const videoContainer = document.getElementById('videoContainer');
            if (videoContainer) {
                const videoElement = document.getElementById(`td-${remoteProducerId}`);
                if (videoElement) {
                    videoContainer.removeChild(videoElement);
                }
            }
        };

        // Register the event listener
        socket.on('producer-closed', handleProducerClosed);

        // Clean up the event listener when component unmounts or socket changes
        return () => {
            socket.off('producer-closed', handleProducerClosed);
        };
    }, [socket, consumerTransports]); // Dependencies include socket and consumerTransports

    useEffect(() => {
        if (socket) {
            // server informs the client of a new producer just joined
            socket.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId))
        }
    }, [socket]);

    // This useEffect hook will run every time socket changes
    useEffect(() => {
        if (socket) {
            socket.on('connection-success', ({ socketId }) => {
                // console.log(socketId);
                console.log('socket connection success');
                getLocalStream();
            });
        }
    }, [socket]);
    //endregion

    const handleCallEnd = async () => {
        //await handleClick();
        //await addRecord();
        await socket.disconnect();
        await localStream.getTracks().forEach(function(track) {
            track.stop();
        });
        navigate("/dashboard");
    }
    const getRecordByDoctorId = async () => {
        const token = getJwtTokenFromLocalStorage();
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
        try {
            console.log("record fetched afte consent",patientId);
            const responses = await axios.get(
                `https://localhost:8083/echikitsa-backend/ehr/get-record-patient/${patientId}`, { headers }
            );
             console.log("record fetched after consent",responses.data);
            // setDummy(responses.data);
            setPrevRecords(responses.data)
            // console.log("the value of records"+responses.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        // setPrevRecords(askRecord);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        setToday(tomorrowFormatted);

        //region Connection & Room
        //Handle room name
        // const room = window.location.pathname.split('/')[2];
        const room = getUserIdFromLocalStorage().toString();
        console.log(room)
        if (room === "" || room === undefined) {
            setError("Please add a room name to the URL.");
            return;
        }
        setRoomName(room);

        //Creating socket connection
        if(socket === null) {
            const sock = io("/mediasoup");
            setSocket(sock);
        }
        //endregion

    }, [])

    const askConsent = async () => {
        setWaitingConsent(true);
        const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
        stompClient.connect({}, async () => {
            await stompClient.send(`/app/send-consent-request/${getUserIdFromLocalStorage()}`);
        });
    }

    useEffect(() => {
        if(consentGiven !== "") {
            if(consentGiven === "false") {
                document.getElementById("consent-message").innerText = "Sorry, consent was not given by patient.";
            }
            else {
                setWaitingConsent(false);
                getRecordByDoctorId(params.user)
                setHasConsent(true);
            }
        }
    }, [consentGiven]);

    useEffect(() => {
        const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
        stompClient.connect({}, async () => {
            const waiting = `/topic/get-consent-reply/${getUserIdFromLocalStorage()}`;
            const getPrescriptionRequest = `/topic/get-prescription-request/${getUserIdFromLocalStorage()}`;
            stompClient.subscribe(waiting, async (message) => {
                setConsentGiven(message.body);
            });
            stompClient.subscribe(getPrescriptionRequest, async (message) => {
                // Here put methods Like creating prescription & clearing fields
                // Here you will also get EHR Id
                console.log(message);
            })
        });
    }, [])

    useEffect(() => {
        const audioElements = document.getElementsByTagName("audio");
        if(audioElements) {
            const audioElementList = Array.from(audioElements);
            audioElementList.forEach(audioElement => audioElement.muted = !hasSound);
        }
    }, [hasSound]);

    useEffect(() => {
        if(mediaStream) {
            mediaStream.getAudioTracks()[0].enabled = isMuted;
        }
    }, [isMuted]);

    useEffect(() => {
        if(mediaStream) {
            mediaStream.getVideoTracks()[0].enabled = hasVideo;
        }
    }, [hasVideo]);

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
                        <p className="tag">You</p>
                        <video className="large-video-call-patient-doctor" id="doctorLocalStream" name="switch-call-patient" autoPlay muted />
                        <div id="videoContainer" className="small-video-call"></div>
                        {/*<video className="small-video-call" id="patientRemoteStream" name="switch-call-patient" autoPlay muted onClick={switchView}/>*/}
                    </div>
                    <div className="control-button-section">
                        <div className="time-duration-section">{liveClock()}
                        </div>
                        <div className="button-section">
                            <button className="call-buttons">
                                {hasSound && <img className="button-icon" src={require("../../../images/doctor-page-images/sound-on-icon.png")} alt="Sound Off" onClick={() => setHasSound(!hasSound)}/>}
                                {!hasSound && <img className="button-icon" src={require("../../../images/doctor-page-images/sound-icon.png")} alt="Sound On" onClick={() => setHasSound(!hasSound)}/>}
                            </button>
                            <button className="call-buttons">
                                {isMuted && <img className="button-icon" src={require("../../../images/doctor-page-images/mic-on.png")} alt="Mic Off" onClick={() => {setIsMuted(!isMuted)}}/>}
                                {!isMuted && <img className="button-icon" src={require("../../../images/doctor-page-images/mic-off.png")} alt="Mic On" onClick={() => {setIsMuted(!isMuted)}}/>}
                            </button>
                            <button className="call-buttons">
                                {hasVideo && <img className="button-icon" src={require("../../../images/doctor-page-images/video-icon.png")} alt="Video Off" onClick={() => {setHasVideo(!hasVideo)}}/>}
                                {!hasVideo && <img className="button-icon" src={require("../../../images/doctor-page-images/video_off.png")} alt="Video On" onClick={() => {setHasVideo(!hasVideo)}}/>}
                            </button>
                            {/*<button className="call-buttons">*/}
                            {/*    <img className="button-icon" src={require("../../../images/doctor-page-images/more-icon.png")} alt="More"/>*/}
                            {/*</button>*/}
                            <Link to="/dashboard"><button className="call-buttons" onClick={handleCallEnd}>
                                <img className="button-icon" src={require("../../../images/doctor-page-images/call-end-icon.png")} alt="End"/>
                            {/*<Link to="/dashboard"><button className="call-buttons">*/}
                            {/*    <img className="button-icon" src={require("../../../images/doctor-page-images/call-end-icon.png")} alt="End" onClick={handleClick}/>*/}
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div className="activity-section">
                    <div>
                        <Collapsible trigger="Ask for previous record" className="ask-record" openedClassName="ask-record-open"
                                     triggerClassName="ask-record-closed-trigger" triggerOpenedClassName="ask-record-open-trigger">
                            <div>
                                {!hasConsent && !waitingConsent &&
                                    <div>
                                        <button className="ask-past-records" id="ask-consent-button" onClick={askConsent}>
                                            Ask past records
                                        </button>
                                    </div>}
                                {waitingConsent && <p id="consent-message">Waiting for patients' consent...</p>}
                                {hasConsent && <table className="ask-record-table">
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
                                                <td>{record.firstName} {record.lastName} </td>
                                                <td><a href={record.prescription_url} target="_blank" rel="noopener noreferrer">
                                                    <img className="download-prescription" src={require("../../../images/patient_landing_page/download.png")} alt="Download"/>
                                                </a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>}
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