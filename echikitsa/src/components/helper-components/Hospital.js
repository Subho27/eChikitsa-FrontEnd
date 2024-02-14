import React from 'react';
import HeaderHelper from "../helper-components/HeaderHelper";
import FooterHelper from "../helper-components/FooterHelper";


const Hospital = () => {

    const handleSeeMoreClick = (route) => {
        console.log("See More clicked");
        window.location.href = route;
    };

    return (


        <div>
            <HeaderHelper/>
            <div className="hospitals" >
                <div className="carousel-container">
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


            {/*=============================================================================================================*/}
            <div className="hospitals" >
                <div className="carousel-container">
                    <div className="doctor_title">
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
            <FooterHelper/>
        </div>
    );
};

export default Hospital;