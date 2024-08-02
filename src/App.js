// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [mode,setmode]=useState('light');
  const [modetext,setmodetext]=useState('Dark');
  const [alert,setalert]=useState(null);

  const togglemode=()=>{
    if(mode==='light'){
      setmode('dark');
      document.body.style.backgroundColor='#243546';
      setmodetext('Light');
      showAlert("Dark mode enabled","success")
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      setmodetext('Dark');
      showAlert("Light mode enabled","success")
    }
  }
  const showAlert=(message,type)=>{
    setalert(
      {
        message:message,
        type:type
      }
    )   
      setTimeout(() => {
        setalert(null)
      }, 1750);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar mode={mode} modetext={modetext} togglemode={togglemode}/>
    <Alert alert={alert}/>
    <div className="container " >
    <Routes>
      <Route exact path='/' element={<Home mode={mode} showAlert={showAlert}/>}></Route>
      <Route exact path='/about' element={<About mode={mode}/>}></Route>
      <Route exact path='/login' element={<Login mode={mode} showAlert={showAlert}/>}></Route>
      <Route exact path='/signup' element={<Signup mode={mode} showAlert={showAlert}/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
