import React, {useEffect, useState} from 'react';
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import "../../../css/helper-components/helper-patient/welcome-style.css"
import '../../../css/helper-components/header-style.css'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {Link, useNavigate} from "react-router-dom";
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
            console.log(response.data);
            await axios.get(`http://localhost:9193/local/size/${response.data.user_id}`)
            .then( async (response) => {
                console.log(response.data == 1);
                if(response.data == 1) {
                    setFirstMember(true);
                }
            })
            setAssignedDoctorId(response.data.user_id);
        });
    }

    useEffect(() => {
        if (assignedDoctorId) {
            const initializeWebSocket = () => {
                let sock = new SockJS('http://localhost:9193/ws-endpoint');
                const stompClient = over(sock);
                stompClient.connect({}, () => {
                    setStompClient(stompClient);
                    const topic = `/topic/next-id/${assignedDoctorId}`;
                    if(firstMember) {
                        setFirstMember(false);
                        navigate(`/call/${assignedDoctorId}`);
                    }
                    else {
                        stompClient.subscribe(topic, (message) => {
                            console.log(message);
                            if (JSON.parse(message.body).body.body.patientId == getUserIdFromLocalStorage()) {
                                navigate(`/call/${assignedDoctorId}`);
                            } else {
                                console.log("Tera turn nhi aya");
                            }
                        });
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