import "../../css/patient_landing.css"
import React, { useState, useEffect } from 'react';
import '../../css/helper-components/header-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'
import Footer from './FooterHelper'
import {Link} from "react-router-dom";
import * as Constant from "../../resources/constant";




function patient_landing(){


    const cardStyles = {

        height: '0%', // Height for desktop view
    };

    const handleSeeMoreClick = (route) => {
        // Define what happens when "See More" is clicked
        console.log("See More clicked");
        window.location.href = route;
        // For example, you can navigate to another page or display a modal
    };







    return (

        <div>
            {/*-------------------------------------END NAV----------------------------------*/}
            <div className="container-fluid py-2 border-bottom d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                            <div className="d-inline-flex align-items-center">
                                <Link className="text-decoration-none text-body pe-3 contact-text-body" to=""><i className="fa fa-phone me-2"></i>{Constant.PHONE_NUMBER_STRING}</Link>
                                <span className="text-body">|</span>
                                <Link className="text-decoration-none text-body px-3 contact-text-body" to=""><i className="fa fa-envelope me-2"></i>{Constant.EMAIL_STRING}</Link>
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-lg-end">
                            <div className="d-inline-flex align-items-center">
                                <Link className="text-body px-2" to="">
                                    <i className="fa fa-facebook"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fa fa-twitter"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fa fa-linkedin"></i>
                                </Link>
                                <Link className="text-body px-2" to="">
                                    <i className="fa fa-instagram"></i>
                                </Link>
                                <Link className="text-body ps-2" to="">
                                    <i className="fa fa-youtube"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid sticky-top bg-white shadow-sm">
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                        <Link to="/" className="navbar-brand">
                            <h1 className="m-0 text-uppercase text-primary full-logo-container">
                                <div className="logo-container">
                                    <img className="logo-photo" src={require("./../../images/Logo/logo-nobg.png")} alt="Logo" />
                                </div>
                                <div className="logo-name">{Constant.APP_NAME_STRING}</div>
                            </h1>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <input className="searchbar" type="text" placeholder="Search.."/>



                        <div className="collapse navbar-collapse" id="navbarCollapse">

                            <div className="navbar-nav ms-auto py-0">



                                <div className="nav-item dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile</Link>
                                    <div className="dropdown-menu m-0">
                                        <Link to="/" className="dropdown-item">My Profile</Link>
                                        <Link to="/" className="dropdown-item">My Appointment</Link>
                                        <Link to="/" className="dropdown-item">My Feedback</Link>
                                        <Link to="/" className="dropdown-item">Update Profile</Link>
                                        <Link to="/" className="dropdown-item">Logout</Link>
                                    </div>
                                </div>
                                {/*<Link to="/" className="nav-item nav-link">{Constant.CONTACT_STRING}</Link>*/}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>


        {/*-------------------------------------END NAV----------------------------------*/}



        {/*-------------------------------------Body Started-------------------------------*/}

            <div className="image1">
                <div className="image-with-text">
                    <div className="onlyText">
                        Skip the travel!
                        <br/>
                        <h2> Take Online Doctor Consultation</h2>
                        <h4>Private consultation + Audio call</h4>

                    </div>
                    <div><button  className="orange-button1" >CONSULT</button></div>

                </div>


            </div>

            {/*-------------------------------------Body END-------------------------------*/}

            {/*-------------------------------------Doctor Start-------------------------------*/}
            <div className="doctors" >
                <div className="carousel-container">
                    <div className="doctor_title">
                        <h2><b>Top Doctors</b></h2>
                        <div className='seeMore' onClick={()=>handleSeeMoreClick('/')}>
                            See More
                        </div>
                    </div>
                    <div className="carousel-wrapper" style={{ height:'10cm'  }}>
                        {/* Your existing doctor cards */}
                        <div className="card" >
                            <img src={require("../../images/landing_body_img/doctor8.jpg")} className="card-img" alt="Image 1" />

                            <div className="card-content" >
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/landing_body_img/doctor11.jpg")} className="card-img" alt="Image 2" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/landing_body_img/doctor10.jpg")} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/landing_body_img/doctor9.jpg")} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>




            {/*-------------------------------------Doctor Start-------------------------------*/}

            {/*-----------------------------------------OUR HOSPITALS START--------------------------*/}

            <div className="hospitals" >
                <div className="carousel-container">
                    <div className="doctor_title">
                        <h2><b>Top Hospitals</b></h2>
                        <div className='seeMore' onClick={()=>handleSeeMoreClick('/')}>
                            See More
                        </div>
                    </div>
                    <div className="carousel-wrapper" style={{ height:'10cm'  }}>
                        {/* Your existing doctor cards */}
                        <div className="card" >
                            <img src={require("../../images/patient_landing_page/Hospital_Img/hospital1.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/hospital')} className="card-img" alt="Image 1" />

                            <div className="card-content" >
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/patient_landing_page/Hospital_Img/hospital2.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/hospital')} className="card-img" alt="Image 2" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/patient_landing_page/Hospital_Img/hospital3.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/hospital')} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../images/patient_landing_page/Hospital_Img/hospital4.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/hospital')} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*-----------------------------------------OUR HOSPITALS END--------------------------*/}





            {/*-------------------------HOW IT WORKS--------------------------------------------------*/}
            <div className="howItWorks">
                <div className="howItWorksText">
                    <h3 > <b>How It Works</b></h3>

                </div>
                <div className="">
                    <img className="howItWorksImg" src={require("./../../images/patient_landing_page/how_it_works.png")} alt="Logo" />
                </div>

            </div>
            {/*-------------------------HOW IT WORKS--------------------------------------------------*/}

            {/* --------------------stats start----------------------------------------------------*/}
            <div className="stats">
                <div className="stats_content">
                    2,00,000+<br/>

                    Happy Users
                </div>
                <div className="stats_content">
                    20,000+<br/>
                    Verified Doctors
                </div>
                <div className="stats_content">
                    25+<br/>
                    Specialities
                </div>
                <div className="stats_content">
                    4.5 / 5<br/>
                    App Rating
                </div>
            </div>

            {/* --------------------stats END----------------------------------------------------*/}

            {/* --------------------Benefits Starts----------------------------------------------------*/}

            <div className="benefits">
                <div className="benefits_title">
                    Benefits of Online Consultation
                </div>
                <div className="benefits_box">
                    <div className="benefits_box_content">
                        <div>
                            <b>Consult Top Doctors 24x7</b>
                            <br/><br/>
                            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</div>
                        <div>
                            <b>Similar Clinic Experience</b>
                            <br/><br/>
                            Experience clinic-like consultation through a video call with the doctor. Video consultation is available only on the Practo app.</div>
                    </div>


                    <div className="benefits_box_content">
                        <div>
                            <b>Convenient and Easy</b>

                            <br/><br/>

                            Start an instant consultation within 2 minutes or do video consultation at the scheduled time.</div>
                        <div>
                            <b>
                                Free Follow-up
                            </b>

                            <br/><br/>

                            Get a valid digital prescription and a 7-day, free follow-up for further clarifications.
                        </div>

                    </div>


                    <div className="benefits_box_content">
                        <div>
                            <b>
                                100% Safe Consultations
                            </b>

                            <br/><br/>

                            Be assured that your online consultation will be fully private and secured.</div>

                    </div>






                </div>
            </div>

            {/* --------------------Benefits Ends----------------------------------------------------*/}



<Footer></Footer>


        </div>
    )

}

export default patient_landing;