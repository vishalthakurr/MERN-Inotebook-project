import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;


    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const Adclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showalert("Add note successfully" ,"success");
  
    }

    const onchange = (e) => {


        setnote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div className="container my- 3">

            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}  onChange={onchange} />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3 ">
                    <label className="form-label" htmlFor="tag">Tag</label>
                    <input type="tag" className="form-control" id="tag" name="tag"  value={note.tag }  onChange={onchange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={Adclick}>ADD</button>
            </form>
        </div>
    )
}

export default AddNote
