import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Notesitem = (props) => {
  const context = useContext(noteContext);
  const{deleteNote}=context;
    const {note, updateNote, showAlert}=props;
  return (
    
    <div className="col-md-3 my-3"  style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
<div className="card " >
 
  <div className="card-body" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <div className="d-flex align-items-center " style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>
    <h5 className="card-title" style={{backgroundColor:props.mode==='dark'?'#243546':'white',color: props.mode==='dark'?'white':'black'}}>{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted","success");}}></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
    </div>
  )
}

export default Notesitem
