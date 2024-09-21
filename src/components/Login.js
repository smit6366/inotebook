import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const history= useNavigate();
    const{showAlert}=props;
    const [credentials, setCredentials]=useState({email:"",password:""})
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://inotebook-inky.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            showAlert("Logged in","success");
            history("/");
          }
          else{
            showAlert("Invalid credentials","danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
      }

  return (
    <div className="container">
        <form onSubmit={handlesubmit}>
  <div className="mb-3"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address<span className="req">*</span></label>
    <input type="email" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <label htmlFor="exampleInputPassword1" className="form-label">Password<span className="req">*</span></label>
    <input type="password" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3 form-check" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <input type="checkbox"  className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
