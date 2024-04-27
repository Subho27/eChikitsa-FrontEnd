import React, {useEffect, useRef, useState} from "react";
import "../../../css/helper-components/helper-doctor/consultation-page-style.css"
import "../../../css/helper-components/helper-patient/call-page-style.css"
import "../../../css/helper-components/helper-doctor/monitor-call-style.css"
import 'reactjs-popup/dist/index.css';
import 'firebase/compat/database';
import {Device} from 'mediasoup-client'
import io from 'socket.io-client'
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {getJwtTokenFromLocalStorage} from "../../../resources/storageManagement";
import axios from "axios";

function MonitorCallHelper(effect, deps) {

    const [videoArray, setVideoArray] = useState(["Patient", "Doctor"]);
    let i = 0;

    //region Call constants
    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState("");
    const [socket, setSocket] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasSound, setHasSound] = useState(true);
    const [hasVideo, setHasVideo] = useState(true);
    const [mediaStream, setMediaStream] = useState(null);
    //endregion

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
            if (params.kind === 'audio') {
                console.log('Middle');
                //append to the audio container
                newElem.innerHTML = '<audio id="' + remoteProducerId + '" autoplay></audio>'
            } else {
                console.log('Middle');
                //append to the video container
                newElem.setAttribute('class', 'remoteVideo')
                newElem.innerHTML = '<div class="tag">'+ params.userId +'</div><video id="' + remoteProducerId + '" autoplay class="video" ></video>'
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
        socket.emit('joinRoom', { roomName }, (data) => {
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
        const localVideo = document.querySelector('video#patientLocalStream');
        localVideo.srcObject = stream
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

    //region Call Use Effects
    useEffect(() => {
        if (!socket) return; // Exit if socket is null

        const handleProducerClosed = ({ remoteProducerId }) => {
            // server notification is received when a producer is closed
            // we need to close the client-side consumer and associated transport
            const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId);
            producerToClose.consumerTransport.close();
            producerToClose.consumer.close();

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

        //region Connection & Room
        //Handle room name
        const room = window.location.pathname.split('/')[2];
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


    useEffect(() => {
        const audioElements = document.getElementsByTagName("audio");
        if(audioElements) {
            const audioElementList = Array.from(audioElements);
            audioElementList.forEach(audioElement => audioElement.muted = !hasSound);
        }
    }, [hasSound]);
    let doc_id = getUserIdFromLocalStorage();

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

    const [doctorData, setDoctorData] = useState({});
    const [patientData, setPatientData] = useState({});

    useEffect(() => {
        const getDoctorDataAndPatientData = async () => {
            try {
                const token = getJwtTokenFromLocalStorage();
                const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};

                const response1 = await axios.get(`https://localhost:8083/echikitsa-backend/doctor/get/${doc_id}`, {headers});
                setDoctorData(response1.data);

                const response2 = await axios.get(`https://localhost:8083/echikitsa-backend/user/get-user-name/9`, {headers});
                setPatientData(response2.data);

                console.log("the value is", doctorData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        getDoctorDataAndPatientData();
    }, []);




    return (

        <div className="consult-page-container">
            <div className="call-container">
                <div className="video-call-section-patient">
                    <div className="video-section">
                        <p className="tag">{getUserIdFromLocalStorage()}</p>
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
                        </div>
                    </div>
                </div>
                <div className="activity-section-patient monitor-activity">
                    <div className="monitor-doctor-details">
                        <div className="monitor-head">
                            <p className="activity-tag">Doctor</p>
                            <img className="monitor-photo" src={require('../../../images/patient_landing_page/doctor9.jpg')} alt="Doctor"/>
                        </div>
                        <table className="monitor-detail">
                            <tbody>
                                <tr>
                                    <td>Doctor Name</td>
                                    <td>Dr   {doctorData.firstName + " " + doctorData.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Specialization</td>
                                    <td>{doctorData.specialization}</td>
                                </tr>
                                <tr>
                                    <td>Degree</td>
                                    <td>{doctorData.degree}</td>
                                </tr>
                                <tr>
                                    <td>Email ID</td>
                                    <td>{doctorData.email}</td>
                                </tr>
                                <tr>
                                    <td>Experience</td>
                                    <td>{doctorData.yearOfExp}</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>{doctorData.age} Years</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>{doctorData.rating}/5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="monitor-patient-style">
                        <div className="monitor-head">
                            <p className="activity-tag">Patient</p>
                            <img className="monitor-photo" src={require('../../../images/patient_landing_page/doctor9.jpg')} alt="Doctor"/>
                        </div>
                        <table className="monitor-detail">
                            <tbody>
                                <tr>
                                    <td>Patient Name</td>
                                    <td>{patientData.firstName + " " + patientData.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email ID</td>
                                    <td>{patientData.email}</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>{patientData.age} Years</td>
                                </tr>
                                {/*<tr>*/}
                                {/*    <td>Diagnosis</td>*/}
                                {/*    <td>Asthma</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>Repeat Patient</td>*/}
                                {/*    <td>No</td>*/}
                                {/*</tr>*/}
                                <tr>
                                    <td>Height</td>
                                    <td>{patientData.height} cm</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{patientData.weight} kg</td>
                                </tr>
                                <tr>
                                    <td>Blood Group</td>
                                    <td>{patientData.bloodGroup}</td>
                                </tr>
                            </tbody>
                        </table>
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


export default MonitorCallHelper;