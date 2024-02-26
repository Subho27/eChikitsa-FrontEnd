import React from 'react';
import HeaderHelper from "../helper-components/HeaderHelper";
import HomeHelper from "../helper-components/HomeHelper";
import FooterHelper from "../helper-components/FooterHelper";

function Home () {
    return (
        <div>
            <HeaderHelper/>
            <HomeHelper/>
            <FooterHelper/>
        </div>
    );
}

export default Home;