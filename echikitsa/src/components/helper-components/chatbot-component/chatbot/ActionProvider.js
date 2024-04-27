class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    // Queries
    handleHospitalQuery = () => {
        const message = this.createChatBotMessage(
            "Fantastic, Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    };

    handleDoctorQuery = () => {
        const message = this.createChatBotMessage(
            "Fantastic, Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    };

    handlePatientQuery = () => {
        const message = this.createChatBotMessage(
            "Fantastic, Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    };

    // Sub-queries
    handleRegistrationSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "registrationSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleProfileSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "profileSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleManageDoctorSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "manageDoctorSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleBillingSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "billingSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleDataPrivacySubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "dataPrivacySubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleRegistrationDoctorSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "registrationDoctorSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleProfileDoctorSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "profileDoctorSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleManageDoctorSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "manageDoctorSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleBillingSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "billingSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleDataPrivacySubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "dataPrivacySubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    //Query-answer
    handleRegistrationProcessAnswer = () => {
        const message = this.createChatBotMessage(
            "To register your hospital on our platform, navigate to the homepage " +
            "and click 'Sign Up.' Then, on the signup page, select the hospital icon, " +
            "fill in all required information, verify your official email ID, and click " +
            "'Register'.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleRegistrationDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "Doctors do not need to register individually; they should advise their hospital " +
            "to complete the registration process.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleVerifyCredentialsAnswer = () => {
        const message = this.createChatBotMessage(
            "In regards to the verification process, we will proceed as follows:\n" +
            "1. Kindly verify your official email address.\n" +
            "2. We will also verify your Registration ID.\n" +
            "Please note: In case of any discrepancies from your end, we reserve the " +
            "right to remove you from the platform and may take legal action in serious cases.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleVerifyDocCredentialsAnswer = () => {
        const message = this.createChatBotMessage(
            "In regards to the verification process, we will proceed as follows:\n" +
            "1. Kindly verify your email address.\n" +
            "2. We will also verify your Registration ID.\n" +
            "Please note: In case of any discrepancies from your end, we reserve the " +
            "right to remove you from the platform and may take legal action in serious cases.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAccessAdminAnswer = () => {
        const message = this.createChatBotMessage(
            "In this scenario, you may provide the email address and password you used " +
            "during registration to a designated individual within your organization. " +
            "This individual will then be responsible for managing all hospital-related " +
            "activities on our platform.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleViewDetailsAnswer = () => {
        const message = this.createChatBotMessage(
            "To access your hospital details as a hospital administrator, " +
            "please direct your attention to the right side of your screen after logging in.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleUpdateDetailsAnswer = () => {
        const message = this.createChatBotMessage(

            "To modify your hospital-related information, log in as an administrator " +
            "and navigate to the 'Update Hospital Details' tab. From there, you can make " +
            "the necessary updates.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAccessDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "In this scenario, you may provide the email address and password you received in mail" +
            "after registration completion by your organization.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleViewDocDetailsAnswer = () => {
        const message = this.createChatBotMessage(
            "To access your profile details as a doctor, " +
            "please direct your attention to the top-right side of your screen .\n" +
            "where your name is showing, click that to see your details.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleUpdateDocDetailsAnswer = () => {
        const message = this.createChatBotMessage(

            "To modify your profile-related information, log in " +
            "and navigate to the profile page. From there, you can make " +
            "the necessary updates.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAddUpdateDeptAnswer = () => {
        const message = this.createChatBotMessage(
            "After logging in, navigate to the 'Update Hospital Details' tab. In " +
            "the final field, you can update departments. Please select the departments " +
            "you wish to add and deselect those you want to remove from your hospital.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handlePlatformFeeAnswer = () => {
        const message = this.createChatBotMessage(
            "At present, there will be no platform fees for your hospital's " +
            "onboarding process. If any changes occur in the future, we will notify " +
            "you accordingly.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationFeeAnswer = () => {
        const message = this.createChatBotMessage(
            "As of today's date, there is no option to charge consultation fees " +
            "from patients. We will introduce a recent update where you will have " +
            "the choice to implement this feature.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAddDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "Upon logging in as a hospital administrator, navigate to the " +
            "'Appoint a Doctor' tab and provide the details of the doctor you " +
            "wish to add. The login credentials will then be emailed to the respective " +
            "doctor, allowing them to access their account once it is activated.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleViewDoctorAnswer = () => {
        const message = this.createChatBotMessage(

            "After logging in as a hospital administrator, you'll have access to the list " +
            "of doctors registered under your hospital, shown in 'Doctor's List' tab.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handlePromoteDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "After being enrolled by a hospital, doctors will initially assume the role " +
            "of Junior Doctor on our platform. If the administrator chooses, they can promote " +
            "the doctor to the role of Senior Doctor in 'Doctor's List' tab, which entails greater responsibilities.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleDeactivateDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "If, under any circumstances, a hospital administrator wishes to remove a doctor, " +
            "they can do so by navigating to the 'Terminate Contract' tab and selecting 'deactivate.' " +
            "Upon deactivation, an email will be sent to the doctor. Later, if you wish to reinstate " +
            "the doctor, you can reactivate their account under your hospital.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleHospitalDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of hospital data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleDoctorDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of your doctors' data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of consultation data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleReportScamAnswer = () => {
        const message = this.createChatBotMessage(
            "If you become aware of any fraudulent activity or notice any scams, " +
            "please notify us by emailing echikitsa@gmail.com.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "hospitalQueries",
            }
        );
        this.updateChatbotState(message);
    }


    updateChatbotState(message) {
        // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
