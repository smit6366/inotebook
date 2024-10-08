import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {

  const host="https://inotebook-inky.vercel.app"
  const notesinitial = []

  const [notes, setNotes] = useState(notesinitial)

  //Get notes
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
   
  }

  //Add new note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token") || '',
    }
    });
    const json=response.json();
    setNotes(json);

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  //Edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    setNotes(json);
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag=tag;
        break;
      }
      setNotes(newNotes)
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
