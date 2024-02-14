import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Patient_landing from "./components/helper-components/patient_landing";
import Landing from "./components/helper-components/landing_body"
import Hospital from "./components/helper-components/Hospital";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Landing/> } />
          <Route path='/pateint' element={ <Patient_landing/> } />
          <Route path='/hospital' element={ <Hospital/> } />
          {/*<Route path='/signup' element={ <SignUp/> } />*/}
      </Routes>
  );
}

export default App;
