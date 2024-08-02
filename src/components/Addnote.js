import { useContext, useState } from 'react';
import React  from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context= useContext(noteContext);// eslint-disable-next-line
    const {addNote}=context;
    const{showAlert}=props;

    const[note,setNote]=useState({title:"",description:"",tag:""});
    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"",description:"",tag:""})
        showAlert("Note added successfully","success");
    }
  return (
      <div  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
      <h2>Add your notes</h2>
      <form className="my-3"style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title<span className="req">*</span></label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} minLength={3} required/>
    <div id="emailHelp" className="form-text" style={{color: props.mode==='dark'?'white':'black'}}>We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description<span className="req">*</span></label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}/>
  </div>
  <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Notes</button>
</form>
    </div>
  )
}

export default Addnote
