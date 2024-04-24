import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/common-components/Home";
import SignUp from "./components/common-components/SignUp";
import Login from "./components/common-components/Login";
import RecordsPatient from "./components/patient-components/RecordsPatient";
import ProfilePatient from "./components/patient-components/ProfilePatient";
import WelcomePatient from "./components/patient-components/WelcomePatient";
import HospitalDetailPatient from "./components/patient-components/HospitalDetailPatient";
import CallPagePatient from "./components/patient-components/CallPagePatient";
import DashboardDoctor from "./components/doctor-components/DashboardDoctor";
import ConsultationPageDoctor from "./components/doctor-components/ConsultationPageDoctor";
import MonitorDoctor from "./components/doctor-components/MonitorDoctor";
import ProfileDoctor from "./components/doctor-components/ProfileDoctor";
import RecordsDoctor from "./components/doctor-components/RecordsDoctor";
import WelcomeAdmin from "./components/admin-components/WelcomeAdmin";
import MonitorCallDoctor from "./components/doctor-components/MonitorCallDoctor";
import ForgotPassword from "./components/common-components/ForgotPassword";
import ProtectedRoute from "./components/route-guard/ProtectedRoute";
import {AuthProvider} from "./components/route-guard/AuthContext";
import ProtectedRouteForLogin from "./components/route-guard/ProtectedRouteForLogin";
import React from "react";
import PageNotFound from "./components/helper-components/PageNotFound";
import ContactUs from "./components/helper-components/ContactUs";



function App() {

    return (

<AuthProvider>
        <Routes>

            {/*Common Page Routes*/}
            <Route path='/' Component={ Home}  />
            <Route path='/signup' Component={SignUp}   />
            <Route path='/login' element={ <ProtectedRouteForLogin Component={Login}  /> } />
            <Route path='/forgot-password' Component={ForgotPassword}   />
            <Route path='/ContactUs' Component={ContactUs}   />


            {/*Patient Page Routes*/}
            <Route path="/welcome" element={<ProtectedRoute Component={WelcomePatient} role ="PATIENT" /> } />
            <Route path='/patient-profile/*' element={<ProtectedRoute Component={ProfilePatient} role ="PATIENT" />}/>
            <Route path='/patient-records' element={<ProtectedRoute Component={RecordsPatient} role ="PATIENT" />}/>
            <Route path='/hospital' element={ <ProtectedRoute Component={HospitalDetailPatient} role ="PATIENT" /> } />
            <Route path='/call/*' element={ <ProtectedRoute Component={CallPagePatient} role ="PATIENT" /> } />

            {/*Doctor Page Routes*/}
            <Route path='/dashboard' element={<ProtectedRoute Component={DashboardDoctor} role ="DOCTOR" />}/>
            <Route path='/consult/*' element={<ProtectedRoute Component={ConsultationPageDoctor} role ="DOCTOR" />}/>
            <Route path='/doctor-profile' element={<ProtectedRoute Component={ProfileDoctor} role ="DOCTOR" />}/>
            <Route path='/doctor-records' element={<ProtectedRoute Component={RecordsDoctor} role ="DOCTOR" />}/>

            {/*Senior Doctor Page Routes*/}
            <Route path='/monitor' element={<ProtectedRoute Component={MonitorDoctor} role ="DOCTOR" />}/>
            <Route path='/monitor-call/*' element={<ProtectedRoute Component={MonitorCallDoctor} role ="DOCTOR" />}/>

            {/*Admin Page Routes*/}
            <Route path='/admin' element={<ProtectedRoute Component={WelcomeAdmin} role ="ADMIN" />}/>

            <Route path="*" Component={PageNotFound} />


        </Routes>
</AuthProvider>

    );
}

export default App;
