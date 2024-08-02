import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Navbar = (props) => {
  const history = useNavigate();
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history('/login')
  }

  return (
    <div>
      <nav className={`navbar navbar-${props.mode} navbar-expand-lg bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'} mx-2`}>
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.togglemode}/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Enable {props.modetext} mode</label>
            </div>
            {!localStorage.getItem('token')?<form  className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
              </form>:<button className="btn btn-primary mx-1" onClick={handleLogout} >Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
