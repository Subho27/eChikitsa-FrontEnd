import React, {useEffect, useState} from "react";
import "../../../css/helper-components/helper-patient/testing-welcome.css"
import {useLocation, useNavigate} from "react-router-dom";
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
    const {state}=useLocation();
   // console.log(state.user_id)
    const handleHospitalTabClick = (id) => {

         navigate("/hospital",{state:{
             hospital_ids:id}
         });

    };

    useEffect(() => {
        const getHospitalDetails = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8081/hospital/get-hospitals-landing"
                );
                console.log(response.data)
                setHospitalData(response.data);
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
                                <div className="specialisation-of-hospital"><i className="fa fa-medkit"></i> {hospital.specialisations.slice(0, 3).join(', ')}</div>
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

export default TestingWelcome;