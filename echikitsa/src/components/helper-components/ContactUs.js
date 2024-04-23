import '../../css/helper-components/contact-us.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactUs() {
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle form submission, for example, send data to an API
        console.log(formData);
        try {

            const response = await axios.post('https://localhost:8083/user-handle/auth/contact-us', formData);
            alert(response.data)
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Please try again.');
            alert('An error occurred. Please try again.')
        }

    };

    return(
        <div>

            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="wrapper">
                                <div className="row no-gutters">
                                    <div className="col-md-7 d-flex align-items-stretch">
                                        <div className="contact-wrap w-100 p-md-5 p-4">
                                            <h3 className="mb-4">Get in touch</h3>
                                            <div id="form-message-warning" className="mb-4"></div>
                                            <form  id="contactForm" name="contactForm">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="name"
                                                                id="name"
                                                                placeholder="Name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                id="email"
                                                                placeholder="Email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="subject"
                                                                id="subject"
                                                                placeholder="Subject"
                                                                value={formData.subject}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                        <textarea
                            name="message"
                            className="form-control"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input

                                                                onClick={handleSubmit}
                                                                value="Send Message"
                                                                className="btn btn-primary"
                                                            />
                                                            <div className="submitting"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 d-flex align-items-stretch">
                                        <div className="info-wrap bg-primary w-100 p-lg-5 p-4">
                                            <h3 className="mb-4 mt-md-4">Contact us</h3>
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="fa fa-map-marker"></span>
                                                </div>
                                                <div className="text-xx">
                                                    <p><span>Address:</span>  Shanders Alta Vista, Veer Sandra, Electronic City, Bengaluru, Karnataka 560100</p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="fa fa-phone"></span>
                                                </div>
                                                <div className="text-xx">
                                                    <p><span>Phone:</span>+91 7014717219</p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="fa fa-paper-plane"></span>
                                                </div>
                                                <div className="text-xx">
                                                    <p><span>Email:</span> eChikitsaapp@gmail.com</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default ContactUs;