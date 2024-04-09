import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/helper-components/home-style.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

function homeHelper() {

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

    return (
        <div>
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
                                {data.map((d) => (
                                    <div key={d.name} className="bg-white h-[300px] text-black rounded-xl">
                                        <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                                            <img src={require("./../../images/landing_body_img/"+d.img)} alt="" className="h-44 w-44 rounded-full border-rounded"/>
                                        </div>

                                        <div className="flex flex-col items-center justify-center gap-4 p-4">
                                            <p className="text-xl font-semibold">{d.name}</p>
                                            <p className="text-xl font-semibold">{d.spec}</p>
                                            <p className="">{d.review}</p>
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

const data = [
    {
        name: `NITIN SHARMA`,
        img: "doctor6.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Sharma graduated with honors from AIIMS Nagpur, a renowned institution known for producing top-tier medical professionals.`
    },
    {
        name: `SWATI PATIL`,
        img: "doctor7.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Patil is a distinguished alumna of the prestigious Johns Hopkins School of Medicine, where she graduated with honors.`
    },
    {
        name: `NITIN SHARMA`,
        img: "doctor6.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Sharma graduated with honors from AIIMS Nagpur, a renowned institution known for producing top-tier medical professionals.`
    },
    {
        name: `SWATI PATIL`,
        img: "doctor7.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Patil is a distinguished alumna of the prestigious Johns Hopkins School of Medicine, where she graduated with honors.`
    },
    {
        name: `NITIN SHARMA`,
        img: "doctor6.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Sharma graduated with honors from AIIMS Nagpur, a renowned institution known for producing top-tier medical professionals.`
    },
    {
        name: `SWATI PATIL`,
        img: "doctor7.jpg",
        spec: `Cardiology Specialist`,
        review: `Dr. Patil is a distinguished alumna of the prestigious Johns Hopkins School of Medicine, where she graduated with honors.`
    },

];

export default homeHelper;