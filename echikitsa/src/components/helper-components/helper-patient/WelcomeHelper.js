import React, {useEffect, useState} from 'react';
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import "../../../css/helper-components/helper-patient/welcome-style.css"
import '../../../css/helper-components/header-style.css'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import 'bootstrap/dist/js/bootstrap.bundle.min'
import TestingWelcome from "./TestingWelcome";
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";


function WelcomeHelper(props){
    const [assignedDoctorId, setAssignedDoctorId] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [firstMember, setFirstMember] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [havePosition, setHavePosition] = useState(false);
    const [position, setPosition] = useState(0);
    const navigate = useNavigate();

    const handleSeeMoreClick = (route) => {
        console.log("See More clicked");
        window.location.href = route;
    };

    const [messages, setMessages] = useState([]);


    const handleConsult = async () => {
        await axios.post("http://localhost:9193/local/add-to-queue", {
            patientId : getUserIdFromLocalStorage(),
            doctorId : assignedDoctorId
        }).then( async (response) => {
            console.log(response);
            if(response.data !== null) {
                await axios.get(`http://localhost:9193/local/size/${response.data.user_id}`)
                    .then( async (response) => {
                        // console.log(response.data == 1);
                        if(response.data == 1) {
                            setFirstMember(true);
                        } else {
                            setIsWaiting(true);
                        }
                    })
                setAssignedDoctorId(response.data.user_id);
            } else {
                let sock = new SockJS('http://localhost:9193/ws-endpoint');
                const stompClient = over(sock);
                await stompClient.connect({}, () => {
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    stompClient.subscribe(waiting, async (message) => {
                        console.log(message);
                        setPosition(parseInt(JSON.parse(message.body).position));
                        setHavePosition(true);
                        if(JSON.parse(message.body).doctorId !== null) {
                            setAssignedDoctorId(JSON.parse(message.body).doctorId);
                        }
                    });
                });
                setIsWaiting(true);
            }
        });
    }

    const quitWaiting = async () => {
        await axios.post("http://localhost:9193/local/cancel-waiting", {
            patientId: getUserIdFromLocalStorage(),
            doctorId: assignedDoctorId
        }).then(async (response) => {
            console.log(response.data);
            if(response.data.toString() === "true") {
                const stompClient = over(new SockJS('http://localhost:9193/ws-endpoint'));
                stompClient.connect({}, async () => {
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    const topic = `/topic/next-id/${assignedDoctorId}`;
                    await stompClient.unsubscribe(waiting);
                    await stompClient.unsubscribe(topic);
                    await stompClient.send("/app/reload-position");
                    alert("You chose not to wait for our Doctor. Please try again after some time.");
                    setIsWaiting(false);
                });
            }
        })
    }

    useEffect(() => {
        if (assignedDoctorId) {
            const initializeWebSocket = () => {
                let sock = new SockJS('http://localhost:9193/ws-endpoint');
                const stompClient = over(sock);
                stompClient.connect({}, () => {
                    setStompClient(stompClient);
                    const topic = `/topic/next-id/${assignedDoctorId}`;
                    const waiting = `/topic/get-position/${getUserIdFromLocalStorage()}`;
                    if(firstMember) {
                        setFirstMember(false);
                        // navigate(`/call/${assignedDoctorId}`);
                        navigate(`/call`, { replace: true, state : {assignedDoctorId} });
                    } else {
                        stompClient.subscribe(waiting, async (message) => {
                            console.log(message);
                            setPosition(parseInt(JSON.parse(message.body).position));
                            setHavePosition(true);
                            if(JSON.parse(message.body).doctorId !== null) {
                                setAssignedDoctorId(JSON.parse(message.body).doctorId);
                            }
                        });
                        stompClient.subscribe(topic, (message) => {
                            console.log(message);
                            if (JSON.parse(message.body).body.body.patientId == getUserIdFromLocalStorage()) {
                                // navigate(`/call/${assignedDoctorId}`);
                                  navigate(`/call`, { replace: true, state : {assignedDoctorId} });
                            }
                            // else {
                            //     setIsWaiting(true);
                            // }
                        });
                        // setIsWaiting(true);
                    }
                });
            };
            initializeWebSocket();
        }

        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, [assignedDoctorId]);

    return (

        <div>
            {isWaiting && (<div id="overlay-waiting">
                <div className="waiting-text-section">
                    <p className="hang-tight-text">HANG TIGHT</p>
                    <p className="waiting-text">You're now in a virtual queue, waiting for our doctor to be free.</p>
                    {!havePosition && <p className="queue-text">Note : Getting your position...</p>}
                    {havePosition && <p className="queue-text">Note : You are currently in position <span className="queue-position">{position.toString().padStart(2, "0")}</span></p>}
                    <img className="queue-image" src={require("../../../images/patient_landing_page/queue.jpg")} alt="queue"/>
                    <button className="quit-waiting" onClick={quitWaiting}>QUIT WAITING</button>
                </div>
            </div>)}
            <div className="image1">
                <div className="image-with-text">
                    <div className="onlyText">
                        Skip the travel!
                        <br/>
                        <h2> Take Online Doctor Consultation</h2>
                        <h4>Private consultation + Video call</h4>
                        <Link to="" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2" onClick={handleConsult}>CONSULT</Link>
                        <HashLink to="/welcome/#pick-a-doctor" className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">PICK A DOCTOR</HashLink>
                    </div>
                    <div></div>
                </div>
            </div>
            <TestingWelcome id="pick-a-doctor"/>
        </div>
    )

}

export default WelcomeHelper;
// export default withTokenExpirationCheck(WelcomeHelper);