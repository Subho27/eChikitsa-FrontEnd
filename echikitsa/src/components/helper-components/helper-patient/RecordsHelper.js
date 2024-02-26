import React from 'react';
import {useState} from "react";
import '../../../css/helper-components/helper-patient/records-style.css'
import {dummy} from "./dummy";


function RecordHelper() {
    const [query, setQuery] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const filteredData = dummy.filter(item =>
        item.Doctor.toLowerCase().includes(query.toLowerCase()) ||
        item.Hospital.toLowerCase().includes(query.toLowerCase()) ||
        item.Date.includes(query)||item.Active.toLowerCase().includes(query.toLowerCase())
    );
    const handleToggleRow = (id) => {
        const isRowExpanded = expandedRows.includes(id);
        setExpandedRows(prevState => {
            if (isRowExpanded) {
                return prevState.filter(rowId => rowId !== id);
            } else {
                return [...prevState, id];
            }
        });
    };

    const isRowExpanded = (id) => {
        return expandedRows.includes(id);
    };

    console.log(dummy.filter(user=>user.Doctor.toLowerCase().includes("sm")));

    return (
        <div className="Container">
            <div className="RecordTitle">
              <div className="textjk">Previous Consultation</div>
            </div>
                <div className="Recordright">
                    <div className="searchall">
                        <input
                            className="searchs"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                        <i className="fas fa-search"></i>
                    </div>

                    <table className="recordTable">
                            <tbody>
                            <tr>
                                <th>Date </th>
                                <th>Hospital</th>
                                <th>Doctor</th>
                                <th>Active</th>
                            </tr>
                            {filteredData.map((item) => (<React.Fragment key={item.id}>
                                <tr onClick={() => handleToggleRow(item.id)}>
                                    <td>{item.Date}</td>
                                    <td>{item.Hospital}</td>
                                    <td>{item.Doctor}</td>
                                    <td>{item.Active}</td>
                                </tr>
                            {isRowExpanded(item.id) && (
                                <tr className="collapsed-row">
                                    <td className="collapsed-td" colSpan="4">
                                        <div className="coll">
                                            <div className="collval">Next Consultation tentative: 23/02/2024</div>
                                            <div>
                                                <button className="download-btn">Download uploaded files</button>
                                            </div>
                                            <div>
                                                <button className="download-btn">Download Prescription</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            )}

                                </React.Fragment>
                            ))}
                            </tbody>
                    </table>
            </div>
        </div>
    );
}

export default RecordHelper;