import React from 'react';
import HeaderHelper from "./helper-components/HeaderHelper";
import FooterHelper from "./helper-components/FooterHelper";
import SignUpHelper from "./helper-components/SignUpHelper";


const SignUp = () => {

    return (
        <div>
            <HeaderHelper/>
            <SignUpHelper/>
            <FooterHelper/>
        </div>
    );
};

export default SignUp;