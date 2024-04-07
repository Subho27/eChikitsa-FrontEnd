import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../../css/helper-components/helper-doctor/dashboard-style.css"
import Chart from "chart.js/auto"
import {Rating} from "react-simple-star-rating";
import axios from "axios";
import {getUserIdFromLocalStorage} from "../../../resources/userIdManagement";
import {useNavigate} from "react-router-dom";

function DashboardHelper() {
    const [rating, setRating] = useState(0)
    const [patient, setPatient] = useState(0)
    const [fiveStar, setFiveStar] = useState(totalFiveStar/totalPatient)
    const [fourStar, setFourStar] = useState(totalFourStar/totalPatient)
    const [threeStar, setThreeStar] = useState(totalThreeStar/totalPatient)
    const [twoStar, setTwoStar] = useState(totalTwoStar/totalPatient)
    const [oneStar, setOneStar] = useState(totalOneStar/totalPatient)
    const [patientsInQueue, setPatientsInQueue] = useState([])
    const [lastPatient, setLastPatient] = useState({})
    const [noOfPatient,setNoOfPatient] = useState("");
    const [noOfPatientToday,setNoOfPatientToday] = useState("");
    const [todayData ,setTodayDate] = useState("");
     const [data, setData] = useState([]);


    // Stacked Bar graph & Pie Graph - Non-repeat vs Repeat
    useEffect(() => {
        const getNoOfPatient = async () => {
            try {
                const responses = await axios.get(
                    "http://localhost:8081/ehr/get-history/2"

                );
                setData(responses.data);
                const totalConsulted = await axios.get(
                    "http://localhost:8081/ehr/get-no-patient/2"
                );
                setNoOfPatient(totalConsulted.data);
                const totalConsulteds = await axios.get(
                    "http://localhost:8081/ehr/get-no-patient-consulted-today/2"

                );
                setNoOfPatientToday(totalConsulteds.data);
                const response = await axios.get(
                    "http://localhost:8081/ehr/get-freq-patient/2"

                );
                setTodayDate(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getNoOfPatient();
    }, []);
    useEffect(() => {
        //Set dummy values
        let average = (5 * totalFiveStar + 4 * totalFourStar + 3 * totalThreeStar + 2 * totalTwoStar + totalOneStar) / totalPatient;
        setRating(Number(average.toFixed(1)));
        setPatient(totalPatient);
        setPatientsInQueue(patientQueue);
        setLastPatient(nextPatient);

        const canvas = document.getElementById('non-repeat-repeat');
        const canvasToday = document.getElementById('non-repeat-repeat-today');
        const context = canvas.getContext('2d');
        const contextToday = canvasToday.getContext('2d');
        if (canvas.chart) {
            canvas.chart.destroy();
        }
        if (canvasToday.chart) {
            canvasToday.chart.destroy();
        }
        canvas.chart = new Chart(context, {
            type: 'bar',
            data: {
                labels: data.map(row => {
                    const date = new Date(row.date);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    return `${day}/${month}`;
                }),
                datasets: [{
                    label: 'Repeat by date',
                    data: data.map(row => row.repeat),
                    backgroundColor: '#1D2A4D'
                },
                    {
                        label: 'Non-Repeat by date',
                        data: data.map(row => row.non_repeat),
                        backgroundColor: '#848E9F'
                    }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            padding: 10,
                            color: "black"
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            padding: 10,
                            color: "black"
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black'
                        }
                    }
                }
            }
        });
        canvasToday.chart = new Chart(contextToday, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [todayData.repeat, todayData.non_repeat],
                    borderWidth: 0,
                    backgroundColor: ['#1D2A4D', '#848E9F']
                }],
                labels: ['Repeat TODAY', 'Non-Repeat TODAY']
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'black'
                        }
                    }
                }
            }
        })



        // Ratings
        // document.getElementById("progress-canvas5").style.width = fiveStar*100 +"%";
        // document.getElementById("progress-canvas4").style.width = fourStar*100 + "%";
        // document.getElementById("progress-canvas3").style.width = threeStar*100 + "%";
        // document.getElementById("progress-canvas2").style.width = twoStar*100 + "%";
        // document.getElementById("progress-canvas1").style.width = oneStar*100 + "%";



        // //region Five rating
        // const canvas5Rating = document.getElementById('progress-canvas5');
        // if (canvas5Rating) {
        //     const ctx5 = canvas5Rating.getContext('2d');
        //     canvas5Rating.height = 18;
        //     ctx5.fillStyle = '#4861AB';
        //     ctx5.fillRect(0, 0, canvas5Rating.width, canvas5Rating.height);
        //     ctx5.fillStyle = '#1D2A4D';
        //     ctx5.fillRect(0, 0, canvas5Rating.width * fiveStar, canvas5Rating.height);
        // }
        // //endregion
        //
        // //region Four rating
        // const canvas4Rating = document.getElementById('progress-canvas4');
        // const ctx4 = canvas4Rating.getContext('2d');
        // canvas4Rating.height = 18;
        // ctx4.fillStyle = '#4861AB';
        // ctx4.fillRect(0, 0, canvas4Rating.width, canvas4Rating.height);
        // ctx4.fillStyle = '#1D2A4D';
        // ctx4.fillRect(0, 0, canvas4Rating.width * fourStar, canvas4Rating.height);
        // //endregion
        //
        // //region Three rating
        // const canvas3Rating = document.getElementById('progress-canvas3');
        // const ctx3 = canvas3Rating.getContext('2d');
        // canvas3Rating.height = 18;
        // ctx3.fillStyle = '#4861AB';
        // ctx3.fillRect(0, 0, canvas3Rating.width, canvas3Rating.height);
        // ctx3.fillStyle = '#1D2A4D';
        // ctx3.fillRect(0, 0, canvas3Rating.width * threeStar, canvas3Rating.height);
        // //endregion
        //
        // //region Two rating
        // const canvas2Rating = document.getElementById('progress-canvas2');
        // const ctx2 = canvas2Rating.getContext('2d');
        // canvas2Rating.height = 18;
        // ctx2.fillStyle = '#4861AB';
        // ctx2.fillRect(0, 0, canvas2Rating.width, canvas2Rating.height);
        // ctx2.fillStyle = '#1D2A4D';
        // ctx2.fillRect(0, 0, canvas2Rating.width * twoStar, canvas2Rating.height);
        // //endregion
        //
        // //region One rating
        // const canvas1Rating = document.getElementById('progress-canvas1');
        // const ctx1 = canvas1Rating.getContext('2d');
        // canvas1Rating.height = 18;
        // ctx1.fillStyle = '#4861AB';
        // ctx1.fillRect(0, 0, canvas1Rating.width, canvas1Rating.height);
        // ctx1.fillStyle = '#1D2A4D';
        // ctx1.fillRect(0, 0, canvas1Rating.width * oneStar, canvas1Rating.height);
        // //endregion

        return () => {
            if (canvas.chart) {
                canvas.chart.destroy();
                delete canvas.chart;
            }
            if (canvasToday.chart) {
                canvasToday.chart.destroy();
                delete canvasToday.chart;
            }
            // if (canvas5Rating.chart) {
            //     canvas5Rating.chart.destroy();
            //     delete  canvas5Rating.chart;
            // }
            // if (canvas4Rating.chart) {
            //     canvas4Rating.chart.destroy();
            //     delete  canvas4Rating.chart;
            // }
            // if (canvas3Rating.chart) {
            //     canvas3Rating.chart.destroy();
            //     delete  canvas3Rating.chart;
            // }
            // if (canvas2Rating.chart) {
            //     canvas2Rating.chart.destroy();
            //     delete  canvas2Rating.chart;
            // }
            // if (canvas1Rating.chart) {
            //     canvas1Rating.chart.destroy();
            //     delete  canvas1Rating.chart;
            // }
            //

        };
    },
    [data, todayData]);

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-container-1 dashboard-container-common">
                    <div className="total-patients common-tab-1">
                        <img className="common-icon" src={require("../../../images/doctor-page-images/consultation-icon.png")} alt="consultation"/>
                        <div className="common-text">
                            <p>Total patients</p>
                            <p className="number-text">{noOfPatient}+</p>
                            <p>till today</p>
                        </div>
                    </div>
                    <div className="patients-in-queue common-tab-1">
                        <img className="common-icon" src={require("../../../images/doctor-page-images/queue-icon.png")} alt="queue"/>
                        <div className="common-text">
                            <p>Patients waiting in queue</p>
                            <p className="number-text">19</p>
                        </div>
                    </div>
                    <div className="today-consulted common-tab-1">
                        <img className="common-icon" src={require("../../../images/doctor-page-images/today-icon.png")} alt="queue"/>
                        <div className="common-text">
                            <p>Patients consulted today</p>
                            <p className="number-text">{noOfPatientToday}</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-container-2 dashboard-container-common">
                    <div className="bar-graph">
                        <p className="graph-label">Number of consultations by date (Past 20 days)</p>
                        <canvas className="repeat-graph" id="non-repeat-repeat"></canvas>
                    </div>
                    <div className="pie-graph">
                        <p className="graph-label">Number of consultations TODAY </p>
                        <canvas className="repeat-graph" id="non-repeat-repeat-today"></canvas>
                    </div>
                </div>
                <div className="dashboard-container-3 dashboard-container-common">
                    <div className="user-ratings common-tab-2">
                        <div className="star-rating">
                            <Rating initialValue={rating} size={24} transition fillColor="#1D2A4D" emptyColor="#ccc" strokeColor="gold"
                            readonly="true" SVGstyle={ {display : "inline"} } allowFraction={true} />
                            <p className="star-rating-text"><span>{rating}</span> out of 5</p>
                        </div>
                        <p className="patient-rating-label"><span>{patient}</span> patients ratings</p>
                        <div>
                            <div className="star-count-section"><span className="star-count-text">5 star</span> <div className="patient-count-rating"><div className="progress-canvas-rating" id="progress-canvas5" style={{ width: fiveStar*100+"%" }}></div></div></div>
                            <div className="star-count-section"><span className="star-count-text">4 star</span> <div className="patient-count-rating"><div className="progress-canvas-rating" id="progress-canvas4" style={{ width: fourStar*100+"%" }}></div></div></div>
                            <div className="star-count-section"><span className="star-count-text">3 star</span> <div className="patient-count-rating"><div className="progress-canvas-rating" id="progress-canvas3" style={{ width: threeStar*100+"%" }}></div></div></div>
                            <div className="star-count-section"><span className="star-count-text">2 star</span> <div className="patient-count-rating"><div className="progress-canvas-rating" id="progress-canvas2" style={{ width: twoStar*100+"%" }}></div></div></div>
                            <div className="star-count-section"><span className="star-count-text">1 star</span> <div className="patient-count-rating"><div className="progress-canvas-rating" id="progress-canvas1" style={{ width: oneStar*100+"%" }}></div></div></div>
                        </div>
                    </div>
                    <div className="queue common-tab-2">
                        <span>Patients in queue</span>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Name</th>
                                    <th>Repeat/Non-repeat</th>
                                </tr>
                            </thead>
                            <tbody>
                            {patientsInQueue.map((patient, index) => (
                                <tr key={index}>
                                    <td><img className="patient-photo" src={require("../../../images/doctor-page-images/"+(index+1)+".jpg")} alt="Patient" /></td>
                                    <td>{patient.name}</td>
                                    <td>{patient.repeat}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="next-patient common-tab-2">
                        <span>Next Patient</span>
                        <table className="custom-table" style={{ textAlign:"center" }}>
                            <tbody>
                                <tr>
                                    <td><img className="patient-photo" src={require("../../../images/doctor-page-images/1.jpg")} alt="Patient" /></td>
                                    <td>{lastPatient.name}</td>
                                    <td>{lastPatient.diagnosis}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>D.O.B.</th>
                                    <th>Sex</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{lastPatient.dob}</td>
                                    <td>{lastPatient.sex}</td>
                                    <td>{lastPatient.weight}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Last Appointment</th>
                                    <th>Height</th>
                                    <th>Blood Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{lastPatient.last}</td>
                                    <td>{lastPatient.height}</td>
                                    <td>{lastPatient.bg}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

// const data = [
//     {"date": "2024-02-01", "repeat": 10, "non_repeat": 5},
//     {"date": "2024-02-02", "repeat": 15, "non_repeat": 7},
//     {"date": "2024-02-03", "repeat": 8, "non_repeat": 4},
//     {"date": "2024-02-04", "repeat": 12, "non_repeat": 6},
//     {"date": "2024-02-05", "repeat": 20, "non_repeat": 8},
//     {"date": "2024-02-06", "repeat": 18, "non_repeat": 9},
//     {"date": "2024-02-07", "repeat": 14, "non_repeat": 7},
//     {"date": "2024-02-08", "repeat": 10, "non_repeat": 5},
//     {"date": "2024-02-09", "repeat": 16, "non_repeat": 8},
//     {"date": "2024-02-10", "repeat": 12, "non_repeat": 6},
//     {"date": "2024-02-11", "repeat": 22, "non_repeat": 11},
//     {"date": "2024-02-12", "repeat": 18, "non_repeat": 9},
//     {"date": "2024-02-13", "repeat": 16, "non_repeat": 8},
//     {"date": "2024-02-14", "repeat": 14, "non_repeat": 7},
//     {"date": "2024-02-15", "repeat": 20, "non_repeat": 10},
//     {"date": "2024-02-16", "repeat": 24, "non_repeat": 12},
//     {"date": "2024-02-17", "repeat": 18, "non_repeat": 9},
//     {"date": "2024-02-18", "repeat": 14, "non_repeat": 7},
//     {"date": "2024-02-19", "repeat": 10, "non_repeat": 5},
//     {"date": "2024-02-20", "repeat": 16, "non_repeat": 8}
// ];

// const todayData = {
//     "repeat": 10,
//     "non_repeat": 5
// };

const ratingNumber = 4.3;
const totalPatient = 42;
const totalFiveStar = 9;
const totalFourStar = 13;
const totalThreeStar = 11;
const totalTwoStar = 7;
const totalOneStar = 2;

const patientQueue = [
    {"photo": "1.jpg", "name": "Subhodip Rudra", "repeat": "Repeat"},
    {"photo": "2.jpg", "name": "Suraj Subedi", "repeat": "Non-repeat"},
    {"photo": "3.jpg", "name": "Rishav Chandel", "repeat": "Repeat"}
];

const nextPatient = {
    "name": "Subhodip Rudra", "photo": "1.jpg", "diagnosis": "Kamzori",
    "dob": "01/01/0878", "sex": "Male", "weight": "75 Kg",
    "last": "02/02/2024", "height": "175 cm", "bg": "B+"
};

export default DashboardHelper;