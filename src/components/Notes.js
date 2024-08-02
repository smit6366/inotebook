import React, { useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context= useContext(noteContext);// eslint-disable-next-line
    const {notes,getNote,editNote}=context;
    
    const history = useNavigate();
    const[note,setNote]=useState({id:"", etitle:"",edescription:"",etag:""});
    useEffect(()=>{
      if(localStorage.getItem("token")){
        getNote();
      }
      else{
        history("/login")
      }
      
      // eslint-disable-next-line
    },[])
    const ref=useRef(null);
    const refClose=useRef(null);
    const {showAlert}=props;
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})

    }
    const onChange=(e)=>{
      setNote({...note, [e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
      e.preventDefault();
  
      refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag)
      showAlert("Note updated successfully","success")
        
    }
  return (
    <>
    <Addnote mode={props.mode} showAlert={props.showAlert}/>
    
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <div className="modal-content" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3"style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}/>
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
      <h2>Your Notes</h2>
      <div className="container mx-1">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.length > 0 && notes.map((note) => {
        return <Notesitem key={note._id} note={note} mode={props.mode}  updateNote={updateNote} showAlert={props.showAlert}/>;
      })}
    </div>
    </>
  )
}

export default Notes
