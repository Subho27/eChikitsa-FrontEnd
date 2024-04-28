import { createChatBotMessage } from 'react-chatbot-kit';
import RoleOptions from "../support-component/RoleOptions";
import HospitalQuery from "../support-component/HospitalQuery";
import DoctorQuery from "../support-component/DoctorQuery";
import PatientQuery from "../support-component/PatientQuery";
import Registration from "../support-component/HospitalSubQuery/Registration";
import Profile from "../support-component/HospitalSubQuery/Profile";
import ManageDoctors from "../support-component/HospitalSubQuery/MangeDoctors";
import Billing from "../support-component/HospitalSubQuery/Billing";
import DataPrivacy from "../support-component/HospitalSubQuery/DataPrivacy";
import RegistrationDoctor from "../support-component/DoctorSubQuery/RegistrationDoctor";
import ProfileDoctor from "../support-component/DoctorSubQuery/ProfileDoctor";
import Consultation from "../support-component/DoctorSubQuery/Consultation";
import Prescription from "../support-component/DoctorSubQuery/Prescription";
import DoctorDataPrivacy from "../support-component/DoctorSubQuery/DataPrivacy";
import RegistrationPatient from "../support-component/PatientSubQuery/RegistrationPatient";
import ProfilePatient from "../support-component/PatientSubQuery/ProfilePatient";
import ConsultationPatient from "../support-component/PatientSubQuery/Consultation";
import PrescriptionPatient from "../support-component/PatientSubQuery/Prescription";
import PatientDataPrivacy from "../support-component/PatientSubQuery/DataPrivacy";

const botName = 'Chikitsa Bot';

const config = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. I'm here to help. First, could you please tell me who you are?`, {
        widget: "roleOptions",
      }),
    ],
    botName: botName,
    customStyles: {
        botAvatar: {
            backgroundColor: '#000000',
        },
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
    },
    widgets: [
        {
            widgetName: "roleOptions",
            widgetFunc: (props) => <RoleOptions {...props} />
        },
        //region All Roles' Query
        {
            widgetName: "hospitalQueries",
            widgetFunc: (props) => <HospitalQuery {...props} />
        },
        {
            widgetName: "doctorQueries",
            widgetFunc: (props) => <DoctorQuery {...props} />
        },
        {
            widgetName: "patientQueries",
            widgetFunc: (props) => <PatientQuery {...props} />
        },
        //endregion

        //region Hospital Sub Query
        {
            widgetName: "registrationSubQuery",
            widgetFunc: (props) => <Registration {...props} />
        },
        {
            widgetName: "profileSubQuery",
            widgetFunc: (props) => <Profile {...props} />
        },
        {
            widgetName: "manageDoctorSubQuery",
            widgetFunc: (props) => <ManageDoctors {...props} />
        },
        {
            widgetName: "billingSubQuery",
            widgetFunc: (props) => <Billing {...props} />
        },
        {
            widgetName: "dataPrivacySubQuery",
            widgetFunc: (props) => <DataPrivacy {...props} />
        },
        //endregion

        //region Doctor Sub Query
        {
            widgetName: "registrationDoctorSubQuery",
            widgetFunc: (props) => <RegistrationDoctor {...props} />
        },
        {
            widgetName: "profileDoctorSubQuery",
            widgetFunc: (props) => <ProfileDoctor {...props} />
        },
        {
            widgetName: "consultationSubQuery",
            widgetFunc: (props) => <Consultation {...props} />
        },
        {
            widgetName: "prescriptionSubQuery",
            widgetFunc: (props) => <Prescription {...props} />
        },
        {
            widgetName: "doctorDataPrivacySubQuery",
            widgetFunc: (props) => <DoctorDataPrivacy {...props} />
        },
        //endregion

        //region Patient Sub Query
        {
            widgetName: "registrationPatientSubQuery",
            widgetFunc: (props) => <RegistrationPatient {...props} />
        },
        {
            widgetName: "profilePatientSubQuery",
            widgetFunc: (props) => <ProfilePatient {...props} />
        },
        {
            widgetName: "consultationPatientSubQuery",
            widgetFunc: (props) => <ConsultationPatient {...props} />
        },
        {
            widgetName: "prescriptionPatientSubQuery",
            widgetFunc: (props) => <PrescriptionPatient {...props} />
        },
        {
            widgetName: "patientDataPrivacySubQuery",
            widgetFunc: (props) => <PatientDataPrivacy {...props} />
        }
        //endregion
    ],
};

export default config;