import React from 'react'
import Notes from './Notes'



const Home = (props) => {
    
  return (
    <div className="container my-3 w-75">
    <Notes mode={props.mode} showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
