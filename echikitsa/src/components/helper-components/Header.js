import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'
import * as Constant from '../../resources/constant.js';
import '../../css/helper-components/header-style.css'
import {Link} from "react-router-dom";

function Header () {
    return (
        <div>
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
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <Link to="/" className="nav-item nav-link active">{Constant.HOME_STRING}</Link>
                                <Link to="/" className="nav-item nav-link">{Constant.ABOUT_STRING}</Link>
                                <Link to="/" className="nav-item nav-link">{Constant.SERVICES_STRING}</Link>
                                <Link to="/" className="nav-item nav-link">{Constant.WORKS_STRING}</Link>
                                <div className="nav-item dropdown">
                                    <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu m-0">
                                        <Link to="/" className="dropdown-item">Blog Grid</Link>
                                        <Link to="/" className="dropdown-item">Blog Detail</Link>
                                        <Link to="/" className="dropdown-item">The Team</Link>
                                        <Link to="/" className="dropdown-item">Testimonial</Link>
                                        <Link to="/" className="dropdown-item">Appointment</Link>
                                        <Link to="/" className="dropdown-item">Search</Link>
                                    </div>
                                </div>
                                <Link to="/" className="nav-item nav-link">{Constant.CONTACT_STRING}</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;