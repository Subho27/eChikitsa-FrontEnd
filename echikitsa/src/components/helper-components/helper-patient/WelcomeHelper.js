import React from 'react';
import '../../../css/helper-components/header-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'
import "../../../css/helper-components/helper-patient/welcome-style.css"

function WelcomeHelper(){

    const handleSeeMoreClick = (route) => {
        console.log("See More clicked");
        window.location.href = route;
    };

    return (

        <div>
            <div className="image1">
                <div className="image-with-text">
                    <div className="onlyText">
                        Skip the travel!
                        <br/>
                        <h2> Take Online Doctor Consultation</h2>
                        <h4>Private consultation + Audio call</h4>
                    </div>
                    <div><button   className={"orange-button1"} >CONSULT</button></div>
                </div>
            </div>
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
                            <img src={require("../../../images/landing_body_img/doctor8.jpg")} className="card-img" alt="Image 1" />

                            <div className="card-content" >
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/landing_body_img/doctor11.jpg")} className="card-img" alt="Image 2" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/landing_body_img/doctor10.jpg")} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/landing_body_img/doctor9.jpg")} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Doctor Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="hospitals" >
                <div className="carousel-container">
                    <div className="doctor_title">
                        <h2><b>Top Hospitals</b></h2>
                        <div className='seeMore' onClick={()=>handleSeeMoreClick('/Hospitals')}>
                            See More
                        </div>
                    </div>
                    <div className="carousel-wrapper" style={{ height:'10cm'  }}>
                        {/* Your existing doctor cards */}
                        <div className="card" >
                            <img src={require("../../../images/patient_landing_page/Hospital_Img/hospital1.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/Hospitaldetailing')} className="card-img" alt="Image 1" />

                            <div className="card-content" >
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/patient_landing_page/Hospital_Img/hospital2.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/Hospitaldetailing')} className="card-img" alt="Image 2" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/patient_landing_page/Hospital_Img/hospital3.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/Hospitaldetailing')} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={require("../../../images/patient_landing_page/Hospital_Img/hospital4.jpg")} style={{ cursor:'pointer'  }} onClick={()=>handleSeeMoreClick('/hospital')} className="card-img" alt="Image 3" />
                            <div className="card-content">
                                <h2 className="card-title">Hospital Name</h2>
                                <p className="card-text"></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="howItWorks">
                <div className="howItWorksText">
                    <h3 > <b>How It Works</b></h3>

                </div>
                <div className="">
                    <img className="howItWorksImg" src={require("./../../../images/landing_body_img/theflow.png")} alt="the flow" />
                </div>

            </div>
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
        </div>
    )

}

export default WelcomeHelper;