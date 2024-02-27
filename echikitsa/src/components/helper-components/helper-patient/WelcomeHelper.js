import React from 'react';
import '../../../css/helper-components/header-style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'
import "../../../css/helper-components/helper-patient/welcome-style.css"
import {Link} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import TestingWelcome from "./TestingWelcome";

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
                        <h4>Private consultation + Video call</h4>
                        <Link to="/call" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">CONSULT</Link>
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