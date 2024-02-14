import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import CallPageHelper from "./components/helper-components/helper-patient/CallPageHelper";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/patient/callpage' element={ <CallPageHelper/>} />
          <Route path='/patient/records' element={ <SignUp/> } />
          <Route path='/patient/profile' element={ <SignUp/> } />
      </Routes>
  );
}

export default App;
