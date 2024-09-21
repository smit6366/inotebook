import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const history= useNavigate();
    const [credentials, setCredentials]=useState({name:"",email:"",password:""})
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const{showAlert}=props;
        const response = await fetch(`https://inotebook-inky.vercel.app/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            showAlert("Successfully Signup","success");
            history("/");
          }
          else{
            showAlert("User already exists","danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
      }
  return (
    <div className="container">
      <form onSubmit={handlesubmit}  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
    
  </div>
  <div className="mb-3"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <label htmlFor="email" className="form-label">Email address<span className="req">*</span></label>
    <input type="email"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <label htmlFor="password" className="form-label">Create Password<span className="req">*</span></label>
    <input type="password" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} className="form-control" name='password' id="password" value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>Submit</button>
</form>
    </div>
  )
}

export default Signup
