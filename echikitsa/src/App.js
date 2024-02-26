import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Patient_landing from "./components/helper-components/patient_landing";
import Login from "./components/Login";
import DocProfilePage from "./components/helper-components/helper-doctor/DocProfileHelper";
import DocRecordPage from "./components/helper-components/helper-doctor/DocRecordHelper";
import DocMonitorPage from "./components/helper-components/helper-doctor/DocMonitorHelper";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/pateint' element={ <Patient_landing/> } />
          <Route path='/doctorprofile' element={ <DocProfilePage/> } />
          <Route path='/doctorrecord' element={ <DocRecordPage/>} />
          <Route path='/doctormonitor' element={ <DocMonitorPage/>} />
      </Routes>
  );
}

export default App;
