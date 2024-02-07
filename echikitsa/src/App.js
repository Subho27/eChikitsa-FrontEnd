import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  return (
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={ <SignUp/> } />
      </Routes>
  );
}

export default App;
