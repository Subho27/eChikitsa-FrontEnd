import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Patient_landing from "./components/helper-components/patient_landing";
import Login from "./components/Login";
import Hospitals from "./components/helper-components/Hospitals";
import HospitalDetailing from "./components/helper-components/HospitalDetailing";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/pateint' element={ <Patient_landing/> } />
          <Route path='/Hospitals' element={ <Hospitals/> } />
          <Route path='/Hospitaldetailing' element={ <HospitalDetailing/> } />
      </Routes>
  );
}

export default App;
