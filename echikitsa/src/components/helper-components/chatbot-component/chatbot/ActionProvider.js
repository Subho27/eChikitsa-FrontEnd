class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    //region All Roles' Query
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
    //endregion

    //region Hospital Sub Query
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
    //endregion

    //region Doctor Sub Query
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

    handleConsultationSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "consultationSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handlePrescriptionSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "prescriptionSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleDocDataPrivacySubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "doctorDataPrivacySubQuery",
            }
        );
        this.updateChatbotState(message);
    };
    //endregion

    //region Patient Sub Query
    handleRegistrationPatientSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "registrationPatientSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleProfilePatientSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "profilePatientSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handleConsultationPatientSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "consultationPatientSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handlePrescriptionPatientSubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "prescriptionPatientSubQuery",
            }
        );
        this.updateChatbotState(message);
    };

    handlePatDataPrivacySubQuery = () => {
        const message = this.createChatBotMessage(
            "Certainly, could you please specify which aspect of the process you would like me to explain further?",
            {
                widget: "patientDataPrivacySubQuery",
            }
        );
        this.updateChatbotState(message);
    };
    //endregion

    handleReportScamAnswer = () => {
        const message = this.createChatBotMessage(
            "If you become aware of any fraudulent activity or notice any scams, " +
            "please notify us by emailing echikitsa@gmail.com.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "roleOptions",
            }
        );
        this.updateChatbotState(message);
    }

    //region Hospital Sub Query Answer
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
    //endregion

    //region Doctor Sub Query Answer
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

    handleAccessDoctorAnswer = () => {
        const message = this.createChatBotMessage(
            "In this scenario, you may provide the email address and password you received in mail " +
            "after registration completion by your organization, or you can use your mobile number for otp based login.\n" +
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

    handleConsultationProcessAnswer = () => {
        const message = this.createChatBotMessage(
            "After logging in as a doctor, you'll receive notifications for incoming calls " +
            "and queued patients. To join, simply click the 'Call' button at the bottom right " +
            "corner and begin the consultation.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationFeeDocAnswer = () => {
        const message = this.createChatBotMessage(
            "If you're interested in charging consultation fees, we'll soon provide an update to " +
            "enable that functionality. However, the decision to implement this feature will be at " +
            "the discretion of your hospital. Therefore, please confirm with your hospital before " +
            "proceeding.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleMonitorConsultationAnswer = () => {
        const message = this.createChatBotMessage(
            "Senior Doctors within your hospital have the authority to monitor ongoing " +
            "consultations conducted by junior doctors. You'll find the 'Monitor' option " +
            "in the navigation bar. Click on it and select the ongoing call you wish to " +
            "monitor.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationDataDocAnswer = () => {
        const message = this.createChatBotMessage(

            "You can access all past consultation records on the 'Records' " +
            "page. Simply click 'Records' in the top navigation bar to reach it\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAskingConsentDocAnswer = () => {
        const message = this.createChatBotMessage(
            "As a doctor during a consultation, you can request consent to access " +
            "a patient's previous medical history. If the patient grants permission, " +
            "you will then be able to view their past records.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleWritePrescriptionAnswer = () => {
        const message = this.createChatBotMessage(
            "As a doctor during the call, you can input the details you wish to include " +
            "in the prescription using the form next to the call screen. At the conclusion " +
            "of the call, the prescription will be generated and sent to the patient. You can " +
            "also review it in the past records.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handlePrescriptionFieldsAnswer = () => {
        const message = this.createChatBotMessage(
            "The prescription form includes fields for a list of commonly available medicines " +
            "in India, a message box for writing instructions, dosage details for medications, and " +
            "a diagnosis message.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleDoctorsDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of doctor data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "doctorQueries",
            }
        );
        this.updateChatbotState(message);
    }
    //endregion

    //region Patient Sub Query Answer
    handleRegistrationPatientAnswer = () => {
        const message = this.createChatBotMessage(
            "To register yourself as patient on our platform, navigate to the homepage " +
            "and click 'Sign Up.' Then, on the signup page, select the patient icon, " +
            "fill in all required information, verify your official email ID & phone number, and click " +
            "'Register'.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleVerifyPatCredentialsAnswer = () => {
        const message = this.createChatBotMessage(
            "In regards to the verification process, we will proceed as follows:\n" +
            "1. Kindly verify your email address.\n" +
            "2. We will also verify your phone number.\n" +
            "Please note: In case of any discrepancies from your end, we reserve the " +
            "right to remove you from the platform and may take legal action in serious cases.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleAccessPatientAnswer = () => {
        const message = this.createChatBotMessage(
            "In this scenario, you may provide the email address and password you entered while " +
            "registration, or you can use your mobile number for otp based login.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleViewPatDetailsAnswer = () => {
        const message = this.createChatBotMessage(
            "To access your profile details as a patient, " +
            "please direct your attention to the top-right side of your screen .\n" +
            "where your name is showing, click that to see your details.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleUpdatePatDetailsAnswer = () => {
        const message = this.createChatBotMessage(

            "To modify your profile-related information, log in " +
            "and navigate to the profile page. From there, you can make " +
            "the necessary updates.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationPatProcessAnswer = () => {
        const message = this.createChatBotMessage(
            "Upon logging in as a patient, you have the option to either click " +
            "'Consult' for our platform to randomly assign a doctor, or you can " +
            "search for a hospital or doctor and select a specific doctor for " +
            "consultation.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationFeePatAnswer = () => {
        const message = this.createChatBotMessage(
            "As of now our platform provides FREE consultation.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsentAnswer = () => {
        const message = this.createChatBotMessage(
            "During the consultation, if the doctor requests your consent to access your " +
            "previous medical history, you have the option to choose either 'Allow' or 'Reject' " +
            "as your consent reply.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationDataPatAnswer = () => {
        const message = this.createChatBotMessage(
            "You can access all past consultation records on the 'Records' " +
            "page. Simply click 'Records' in the top navigation bar to reach it\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleGetPrescriptionAnswer = () => {
        const message = this.createChatBotMessage(
            "You can access any of your past consultations' prescriptions at any time on the 'Records' page.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handlePatientsDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of patient data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }

    handleConsultationPatDataAnswer = () => {
        const message = this.createChatBotMessage(
            "The security of consultation data in our platform is paramount, with robust measures " +
            "in place to ensure its confidentiality, integrity, and protection against unauthorized " +
            "access or breaches, safeguarding sensitive information throughout its lifecycle.\n" +
            "Thank you.\n\n" +
            "Could you please specify what you'd like me to assist you with?",
            {
                widget: "patientQueries",
            }
        );
        this.updateChatbotState(message);
    }
    //endregion

    updateChatbotState(message) {
        // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
