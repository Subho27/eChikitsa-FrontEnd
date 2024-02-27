import React, { useState } from 'react';
import '../../../css/helper-components/helper-patient/hospital-style.css'
function HospitalHelper () {

    const doctors = [
        {
            id: 1,
            img:require("../../../images/landing_body_img/doctor9.jpg"),
            name: 'Dr. John Smith',
            specialty: 'Cardiology',
            qualifications: 'MD, FACC',
            experience: 15,
            bio: 'Dr. John Smith is a board-certified cardiologist with expertise in treating various heart conditions. He received his medical degree from XYZ University and completed his fellowship in cardiology at ABC Hospital. Dr. Smith is dedicated to providing personalized care to his patients and stays current with the latest advancements in cardiology.',
            languages: ['English', 'Spanish'],
            consultationHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
            consultationFees: '$150 (Initial Consultation), $100 (Follow-up)',
            appointmentAvailability: 'Available for appointments within 24-48 hours',
            patientReviews: 'Excellent bedside manner and thorough explanations. Highly recommended!',
            videoConsultation: true,
            affiliation: 'XYZ Cardiology Clinic',
            contactInfo: 'Phone: (123) 456-7890, Email: drjohnsmith@example.com'
        },
        {
            id: 2,
            name: 'Dr. Jane Doe',
            img:require("../../../images/landing_body_img/doctor8.jpg"),
            specialty: 'Pediatrics',
            qualifications: 'MD, FAAP',
            experience: 10,
            bio: 'Dr. Jane Doe is a pediatrician known for her compassionate care and dedication to children\'s health. She completed her medical training at DEF University and has been practicing pediatric medicine for over a decade. Dr. Doe believes in fostering strong relationships with her young patients and their families.',
            languages: ['English'],
            consultationHours: 'Monday - Friday: 8:00 AM - 4:00 PM',
            consultationFees: '$120 (Initial Consultation), $80 (Follow-up)',
            appointmentAvailability: 'Accepting new patients',
            patientReviews: 'Dr. Doe is wonderful with children and takes the time to address all concerns.',
            videoConsultation: true,
            affiliation: 'ABC Pediatrics Center',
            contactInfo: 'Phone: (456) 789-0123, Email: drjanedoe@example.com'
        }
        // Add more doctors as needed
    ];


    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]); // Select the first doctor by default

    const handleChange = (event) => {
        const selectedDoctorId = parseInt(event.target.value, 10); // Convert value to a number
        console.log(selectedDoctorId)
        const doctor = doctors.find(doctor => doctor.id === selectedDoctorId);
        setSelectedDoctor(doctor);
    };

    return (
        <div>
            <div className="mainDiv">
                <div className="leftDiv">
                    <div className="hospitalName">
                        <p>Sanjeevani Hospital</p>
                    </div>
                    <div className="doctorNames">
                        <select value={selectedDoctor.id} onChange={handleChange} className="selected-doctor">
                            {doctors.map(doctor => (
                                 <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="imageForSmall">
                        <img  className="hospitalImg2" src={selectedDoctor.img} style={{ cursor:'pointer'  }}  alt="Image 2" />
                    </div>
                    <div className="doctorDetails">
                        <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                        <p><strong>Qualifications:</strong> {selectedDoctor.qualifications}</p>
                        <p><strong>Experience:</strong> {selectedDoctor.experience} years</p>
                        <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
                        <p><strong>Languages Spoken:</strong> {selectedDoctor.languages.join(', ')}</p>
                        <p><strong>Contact:</strong> {selectedDoctor.contactInfo}</p>
                    </div>
                    <div><button   className={"Consult-button"} >CONSULT</button></div>
                </div>
                <div className="rightDiv">
                    <div className="hospitalImgdiv">
                        <img  className="hospitalImg" src={selectedDoctor.img} style={{ cursor:'pointer'  }}  alt="Image 2" />
                    </div >
                    <div className="hospitalDetails">
                        <h3>Hospital Details</h3>
                        <p><strong>General Inquiries:</strong> +1-123-456-7890</p>
                        <p><strong>Hospital Name:</strong> Harmony Medical Center</p>
                        <p><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
                        <p><strong>Phone Number:</strong> (555) 123-4567</p>
                        <p><strong>Email:</strong> info@harmonymedicalcenter.com</p>
                        <p><strong>Website:</strong> www.harmonymedicalcenter.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HospitalHelper