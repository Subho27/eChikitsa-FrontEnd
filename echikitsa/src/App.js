import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Patient_landing from "./components/helper-components/patient_landing";
import Login from "./components/Login";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/pateint' element={ <Patient_landing/> } />
      </Routes>
  );
}

export default App;
