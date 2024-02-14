import React from 'react';
import {Link} from "react-router-dom";

function Home () {
    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/patient/callpage">Patient Call</Link>
        </div>
    );
}

export default Home;