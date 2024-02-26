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
import TestingWelcome from "./components/helper-components/helper-patient/TestingWelcome";

function App() {
  return (
      <Routes>
          {/*Common Page Routes*/}
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />

          {/*Patient Page Routes*/}
          <Route path='/welcome' element={<WelcomePatient/>}/>
          <Route path='/patient-profile' element={<ProfilePatient/>}/>
          <Route path='/patient-records' element={<RecordsPatient/>}/>
          <Route path='/hospital' element={ <HospitalDetailPatient/> } />
          <Route path='/call' element={ <CallPagePatient/> } />

          <Route path='/testing' element={ <TestingWelcome/> } />

          {/*Doctor Page Routes*/}
          <Route path='/dashboard' element={<DashboardDoctor/>}/>
          <Route path='/consult' element={<ConsultationPageDoctor/>}/>
          <Route path='/monitor' element={<MonitorDoctor/>}/>
          <Route path='/doctor-profile' element={<ProfileDoctor/>}/>
          <Route path='/doctor-records' element={<RecordsDoctor/>}/>
      </Routes>
  );
}

export default App;
