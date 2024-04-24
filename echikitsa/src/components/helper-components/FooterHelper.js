import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '../../css/helper-components/footer-style.css'
import * as Constant from '../../resources/constant.js';
import {Link} from "react-router-dom";

function FooterHelper () {
    return (
        <div className="footer">
            <div className="container">
                <div className="row text-center">
                    <div className="col-lg-12 col-sm-12 col-xs-12">
                        <div className="footer_menu">
                            <ul>
                                <li><Link to="/" className="navigate-links" >{Constant.HOME_STRING}</Link></li>
                                <li><Link to="/" className="navigate-links" >{Constant.ABOUT_STRING}</Link></li>
                                <li><Link to="/ContactUs" className="navigate-links" >{Constant.CONTACT_STRING}</Link></li>
                                <li><Link to="/" className="navigate-links" >{Constant.POLICY_STRING}</Link></li>
                            </ul>
                        </div>
                        <div className="footer_copyright">
                            <p>{Constant.COPYRIGHT_STRING}</p>
                        </div>
                        <div className="footer_profile">
                            <ul>
                                <li><Link to="/" className="external-links" ><i className="fa fa-facebook"/></Link></li>
                                <li><Link to="/" className="external-links" ><i className="fa fa-twitter"/></Link></li>
                                <li><Link to="/" className="external-links" ><i className="fa fa-instagram"/></Link></li>
                                <li><Link to="/" className="external-links" ><i className="fa fa-pinterest"/></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterHelper;