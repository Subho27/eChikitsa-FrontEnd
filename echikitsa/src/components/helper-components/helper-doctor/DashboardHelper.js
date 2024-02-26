import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../../css/helper-components/helper-doctor/dashboard-style.css"
import Chart from "chart.js/auto"
import {Rating} from "react-simple-star-rating";

function DashboardHelper() {
    const [rating, setRating] = useState(0)
    const [patient, setPatient] = useState(0)
    const [fiveStar, setFiveStar] = useState(0)
    const [fourStar, setFourStar] = useState(0)
    const [threeStar, setThreeStar] = useState(0)
    const [twoStar, setTwoStar] = useState(0)
    const [oneStar, setOneStar] = useState(0)
    const [patientsInQueue, setPatientsInQueue] = useState([])
    const [lastPatient, setLastPatient] = useState({})

    // Stacked Bar graph & Pie Graph - Non-repeat vs Repeat
    useEffect(() => {
            //Set dummy values
            let average = (5 * totalFiveStar + 4 * totalFourStar + 3 * totalThreeStar + 2 * totalTwoStar + totalOneStar) / totalPatient;
            setRating(Number(average.toFixed(1)));
            setPatient(totalPatient);
            setFiveStar(totalFiveStar);
            setFourStar(totalFourStar);
            setThreeStar(totalThreeStar);
            setTwoStar(totalTwoStar);
            setOneStar(totalOneStar);
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
                        data: data.map(row => row.repeat)
                    },
                        {
                            label: 'Non-Repeat by date',
                            data: data.map(row => row.non_repeat)
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
                                padding: 10
                            },
                        },
                        y: {
                            stacked: true,
                            ticks: {
                                autoSkip: true,
                                maxRotation: 0,
                                padding: 10
                            },
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
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
                        borderWidth: 0
                    }],
                    labels: ['Repeat TODAY', 'Non-Repeat TODAY']
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    }
                }
            })
            return () => {
                if (canvas.chart) {
                    canvas.chart.destroy();
                    delete canvas.chart;
                }
                if (canvasToday.chart) {
                    canvasToday.chart.destroy();
                    delete canvasToday.chart;
                }
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
                            <p className="number-text">2000+</p>
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
                            <p className="number-text">5</p>
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
                            <div className="star-count-section"><span className="star-count-text">5 star</span> <progress className="patient-count" value={fiveStar} max={patient}/></div>
                            <div className="star-count-section"><span className="star-count-text">4 star</span> <progress className="patient-count" value={fourStar} max={patient}/></div>
                            <div className="star-count-section"><span className="star-count-text">3 star</span> <progress className="patient-count" value={threeStar} max={patient}/></div>
                            <div className="star-count-section"><span className="star-count-text">2 star</span> <progress className="patient-count" value={twoStar} max={patient}/></div>
                            <div className="star-count-section"><span className="star-count-text">1 star</span> <progress className="patient-count" value={oneStar} max={patient}/></div>
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

const data = [
    {"date": "2024-02-01", "repeat": 10, "non_repeat": 5},
    {"date": "2024-02-02", "repeat": 15, "non_repeat": 7},
    {"date": "2024-02-03", "repeat": 8, "non_repeat": 4},
    {"date": "2024-02-04", "repeat": 12, "non_repeat": 6},
    {"date": "2024-02-05", "repeat": 20, "non_repeat": 8},
    {"date": "2024-02-06", "repeat": 18, "non_repeat": 9},
    {"date": "2024-02-07", "repeat": 14, "non_repeat": 7},
    {"date": "2024-02-08", "repeat": 10, "non_repeat": 5},
    {"date": "2024-02-09", "repeat": 16, "non_repeat": 8},
    {"date": "2024-02-10", "repeat": 12, "non_repeat": 6},
    {"date": "2024-02-11", "repeat": 22, "non_repeat": 11},
    {"date": "2024-02-12", "repeat": 18, "non_repeat": 9},
    {"date": "2024-02-13", "repeat": 16, "non_repeat": 8},
    {"date": "2024-02-14", "repeat": 14, "non_repeat": 7},
    {"date": "2024-02-15", "repeat": 20, "non_repeat": 10},
    {"date": "2024-02-16", "repeat": 24, "non_repeat": 12},
    {"date": "2024-02-17", "repeat": 18, "non_repeat": 9},
    {"date": "2024-02-18", "repeat": 14, "non_repeat": 7},
    {"date": "2024-02-19", "repeat": 10, "non_repeat": 5},
    {"date": "2024-02-20", "repeat": 16, "non_repeat": 8}
];

const todayData = {
    "repeat": 10,
    "non_repeat": 5
};

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