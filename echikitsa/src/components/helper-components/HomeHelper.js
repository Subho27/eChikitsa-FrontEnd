import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/helper-components/home-style.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from "./chatbot-component/config/config";
import MessageParser from "./chatbot-component/chatbot/MessageParser";
import ActionProvider from "./chatbot-component/chatbot/ActionProvider";
import Lottie from 'react-lottie';
import animData from '../../images/landing_body_img/Animation - 1714391510494.json'
import axios from "axios";

const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} absolute top-1/2 left-4 z-10 cursor-pointer text-black !important`} style={{ transform: 'translateY(-50%)' }} onClick={onClick}>
            <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} absolute top-1/2 right-4 z-10 cursor-pointer text-black !important`} style={{ transform: 'translateY(-50%)' }} onClick={onClick}>
            <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
        </div>
    );
};

const HomeHelper = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrow: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    const [isChatOpen, setIsChatOpen] = useState(false);

    const [platformStat, setPlatformStat] = useState({});
    const [topFiveDoctors, setTopFiveDoctors] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:8083/echikitsa-backend/admin/get-stat")
            .then((response) => {
                setPlatformStat(response.data);
            })

        axios.get("https://localhost:8083/echikitsa-backend/admin/get-top-five-doctor")
            .then((response) => {
                setTopFiveDoctors(response.data);
            })
    }, []);

    return (
        <div>
            <div className="chat-bot-box">
                {isChatOpen && <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    headerText="Talk to our Chikitsa Bot!"
                />}
                <button className='chat-box-button' onClick={() => setIsChatOpen(!isChatOpen)}>
                    <img className="join-later-image" src={require('../../images/landing_body_img/chatbot.png')} alt="Chat Bot"/>
                </button>
            </div>

            {/*---------------------*/}
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h5 className="d-inline-block text-primary text-white border-style">Welcome to eChikitsa</h5>
                            <h1 className="display-3 text-white mb-md-4">Best Consultation Solution</h1>
                            <div className="pt-2">
                                <Link to="/login" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">LOGIN</Link>
                                <Link to="/signup" className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">SIGNUP</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -------------*/}

            {/* --------------About Star--------------*/}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0 star-height">
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded"  src={require("../../images/landing_body_img/aboutus.png")} alt="aboutus"/>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="mb-4">
                                <h1 className="display-4">Welcome to eChikitsa</h1>
                            </div>
                            <p>eChikitsa is revolutionizing the way people access medical care through its innovative online platform.
                                With eChikitsa, patients have the convenience of consulting with a doctor anytime, anywhere, without the
                                hassle of scheduling appointments. This groundbreaking web application provides seamless access to medical
                                professionals through a simple phone call, bridging the gap between patients and healthcare providers.
                            </p>
                            <p>At the heart of eChikitsa is a commitment to delivering quality healthcare services that prioritize patient
                                convenience and accessibility. Through the platform, users can easily connect with experienced doctors
                                across various specialties, ensuring that they receive expert medical advice tailored to their needs.
                            </p>
                            <div className="row g-3 pt-3">
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-user-md mb-3 icon-color"></i>
                                        <h6 className="mb-0 icon-color">Qualified<small className="d-block text-black">Doctors</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-phone mb-3 icon-color"></i>
                                        <h6 className="mb-0 icon-color">Call<small className="d-block text-black">Anytime</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-stethoscope mb-3 icon-color"></i>
                                        <h6 className="mb-0 icon-color">Hassle-free<small className="d-block text-black">Consultation</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="fa fa-3x fa-download mb-3 icon-color"></i>
                                        <h6 className="mb-0 icon-color">Easy Download<small className="d-block text-black">Prescriptions</small></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*-------------About End----------*/}

            {/*------------Flow Start----------*/}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 teamStartClass1" >
                        <h5 className="d-inline-block icon-color text-uppercase">The Flow</h5>
                        <h1 className="display-5">Easy & hassle-free process</h1>
                    </div>
                    <div className='w-3/4 m-auto'>
                        <div className="mt-20">
                            <img src={require("./../../images/landing_body_img/theflow.png")} alt="the flow" />
                        </div>
                    </div>
                </div>
            </div>
            {/*------------Flow End----------*/}

            {/*------------Stat Start----------*/}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 teamStartClass1" >
                        <h5 className="d-inline-block icon-color text-uppercase">The Statistics</h5>
                        <h1 className="display-5">Service Utilization Insights</h1>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="home-page-stat-section">
                                    <div className='home-stat-image'>
                                        <div className="home-page-stat poppins">{platformStat.totalHospital}</div>
                                        <div className='home-images-section'>
                                            <img className='home-images' src={require("../../images/landing_body_img/hospital.png")} alt="Hospitals"/>
                                        </div>
                                    </div>
                                    <div className='stat-heading poppins'>Total Hospitals</div>
                                    <div className='stat-footing poppins'>Joined us</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="home-page-stat-section">
                                    <div className='home-stat-image'>
                                        <div className="home-page-stat poppins">{platformStat.totalDoctors}</div>
                                        <div className='home-images-section'>
                                            <img className='home-images' src={require("../../images/landing_body_img/doctor.png")} alt="Hospitals"/>
                                        </div>
                                    </div>
                                    <div className='stat-heading poppins'>Total Doctors</div>
                                    <div className='stat-footing poppins'>We have</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="home-page-stat-section">
                                    <div className='home-stat-image'>
                                        <div className="home-page-stat poppins">{platformStat.activeDoctors}</div>
                                        <div className='home-images-section'>
                                            <img className='home-images' src={require("../../images/landing_body_img/doctor.png")} alt="Hospitals"/>
                                            <div className='live-icon'>
                                                <Lottie
                                                    options={{
                                                        loop: true,
                                                        autoplay: true,
                                                        animationData: animData,
                                                        rendererSettings: {
                                                            preserveAspectRatio: "xMidYMid slice"
                                                        }
                                                    }}
                                                    height={30}
                                                    width={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='stat-heading poppins'>Total Doctors</div>
                                    <div className='stat-footing poppins'>Live now</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="home-page-stat-section">
                                    <div className='home-stat-image'>
                                        <div className="home-page-stat poppins">{platformStat.totalConsulation}</div>
                                        <div className='home-images-section'>
                                            <img className='home-images' src={require("../../images/landing_body_img/consultation.png")} alt="Hospitals"/>
                                        </div>
                                    </div>
                                    <div className='stat-heading poppins'>Total Consultations</div>
                                    <div className='stat-footing poppins'>We have accomplished</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*------------Stat End----------*/}

            {/*------------Team Start----------*/}
            <div className="container-fluid py-5">
                <div className="container custom-container">
                    <div className="text-center mx-auto mb-5 teamStartClass1" >
                        <h5 className="d-inline-block icon-color text-uppercase">Our Doctors</h5>
                        <h1 className="display-5">Qualified Healthcare Professionals</h1>
                    </div>
                    <div className='w-3/4 m-auto'>
                        <div className="mt-20">
                            <Slider {...settings}>
                                {topFiveDoctors && topFiveDoctors.length>0 && topFiveDoctors.map((d, index) => (
                                    <div key={index} className="bg-white h-[300px] text-black rounded-xl text-center">
                                        <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                                            <img src={d.img_url} alt="" className="h-44 w-44 rounded-full border-rounded"/>
                                        </div>

                                        <div className="flex flex-col items-center justify-center gap-4 p-4">
                                            <p className="text-xl font-weight-bold poppins">{"Dr. " + d.firstName + " " + d.lastName}</p>
                                            <p className="text-xl font-semibold">{d.specialization}</p>
                                            <p style={{ fontStyle:"italic", fontSize:"10", opacity:"0.5" }}>{"\"Dr. " + d.lastName + reviewData[index] +"\""}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            {/*------------Team End----------*/}
        </div>
    );
}

const reviewData = [
    "'s compassion and expertise truly shine through in her practice. She made my child feel at ease during every visit and took the time to thoroughly explain everything. Her dedication to her young patients is evident, and I couldn't be more grateful for her exceptional care.",
    "'s knowledge and professionalism are unparalleled. He took the time to listen to my concerns and provided me with clear explanations and guidance every step of the way. His attention to detail and commitment to his patients' well-being are truly commendable. I highly recommend him to anyone in need of cardiac care.",
    "'s expertise and empathy made a difficult journey more manageable for me and my family. She approached my treatment plan with a combination of skill and compassion, ensuring that I understood all my options and felt supported throughout. Her dedication to her patients is truly inspiring, and I am deeply grateful for her exceptional care.",
    "'s expertise and dedication to his field are truly remarkable. He took the time to thoroughly evaluate my condition, answer all my questions, and develop a personalized treatment plan that has greatly improved my quality of life. His professionalism and genuine concern for his patients' well-being are evident in every interaction. I highly recommend him to anyone in need of neurological care.",
    "'s warmth and expertise made my pregnancy journey a positive and empowering experience. She took the time to address all my concerns, provide thorough explanations, and ensure that I felt supported every step of the way. Her compassionate care and dedication to her patients' health and well-being are truly commendable. I cannot recommend her highly enough to expectant mothers seeking exceptional obstetric care."
];

export default HomeHelper;