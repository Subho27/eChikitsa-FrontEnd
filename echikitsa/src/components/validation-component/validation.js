import {States} from "./CityDatabase";

export const ValidateField = (name, value, validationMessage) => {

    //Regular expressions
    const validFirstName = /^[a-zA-Z]+$/;
    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const validPhone = /^\d{10}$/;
    const validAge = /^\d{1,3}$/;
    const validAadhaar = /^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    switch (name) {
        case 'firstname' :
            if(value !== "" && !validFirstName.test(value)) {
                validationMessage.firstNameMessage = 'Please enter only letters for your first name.';
            } else {
                validationMessage.firstNameMessage = '';
            }
            break;
        case 'lastname' :
            if(value !== "" && !validFirstName.test(value)) {
                validationMessage.lastNameMessage = 'Please enter only letters for your last name.';
            } else {
                validationMessage.lastNameMessage = '';
            }
            break;
        case 'email' :
            if(value !== "" && !validEmail.test(value)) {
                validationMessage.emailMessage = 'Invalid Email ID.';
            } else {
                validationMessage.emailMessage = '';
            }
            break;
        case 'phoneNumber' :
            if(value !== "" && !validPhone.test(value)) {
                validationMessage.phoneNumberMessage = 'Invalid Phone Number.';
            } else {
                validationMessage.phoneNumberMessage = '';
            }
            break;
        case 'age' :
            if(value !== "" && !validAge.test(value)) {
                    validationMessage.ageMessage = 'Invalid Age.';
            } else {
                if(parseInt(value) > 0 && parseInt(value) < 150) {
                    validationMessage.ageMessage = '';
                } else if(value === "") {
                    validationMessage.ageMessage = '';
                } else {
                    validationMessage.ageMessage = 'Invalid Age.';
                }
            }
            break;
        case 'aadhaar' :
            if(value !== "" && !validAadhaar.test(value)) {
                validationMessage.aadhaarMessage = 'Invalid Aadhaar Number.';
            } else {
                validationMessage.aadhaarMessage = '';
            }
            break;
        case 'state' :
            if(value !== "" && !States.includes(value)) {
                validationMessage.stateMessage = 'Please select a state from suggestions.';
            } else {
                validationMessage.stateMessage = '';
            }
            break;
        case 'password' :
            if(value !== "" && !validPassword.test(value)) {
                validationMessage.passwordMessage = 'Invalid Password.';
            } else {
                validationMessage.passwordMessage = '';
            }
            break;
        case 'confirmPassword' :
            if(value !== "" && !validPassword.test(value)) {
                validationMessage.confirmPasswordMessage = 'Invalid Password.';
            } else {
                validationMessage.confirmPasswordMessage = '';
            }
            break;
        default:
    }

    return validationMessage;
}