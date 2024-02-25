import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Patient_landing from "./components/helper-components/patient_landing";
import Login from "./components/Login";
import DashboardHelper from "./components/helper-components/helper-doctor/DashboardHelper";
import RecordsHelper from "./components/helper-components/helper-doctor/RecordsHelper";
import MonitorHelper from "./components/helper-components/helper-doctor/MonitorHelper";
import ConsultationPageHelper from "./components/helper-components/helper-doctor/ConsultationPageHelper";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/pateint' element={ <Patient_landing/> } />
          <Route path='/doctor' element={ <DashboardHelper/> } />
          <Route path='/records' element={ <RecordsHelper/> } />
          <Route path='/monitor' element={ <MonitorHelper/> } />
          <Route path='/consult-page' element={ <ConsultationPageHelper/> } />
      </Routes>
  );
}

export default App;
