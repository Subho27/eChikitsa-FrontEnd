import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomeHelper from "./components/helper-components/helper-patient/WelcomeHelper";
import HospitalHelper from "./components/helper-components/helper-patient/HospitalHelper";
import ProfileHelper from "./components/helper-components/helper-patient/ProfileHelper";
import RecordHelper from "./components/helper-components/helper-patient/RecordsHelper";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/patient' element={ <WelcomeHelper/> } />
          <Route path='/hospital' element={ <HospitalHelper/> } />
          <Route path='/welcome-helper' element={<WelcomeHelper/>}/>
          <Route path='/patient-profile' element={<ProfileHelper/>}/>
          <Route path='/patient-records' element={<RecordHelper/>}/>
      </Routes>
  );
}

export default App;
