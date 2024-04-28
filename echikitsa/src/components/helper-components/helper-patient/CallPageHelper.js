import React, {useEffect, useRef, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import {Link, useNavigate, useLocation} from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';
import Collapsible from "react-collapsible";
import "../../../css/helper-components/helper-patient/call-page-style.css"
import 'firebase/compat/database';
import {Device} from 'mediasoup-client'
import io from 'socket.io-client'
import axios from "axios";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import firebase from "firebase/compat/app";
import {firebaseConfig} from "../../firebase-config/firebaseConfigProfileImages";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import {toast} from "react-toastify";

function CallPageHelper(effect, deps) {
    const [prevRecords, setPrevRecords] = useState([])
    const [today, setToday] = useState("")
    const [suggestDate, setSuggestDate] = useState("");
    const [diagnosisSummary, setDiagnosisSummary] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [consentFromDoctor, setConsentFromDoctor] = useState("");
    const [consentOpen, setConsentOpen] = useState(false);
    const [confResult, setConfResult] = useState({});
    const [videoArray, setVideoArray] = useState(["Doctor", "Senior Doctor"]);
    const [ehrId, setEhrId] = useState(0);
    let callDuration = "";
    let i = 0;


    const navigate = useNavigate();
    const location = useLocation();

    //region Call constants
    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState("");
    const [socket, setSocket] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasSound, setHasSound] = useState(true);
    const [hasVideo, setHasVideo] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
    const [phonenumber, setphoneNumber] = useState("");
    //endregion

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
    useEffect(() => {
        try{
            const token = getJwtTokenFromLocalStorage();
            const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            const response = axios.get(`https://localhost:8083/echikitsa-backend/user/get-user-name/${getUserIdFromLocalStorage()}`,{headers}).then((response) => {
                console.log(response)
                setphoneNumber(response.data.phoneNumber)
            });
        }
        catch(error) {
            console.log(error.response.data)

        }
    }, []);

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
    const inputRefsCall = useRef([]);

    const handleConsentOtp = (index, value) => {
        const newOtpValues = [...emailOtpValues];
        newOtpValues[index] = value;
        if (value === '') {
            if (index > 0) {
                inputRefsCall.current[index].value = '';
                inputRefsCall.current[index - 1].focus();
            }
        } else if (index < emailOtpValues.length - 1 && value.length === 1) {
            inputRefsCall.current[index + 1].focus();
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
            // console.log("hiiiiiiii",params.userId)
            // const token = getJwtTokenFromLocalStorage();
            // const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
            // const response = axios.get(`https://localhost:8083/echikitsa-backend/user/get-user-name/${params.userId}`,{headers}).then((response) => {
            //     console.log(response.data.firstName)
            //     setName(response.data.firstName)
            //
            // });
            if (params.error) {

                console.log('Cannot Consume')
                return
            }

            // console.log(`Consumer Params ${params}`)
            // then consume with the local consumer transport
            // which creates a consumer
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
            let name = response.data.firstName + " " + response.data.lastName;
            if(response.data.role === 'DOCTOR') {
                if(response.data.SeniorityLevel === 'senior') {
                    name = "SDr. " + name;
                }
                else {
                    name = "Dr. " + name;
                }
            }
            if (params.kind === 'audio') {
                console.log('Middle1');
                //append to the audio container
                newElem.innerHTML = '<audio id="' + remoteProducerId + '" autoplay></audio>'
            } else {
                console.log('Middle2');
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
            if(data.error !== null && data.error === 'room-full') {
                alert("Room is full. Not able to join. Sorry for inconvenience.");
                navigate("/welcome");
            }

            rtpCapabilities = data.rtpCapabilities

            console.log('Got join room');
            // once we have rtpCapabilities from the Router, create Device
            createDevice()
        })
    }

    const streamSuccess = (stream) => {
        const localVideo = document.querySelector('video#patientLocalStream');
        localVideo.srcObject = stream
        setLocalStream(stream);
        setMediaStream(stream);
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

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

// Concatenate year, month, and day with "-" separator to form "YYYY-MM-DD" format
    const currDate = `${year}-${month}-${day}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let startTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    let callStartTime = new Date();

    function getDuration() {
        // Parse start time string into Date object
        const start = new Date(callStartTime);

        // Initialize end time as the current time
        const end = new Date();

        // Calculate the difference in milliseconds between end and start
        const durationMs = end.getTime() - start.getTime();

        // Convert milliseconds to hours, minutes, and seconds
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        // Construct the duration string in the format PT{hours}H{minutes}M{seconds}S
        callDuration = `PT${hours}H${minutes}M${seconds}S`;
        return `PT${hours}H${minutes}M${seconds}S`;
    }

    const token = getJwtTokenFromLocalStorage();
    const headers = { 'Content-Type' : 'application/json' ,'Authorization': `Bearer ${token}` }
    // const addRecord = async () => {
    //
    // }

    const addDuration = async() =>{
        try {
            await axios.put('https://localhost:8083/file-handle/ehr/add-duration', {
                ehr_id: ehrId,
                duration: callDuration
            },{headers});
        }
        catch(error){
            alert("Error in adding record" + error);
        }
    }
    const confirmJoin = () => {


        try {
            axios.post('https://localhost:8083/file-handle/ehr/record', {
                date: currDate,
                duration: "",
                time: startTime,
                reason: "",
                patient_id: getUserIdFromLocalStorage(),
                doctor_id: location.state.assignedDoctorId,
                follow_up_date: "",
                patient_type: "",
                prescription_url: ""
            },{headers} ).then(async (response) =>{
                console.log(response);
                setEhrId(response.data.ehr_id);
            });
        }
        catch(error){
            console.log("Error in adding record" + error);
        }


        // const room = window.location.pathname.split("/")[2];
        const room = location.state.assignedDoctorId.toString();
        console.log(room);
        if (room === "" || room === undefined) {
            setError("Please add a room name to the URL.");
            return;
        }
        setIsOpen(false);
        setRoomName(room);

        //Creating socket connection
        if(socket === null) {
            const sock = io("/mediasoup");
            setSocket(sock);
        }
    }
    let rating1 = 0;
    const handleCallEnd = async () => {
        let room;
        // if(roomName === "") room = parseInt(window.location.pathname.split("/")[2]);
        if(roomName === "") room = location.state.assignedDoctorId.toString();
        else room = roomName;
        if(socket !== null) {
            await socket.disconnect();
            await localStream.getTracks().forEach(function(track) {
                track.stop();
            });

        }
        const token = getJwtTokenFromLocalStorage();
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
        const response = axios.put(`https://localhost:8083/user-handle/feedback/update-feedback/${location.state.assignedDoctorId}`,rating1,{headers})
        getDuration();
        await addDuration().then(r => {
            console.log("Duration added");
        })
        console.log("Record ID",ehrId);
        await axios.post("http://localhost:9193/local/remove", {
            patientId: null,
            doctorId: parseInt(room),
            ehrId : ehrId
        }).then(async (response) => {
            const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
            stompClient.connect({}, async () => {
                await stompClient.send("/app/reload-position");
                await stompClient.send(`/app/send-data/${room}`);
                // if(socket !== null) {
                //     alert("call ended successfully");
                // }
                navigate("/welcome");
            });
        })
        await notify_success()
    }

    const notify_success = async () => {
        toast.success("You can download prescription from last consultation in Records", {
            position: "top-center",
            autoClose: 3000
        });
    };

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

    useEffect(() => {
        setPrevRecords(askRecord);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        setToday(tomorrowFormatted);

        const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
        stompClient.connect({}, async () => {
            const waiting = `/topic/get-consent-request/${getUserIdFromLocalStorage()}`;
            stompClient.subscribe(waiting, async (message) => {
                setConsentFromDoctor(message.body);
                setConsentOpen(true);
            });
        });

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
            rating1 = star;

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

    const returnWelcome = () => {
        navigate('/welcome');
    }

    const verifyConsent = () => {
        const isHidden = document.getElementById("consent-otp-check");
        if (isHidden !== null) {
            isHidden.className = "fg visually-hidden";
        }
        const verificationCode = parseInt(emailOtpValues.join(''));
        const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
        stompClient.connect({}, async () => {
            confResult.confirm(verificationCode).then( (result) => {
                stompClient.send(`/app/consent-reply/${consentFromDoctor}`, {}, true);
            }).catch((error) => {
                stompClient.send(`/app/consent-reply/${consentFromDoctor}`, {}, false);
            });
        });
        setConsentOpen(false);
    }

    const sendOtp = () => {
        const phoneNumber = "+91" + phonenumber; //---------- Patient Phone Number
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setConfResult(confirmationResult);
            }).catch((error) => {
            console.log("expire");
        });
    }

    const allowConsent = () => {
        const isHidden = document.getElementById("consent-otp-check");
        if (isHidden !== null) {
            isHidden.className = "fg";
        }
        firebase.auth().useDeviceLanguage();
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                    },
                    'expired-callback': () => {
                        console.log('expired');
                    },
                    'error-callback': (error) => {
                        console.log(error);
                    }
                });
                window.recaptchaVerifier.render().then(() =>{
                    console.log("before otp");
                    sendOtp();
                });
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }, []);

    const cancelConsent = () => {
        const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
        stompClient.connect({}, async () => {
            await stompClient.send(`/app/consent-reply/${consentFromDoctor}`, {}, false);
            setConsentOpen(false);
        });
    }

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
            <div id='recaptcha-container'></div>
            <div>
                {isOpen && <StyledPopup className="call-confirmation" id="confirmation" modal defaultOpen={true} closeOnDocumentClick={false}>
                    <div className="confirmation-content">
                        <h3>Confirmation!!!</h3>
                        <p>Are you sure?<br/>
                        You want to join video consultation.</p>
                        <div className="Feedbutton">
                            <button className="confirm-call" onClick={confirmJoin}>YES</button>
                            <button className="confirm-call" onClick={handleCallEnd}>NO</button>
                        </div>
                    </div>
                </StyledPopup>}
            </div>
            <div className="call-container">
                <div className="video-call-section-patient">
                    <div className="video-section">
                        <p className="tag">You</p>
                        <video className="large-video-call-patient" id="patientLocalStream" name="switch-call-patient" autoPlay muted />
                        <div id="videoContainer" className="small-video-call"></div>
                        {/*<video className="small-video-call" id="patientRemoteStream" name="switch-call-patient" autoPlay muted onClick={switchView}/>*/}
                    </div>
                    <div className="control-button-section">
                        <div className="time-duration-section"><span className="time-duration">02:34</span></div>
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
                            {/*    <img className="button-icon"*/}
                            {/*         src={require("../../../images/doctor-page-images/more-icon.png")} alt="More"/>*/}
                            {/*</button>*/}
                            <StyledPopup className="Feedback"
                                trigger={<button className="call-buttons">
                                    <img className="button-icon"
                                         src={require("../../../images/doctor-page-images/call-end-icon.png")}
                                         alt="End"/>
                                </button>}
                                modal
                                closeOnDocumentClick >
                                <div className="Feedcontent">
                                    <h4>FeedBack</h4>
                                    <div>
                                        <h1><StarRating className="stars" totalStars={5}/></h1>
                                    </div>
                                    <div className="Feedbutton">
                                        <Link to="/welcome"><button className="submit-button" onClick={handleCallEnd}>Submit</button></Link>
                                        <Link to="/welcome"><button className="cancel-button" onClick={handleCallEnd}>Cancel</button></Link>
                                    </div>
                                </div>
                            </StyledPopup>
                        </div>
                    </div>
                </div>
                <div className="activity-section-patient">
                    <div>
                        <Collapsible
                            trigger="Consent for Retrieval of Past Medical Records"
                            className="ask-record"
                            openedClassName="ask-record-open"
                            triggerClassName="ask-record-closed-trigger"
                            triggerOpenedClassName="ask-record-open-trigger"
                            open={consentOpen}
                            triggerDisabled={true}>
                            <div>
                                <div id="dialogBox" className="dialog">
                                    <div className="dialog-content">
                                        <div className="doctor-icon">Dr. {consentFromDoctor}</div>
                                        <p className="request">is requesting access to your medical records.</p>
                                        <div className="button-container">
                                            <button id="allowButton" onClick={allowConsent}>Allow</button>
                                            <button id="cancelButton" onClick={cancelConsent}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="visually-hidden fg" id="consent-otp-check" style={{color: "black"}}>
                                    <div className="container-otp">
                                        <div id="inputs" className="inputs">
                                            {emailOtpValues.map((value, index) => (
                                                <input key={index} ref={(ref) => (inputRefsCall.current[index] = ref)}
                                                       className="input-otp" type="text" inputMode="numeric"
                                                       maxLength="1" value={value}
                                                       onChange={(e) => handleConsentOtp(index, e.target.value)}/>
                                            ))}
                                        </div>
                                        <div className="field">
                                            <input type="submit" value={`Verify your Consent`} onClick={verifyConsent}/>
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