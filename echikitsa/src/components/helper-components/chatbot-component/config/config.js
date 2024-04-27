import { createChatBotMessage } from 'react-chatbot-kit';
import RoleOptions from "../support-component/RoleOptions";
import HospitalQuery from "../support-component/HospitalQuery";
import ActionProvider from "../chatbot/ActionProvider";
import DoctorQuery from "../support-component/DoctorQuery";
import PatientQuery from "../support-component/PatientQuery";
import Registration from "../support-component/HospitalSubQuery/Registration";
import Profile from "../support-component/HospitalSubQuery/Profile";
import ManageDoctors from "../support-component/HospitalSubQuery/MangeDoctors";
import Billing from "../support-component/HospitalSubQuery/Billing";
import DataPrivacy from "../support-component/HospitalSubQuery/DataPrivacy";
import RegistrationDoctor from "../support-component/DoctorSubQuery/RegistrationDoctor";
import ProfileDoctor from "../support-component/DoctorSubQuery/ProfileDoctor";

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


        {
            widgetName: "registrationDoctorSubQuery",
            widgetFunc: (props) => <RegistrationDoctor {...props} />
        },
        {
            widgetName: "profileDoctorSubQuery",
            widgetFunc: (props) => <ProfileDoctor {...props} />
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
        }
    ],
};

export default config;