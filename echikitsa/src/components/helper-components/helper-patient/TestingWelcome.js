import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-patient/testing-welcome.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TestingWelcome() {
    const [query, setQuery] = useState("");
    const [doctorQuery, setDoctorQuery] = useState("");
    const [locations, setLocations] = useState([]);
    const [specialisations, setSpecialisations] = useState([]);
    const [srDoctor, setSrDoctors] = useState([
        "0 - 10", "11 - 20", "21 - 30", "31 - 40", "40 - 50", "50+"
    ]);
    const [ratings, setRatings] = useState([
        1, 2, 3, 4, 5
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage, setHospitalsPerPage] = useState(9);
    const [hospitalData,setHospitalData] = useState([])

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedSrDoctor, setSelectedSrDoctor] = useState([]);


    const navigate = useNavigate();
    const handleHospitalTabClick = (id) => {

         navigate("/hospital",{state:{
             hospital_ids:id}
         });

    };
    // const handleHospitalTabClick = (hospital_id) => {
    //     // Navigate to another page
    //     navigate("/hospital",{ state: { hospital_id } });
    // };

    //region Filter Hospital Data
    useEffect(() => {
        const getHospitalDetails = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8081/hospital/get-hospitals-landing"
                );
                setHospitalData(response.data);
                 //console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getHospitalDetails();
    }, []);
    const handleLocationCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedLocations = [...selectedLocations];

        if (checked) {
            updatedLocations.push(value);
        } else {
            updatedLocations = updatedLocations.filter(location => location !== value);
        }

        setSelectedLocations(updatedLocations);
        filterHospitals(updatedLocations, selectedSpecialisations, selectedRatings, selectedSrDoctor);
    };
    const handleSpecialisationCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedSpecialisations = [...selectedSpecialisations];

        if (checked) {
            updatedSpecialisations.push(value);
        } else {
            updatedSpecialisations = updatedSpecialisations.filter(specialisation => specialisation !== value);
        }

        setSelectedSpecialisations(updatedSpecialisations);
        filterHospitals(selectedLocations, updatedSpecialisations, selectedRatings, selectedSrDoctor);
    };
    const handleRatingsCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedRatings = [...selectedRatings];

        if (checked) {
            updatedRatings.push(Number(value));
        } else {
            updatedRatings = updatedRatings.filter(rating => rating !== Number(value));
        }

        setSelectedRatings(updatedRatings);
        filterHospitals(selectedLocations, selectedSpecialisations, updatedRatings, selectedSrDoctor);
    };
    const handleSrDoctorCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updateSrDoctor = [...selectedSrDoctor];

        if (checked) {
            updateSrDoctor.push(value);
        } else {
            updateSrDoctor = updateSrDoctor.filter(rating => rating !== value);
        }

        setSelectedSrDoctor(updateSrDoctor);
        filterHospitals(selectedLocations, selectedSpecialisations, selectedRatings, updateSrDoctor);
    };

    const filterHospitals = (selectedLocations, selectedSpecialisations, selectedRatings, selectedSrDoctor) => {
        let gotHospitals = hospitalData.filter(hospital => {
            return selectedLocations.length === 0 || selectedLocations.includes(hospital.location);
        });
        gotHospitals = gotHospitals.filter(hospital => {
            return selectedSpecialisations.length === 0 || selectedSpecialisations.every(specialisation =>
                hospital.specialisations.includes(specialisation)
            );
        });
        gotHospitals = gotHospitals.filter(hospital => {
            return selectedRatings.length === 0 || selectedRatings.some(rating =>
                hospital.rating <= rating && hospital.rating > rating - 1
            );
        });
        gotHospitals = gotHospitals.filter(hospital => {
            return selectedSrDoctor.length === 0 || selectedSrDoctor.some(function(numRange) {
                let lower = 0, upper = Number.MAX_VALUE;
                if(numRange.includes('+')) {
                    lower = 51; upper = Number.MAX_VALUE;
                }
                else {
                    const [lowerBound, upperBound] = numRange.split('-').map(str => str.trim());
                    lower = parseInt(lowerBound, 10);
                    upper = parseInt(upperBound, 10);
                }
                return hospital.num_senior_doctors >= lower && hospital.num_senior_doctors <= upper;
            });
        });
        setFilteredHospitals(gotHospitals);
    };
    //endregion

    //region UseEffect Hook
    useEffect(() => {
        if (hospitalData.length > 0) {
            const uniqueLocations = [...new Set(hospitalData.map(hospital => hospital.location))].sort();
            setLocations(uniqueLocations);
            setFilteredHospitals(hospitalData);

            const uniqueSpecializations = Array.from(new Set(hospitalData.flatMap(hospital => hospital.specialisations))).sort();
            setSpecialisations(uniqueSpecializations);
        }

    }, [hospitalData]);

    useEffect(() => {
        if(query === "") {
            setFilteredHospitals(hospitalData);
        }
        else {
            const gotHospitals = hospitalData.filter(hospital =>
                hospital.hospital_name.toLowerCase().includes(query)
            );
            setFilteredHospitals(gotHospitals);
        }
    }, [query])

    useEffect(() => {
        if(doctorQuery === "") {
            setFilteredHospitals(hospitalData);
        }
        else {
            const gotHospitals = hospitalData.filter(hospital =>
                hospital.doctors.some(doctor =>
                    doctor.toLowerCase().includes(doctorQuery)
                )
            );
            setFilteredHospitals(gotHospitals);
        }
    }, [doctorQuery])
    //endregion

    //region Pagination
    const indexOfLastPost = currentPage * hospitalsPerPage;
    const indexOfFirstPost = indexOfLastPost - hospitalsPerPage;
    const currentPosts = filteredHospitals.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = filteredHospitals.length;
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / hospitalsPerPage); i++) {
        pageNumbers.push(i);
    }



    // useEffect(() => {
    //     // Check if hospitalData is populated before setting filteredHospitals
    //     if (hospitalData.length > 0) {
    //         setFilteredHospitals(hospitalData);
    //     }
    // }, [hospitalData]);


    //endregion

    return (
        <div>
            <div className="testing-section" id="pick-a-doctor">
                <div className="filter-options">
                    <div className="filter-text">
                        <h4>Filter Here...</h4>
                    </div>
                    <div className="filter-text">
                        <div className="filter-title">Filter by Location</div>
                        <div className="location-section">
                            {locations.map((location, index) => (
                                <div key={index} className="hospital-location">
                                    <input type="checkbox" id={`location_${index}`} value={location} className="location-checkbox" onChange={handleLocationCheckboxChange}  checked={selectedLocations.includes(location)}/>
                                    <span>{location}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-text">
                        <div className="filter-title">Filter by Specialisation</div>
                        <div className="location-section">
                            {specialisations.map((specialisation, index) => (
                                <div key={index} className="hospital-location">
                                    <input type="checkbox" id={`specialisation_${index}`} value={specialisation} className="location-checkbox" onChange={handleSpecialisationCheckboxChange}  checked={selectedSpecialisations.includes(specialisation)}/>
                                    <span>{specialisation}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-text">
                        <div className="filter-title">Filter by Rating</div>
                        <div className="rating-section">
                            {ratings.map((rate, index) => (
                                <div key={index} className="hospital-location">
                                    <input type="checkbox" id={`rating_${index}`} value={rate} className="location-checkbox" onChange={handleRatingsCheckboxChange} checked={selectedRatings.includes(rate)}/>
                                    <div className="stars-rating">
                                        {[...Array(rate)].map((_, i) => (
                                            <span key={i} className="fa fa-star checked custom-star" style={{ color: "gold" }}></span>
                                        ))}
                                        {[...Array(5 - rate)].map((_, i) => (
                                            <span key={i + rate} className="fa fa-star custom-star" style={{ color: "darkgray" }}></span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-text">
                        <div className="filter-title">Filter by Number of Senior doctors</div>
                        <div className="rating-section">
                            {srDoctor.map((srd, index) => (
                                <div key={index} className="hospital-location">
                                    <input type="checkbox" id={`srd_${index}`} value={srd} className="location-checkbox" onChange={handleSrDoctorCheckboxChange} checked={selectedSrDoctor.includes(srd)}/>
                                    <span>{srd}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hospital-list">
                    <div className="search-section">
                        <div className="search-hospital">
                            <input type="text" placeholder="Search Hospitals here..." className="search-field-hospital" onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                        </div>
                        <div className="search-doctor">
                            <input type="text" placeholder="Search Doctors here..." className="search-field-doctor" onChange={(e) => setDoctorQuery(e.target.value.toLowerCase())}/>
                        </div>
                    </div>
                    <div className="list-of-hospital">
                        {currentPosts.map((hospital, index) => (
                            <div key={index} className="hospital-tab" onClick={()=>handleHospitalTabClick(hospital.hospital_id)}>
                                <div className="image-container">
                                    <img className="hospital-image" src={hospital.image_path} alt="Hospital"/>
                                    <div className="rating-container">{hospital.rating.toFixed(1)}</div>
                                </div>
                                <div className="hospital-name">{hospital.hospital_name}</div>
                                <div className="location-of-hospital"><i className="fa fa-location-arrow"></i> {hospital.location}</div>
                                <div className="specialisation-of-hospital"><i className="fa fa-medkit"></i> {hospital.specialisations.join(', ')}</div>
                            </div>
                        ))}
                    </div>
                    <nav>
                        <ul className='pagination custom-pagination'>
                            {pageNumbers.map(number => (
                                <li key={number} className='page-item'>
                                    <span onClick={() => paginate(number)} className='page-link'>
                                        {number}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

// const hospitalData = [
//     {
//         "hospital_name": "City General Hospital",
//         "image_path": "images/city_general_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.2,
//         "specialisations": ["General Medicine", "Pediatrics"],
//         "num_senior_doctors": 8,
//         "doctors": ["Dr. Amit", "Dr. Arup"]
//     },
//     {
//         "hospital_name": "Sunset Memorial Hospital",
//         "image_path": "images/sunset_memorial_hospital.jpg",
//         "location": "Delhi, India",
//         "rating": 3.8,
//         "specialisations": ["Emergency Medicine", "Surgery"],
//         "num_senior_doctors": 12,
//         "doctors": ["Dr. Bishnoy", "Dr. Vohra"]
//     },
//     {
//         "hospital_name": "Lakeview Regional Medical Center",
//         "image_path": "images/lakeview_medical_center.jpg",
//         "location": "Bengaluru, Karnataka, India",
//         "rating": 4.8,
//         "specialisations": ["Orthopedics", "Neurology"],
//         "num_senior_doctors": 10,
//         "doctors": ["Dr. Tyagi", "Dr. Tejaswa"]
//     },
//     {
//         "hospital_name": "Mountain View Hospital",
//         "image_path": "images/mountain_view_hospital.jpg",
//         "location": "Chennai, Tamil Nadu, India",
//         "rating": 4.0,
//         "specialisations": ["Cardiology", "Oncology"],
//         "num_senior_doctors": 9,
//         "doctors": ["Dr. Kulkarni", "Dr. Roy"]
//     },
//     {
//         "hospital_name": "Riverside Community Hospital",
//         "image_path": "images/riverside_hospital.jpg",
//         "location": "Kolkata, West Bengal, India",
//         "rating": 4.3,
//         "specialisations": ["Neurology", "Psychiatry"],
//         "num_senior_doctors": 11,
//         "doctors": ["Dr. Bijay", "Dr. Mohan"]
//     },
//     {
//         "hospital_name": "Green Valley Medical Center",
//         "image_path": "images/green_valley_medical_center.jpg",
//         "location": "Hyderabad, Telangana, India",
//         "rating": 4.7,
//         "specialisations": ["Pediatrics", "Obstetrics and Gynecology"],
//         "num_senior_doctors": 7,
//         "doctors": ["Dr. Kolha", "Dr. Gayatri"]
//     },
//     {
//         "hospital_name": "Harborview Hospital",
//         "image_path": "images/harborview_hospital.jpg",
//         "location": "Pune, Maharashtra, India",
//         "rating": 4.4,
//         "specialisations": ["Surgery", "Dermatology"],
//         "num_senior_doctors": 15,
//         "doctors": ["Dr. Jacob", "Dr. Sinha"]
//     },
//     {
//         "hospital_name": "Meadowbrook Clinic",
//         "image_path": "images/meadowbrook_clinic.jpg",
//         "location": "Jaipur, Rajasthan, India",
//         "rating": 4.6,
//         "specialisations": ["Oncology", "Endocrinology"],
//         "num_senior_doctors": 6,
//         "doctors": ["Dr. Batra", "Dr. Das"]
//     },
//     {
//         "hospital_name": "Pinecrest Medical Center",
//         "image_path": "images/pinecrest_medical_center.jpg",
//         "location": "Ahmedabad, Gujarat, India",
//         "rating": 2.7,
//         "specialisations": ["Obstetrics and Gynecology", "Urology"],
//         "num_senior_doctors": 10,
//         "doctors": ["Dr. Rudra", "Dr. Chandel"]
//     },
//     {
//         "hospital_name": "Bayfront Health",
//         "image_path": "images/bayfront_health.jpg",
//         "location": "Lucknow, Uttar Pradesh, India",
//         "rating": 4.0,
//         "specialisations": ["Dermatology", "Radiology"],
//         "num_senior_doctors": 8,
//         "doctors": ["Dr. Subedi", "Dr. Gidd"]
//     },
//     {
//         "hospital_name": "Apollo Hospital",
//         "image_path": "images/apollo_hospital.jpg",
//         "location": "Chennai, Tamil Nadu, India",
//         "rating": 4.7,
//         "specialisations": ["Cardiology", "Orthopedics"],
//         "num_senior_doctors": 25,
//         "doctors": ["Dr. Pal", "Dr. Ahmed"]
//     },
//     {
//         "hospital_name": "Fortis Hospital",
//         "image_path": "images/fortis_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.5,
//         "specialisations": ["Neurology", "Urology"],
//         "num_senior_doctors": 20,
//         "doctors": ["Dr. Rahul", "Dr. Kothari"]
//     },
//     {
//         "hospital_name": "Max Hospital",
//         "image_path": "images/max_hospital.jpg",
//         "location": "Delhi, India",
//         "rating": 4.8,
//         "specialisations": ["Oncology", "Cardiac Surgery"],
//         "num_senior_doctors": 18,
//         "doctors": ["Dr. Pandey", "Dr. Gain"]
//     },
//     {
//         "hospital_name": "AIIMS",
//         "image_path": "images/aiims.jpg",
//         "location": "New Delhi, India",
//         "rating": 3.9,
//         "specialisations": ["General Medicine", "Pediatrics"],
//         "num_senior_doctors": 30,
//         "doctors": ["Dr. Mehra", "Dr. Awasthi"]
//     },
//     {
//         "hospital_name": "Narayana Health",
//         "image_path": "images/narayana_health.jpg",
//         "location": "Bengaluru, Karnataka, India",
//         "rating": 4.6,
//         "specialisations": ["Cardiology", "Nephrology"],
//         "num_senior_doctors": 22,
//         "doctors": ["Dr. Gupta", "Dr. Banerjee"]
//     },
//     {
//         "hospital_name": "Manipal Hospital",
//         "image_path": "images/manipal_hospital.jpg",
//         "location": "Manipal, Karnataka, India",
//         "rating": 4.4,
//         "specialisations": ["Oncology", "Orthopedics"],
//         "num_senior_doctors": 17,
//         "doctors": ["Dr. Mukherjee", "Dr. Putra"]
//     },
//     {
//         "hospital_name": "Columbia Asia Hospital",
//         "image_path": "images/columbia_asia_hospital.jpg",
//         "location": "Bengaluru, Karnataka, India",
//         "rating": 4.3,
//         "specialisations": ["Neurology", "ENT"],
//         "num_senior_doctors": 16,
//         "doctors": ["Dr. Raj", "Dr. Rajeev"]
//     },
//     {
//         "hospital_name": "Kokilaben Dhirubhai Ambani Hospital",
//         "image_path": "images/kokilaben_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.9,
//         "specialisations": ["Oncology", "Neurosurgery"],
//         "num_senior_doctors": 21,
//         "doctors": ["Dr. Hiran", "Dr. Jiya"]
//     },
//     {
//         "hospital_name": "Sri Ramachandra Medical Centre",
//         "image_path": "images/sri_ramachandra_medical_centre.jpg",
//         "location": "Chennai, Tamil Nadu, India",
//         "rating": 2.7,
//         "specialisations": ["Cardiology", "Gastroenterology"],
//         "num_senior_doctors": 19,
//         "doctors": ["Dr. Ranveer", "Dr. Ronaldo"]
//     },
//     {
//         "hospital_name": "Aster Medcity",
//         "image_path": "images/aster_medcity.jpg",
//         "location": "Kochi, Kerala, India",
//         "rating": 4.7,
//         "specialisations": ["Cardiac Surgery", "Oncology"],
//         "num_senior_doctors": 23,
//         "doctors": ["Dr. Messi", "Dr. Kohli"]
//     },
//     {
//         "hospital_name": "Medanta - The Medicity",
//         "image_path": "images/medanta_hospital.jpg",
//         "location": "Gurugram, Haryana, India",
//         "rating": 4.8,
//         "specialisations": ["Cardiology", "Orthopedics"],
//         "num_senior_doctors": 24,
//         "doctors": ["Dr. Neymar", "Dr. Sharma"]
//     },
//     {
//         "hospital_name": "Artemis Hospital",
//         "image_path": "images/artemis_hospital.jpg",
//         "location": "Gurugram, Haryana, India",
//         "rating": 4.6,
//         "specialisations": ["Neurology", "Oncology"],
//         "num_senior_doctors": 18,
//         "doctors": ["Dr. Tendulkar", "Dr. Ganguly"]
//     },
//     {
//         "hospital_name": "Asian Institute of Medical Sciences",
//         "image_path": "images/asian_institute_of_medical_sciences.jpg",
//         "location": "Faridabad, Haryana, India",
//         "rating": 1.6,
//         "specialisations": ["Orthopedics", "Cardiology"],
//         "num_senior_doctors": 15,
//         "doctors": ["Dr. Sehwag", "Dr. Laxman"]
//     },
//     {
//         "hospital_name": "Sir Ganga Ram Hospital",
//         "image_path": "images/sir_ganga_ram_hospital.jpg",
//         "location": "Delhi, India",
//         "rating": 4.7,
//         "specialisations": ["Cardiology", "Gastroenterology"],
//         "num_senior_doctors": 20,
//         "doctors": ["Dr. Chhetri", "Dr. Lalpekhula"]
//     },
//     {
//         "hospital_name": "Indraprastha Apollo Hospitals",
//         "image_path": "images/indraprastha_apollo_hospitals.jpg",
//         "location": "Delhi, India",
//         "rating": 4.8,
//         "specialisations": ["Neurology", "Oncology"],
//         "num_senior_doctors": 22,
//         "doctors": ["Dr. Jhingan", "Dr. Bhutiya"]
//     },
//     {
//         "hospital_name": "Yashoda Hospitals",
//         "image_path": "images/yashoda_hospitals.jpg",
//         "location": "Hyderabad, Telangana, India",
//         "rating": 4.5,
//         "specialisations": ["Cardiology", "Orthopedics"],
//         "num_senior_doctors": 19,
//         "doctors": ["Dr. Shami", "Dr. Bumrah"]
//     },
//     {
//         "hospital_name": "Nanavati Super Speciality Hospital",
//         "image_path": "images/nanavati_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.9,
//         "specialisations": ["Orthopedics", "Neurology"],
//         "num_senior_doctors": 23,
//         "doctors": ["Dr. Siraj", "Dr. Gill"]
//     },
//     {
//         "hospital_name": "Wockhardt Hospital",
//         "image_path": "images/wockhardt_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.6,
//         "specialisations": ["Cardiac Surgery", "Oncology"],
//         "num_senior_doctors": 18,
//         "doctors": ["Dr. Iyer", "Dr. Dhoni"]
//     },
//     {
//         "hospital_name": "Batra Hospital & Medical Research Centre",
//         "image_path": "images/batra_hospital.jpg",
//         "location": "Delhi, India",
//         "rating": 4.5,
//         "specialisations": ["General Medicine", "Gastroenterology"],
//         "num_senior_doctors": 21,
//         "doctors": ["Dr. Kroos", "Dr. Modric"]
//     },
//     {
//         "hospital_name": "Lilavati Hospital and Research Centre",
//         "image_path": "images/lilavati_hospital.jpg",
//         "location": "Mumbai, Maharashtra, India",
//         "rating": 4.8,
//         "specialisations": ["Cardiology", "Neurology"],
//         "num_senior_doctors": 24,
//         "doctors": ["Dr. Ramos", "Dr. Pan"]
//     }
// ]

export default TestingWelcome;