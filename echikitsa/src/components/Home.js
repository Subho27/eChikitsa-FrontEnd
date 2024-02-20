import React from 'react';
import {Link} from "react-router-dom";

function Home () {
    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/patient/profile">Patient Profile</Link>
            {/*<Link to="/patient/land"> Landing</Link>*/}
        </div>
    );
}

export default Home;