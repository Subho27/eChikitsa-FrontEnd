
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/landing_body.css'
import Header from './HeaderHelper'
import Footer from './FooterHelper'

// import '../../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';
// import '../../lib/owlcarousel/assets/owl.carousel.min.css'
import React, { useEffect } from 'react';
 import 'bootstrap/js/src/carousel'
function landing_body() {


    const myStyle = {
        borderColor: 'rgba(256, 256, 256, .3)',

    };
    const aboutClass1 = {
        minHeight: '500px',

    };

    const aboutClass2 = {
        mobjectFit: 'cover',

    };

    const teamStartClass1 = {
        maxWidth: '500px',
        // Add other styles as needed
    };

    const teamStartClass2 = {

        objectFit:'cover',


    };

    const testimonialClass1 = {
        width: '60px',
        height: '60px',
        // Add other styles as needed
    };

    return (
        <div>
            {/*------HEADRE START-------*/}
            <Header></Header>
            {/*------HEADRE END-------*/}
            {/*---------------------*/}
            <div class="container-fluid bg-primary py-5 mb-5 hero-header">
                <div class="container py-5">
                    <div class="row justify-content-start">
                        <div class="col-lg-8 text-center text-lg-start">
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style={myStyle}>Welcome to eChikitsa</h5>
                            <h1 class="display-1 text-white mb-md-4">Best Healthcare Solution</h1>
                            <div class="pt-2">
                                <a href="" class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Doctor</a>
                                <a href="" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Appointment</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* -------------*/}
        {/* --------------About Star--------------*/}
            <div class="container-fluid py-5">
                <div class="container">
                    <div class="row gx-5">
                        <div class="col-lg-5 mb-5 mb-lg-0" style={aboutClass1}>
                            <div class="position-relative h-100">
                                <img class="position-absolute w-100 h-100 rounded"  src={require("../../images/landing_body_img/aboutus.png")} style={aboutClass2} />
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="mb-4">
                                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                                <h1 class="display-4">Welcome to eChikitsa</h1>
                            </div>
                            <p>In a world where time is of the essence, eChikitsa is revolutionizing healthcare with seamless teleconsultations. Experience the future of medical care from the comfort of your own space.</p>
                            <div class="row g-3 pt-3">
                                <div class="col-sm-3 col-6">
                                    <div class="bg-light text-center rounded-circle py-4">
                                        <i class="fa fa-3x fa-user-md text-primary mb-3"></i>
                                        <h6 class="mb-0">Qualified<small class="d-block text-primary">Doctors</small></h6>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-6">
                                    <div class="bg-light text-center rounded-circle py-4">
                                        <i class="fa fa-3x fa-procedures text-primary mb-3"></i>
                                        <h6 class="mb-0">Emergency<small class="d-block text-primary">Services</small></h6>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-6">
                                    <div class="bg-light text-center rounded-circle py-4">
                                        <i class="fa fa-3x fa-microscope text-primary mb-3"></i>
                                        <h6 class="mb-0">Accurate<small class="d-block text-primary">Testing</small></h6>
                                    </div>
                                </div>
                                <div class="col-sm-3 col-6">
                                    <div class="bg-light text-center rounded-circle py-4">
                                        <i class="fa fa-3x fa-ambulance text-primary mb-3"></i>
                                        <h6 class="mb-0">Free<small class="d-block text-primary">Ambulance</small></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/*-------------About End-------------------*/}

        {/*  <!-- Team Start -->  */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={teamStartClass1}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Our Doctors</h5>
                        <h1 className="display-4">Qualified Healthcare Professionals</h1>
                    </div>
                    <div className="owl-carousel team-carousel position-relative">


                        {/*----------------------------------------------------------------------------*/}
                        <div className="team-item">
                            <div className="row g-0 bg-light rounded overflow-hidden">
                                <div className="col-12 col-sm-5 h-100">
                                    <img className="img-fluid h-100 margin-2px" src={require("../../images/landing_body_img/doctor8.jpg")} style={teamStartClass2}/>
                                </div>
                                <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                    <div className="mt-auto p-4">
                                        <h3>NITIN SHARMA</h3>
                                        <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                        <p className="m-0">Dr. Sharma graduated with honors from AIIMS Nagpur, a renowned institution known for producing top-tier medical professionals.</p>
                                    </div>
                                    <div className="d-flex mt-auto border-top p-4">
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*-----------------------------------------------------------------------------*/}
                        <div className="team-item">
                            <div className="row g-0 bg-light rounded overflow-hidden">
                                <div className="col-12 col-sm-5 h-100">
                                    <img className="img-fluid h-100" src={require("../../images/landing_body_img/doctor7.jpg")} style={teamStartClass2} />
                                </div>
                                <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                    <div className="mt-auto p-4">
                                        <h3>SWATI PATIL</h3>
                                        <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                        <p className="m-0">Dr. Patil is a distinguished alumna of the prestigious Johns Hopkins School of Medicine, where she graduated with honors.</p>
                                    </div>
                                    <div className="d-flex mt-auto border-top p-4">
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        {/*   <!-- Team End --> */}




    </div>
    );
}

export default landing_body;