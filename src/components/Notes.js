import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


export const Notes = (props) => {

    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, getnote, editNote } = context;

    useEffect(() => {

        if(localStorage.getItem('token')) {
             getnote();
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentnote) => {
        ref.current.click()
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

    }



    const upclick = (e) => {


        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click()
        props.showalert("updated note successfully", "success");


        // e.preventDefault();
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>
            <AddNote showalert={props.showalert} />


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3 ">
                                    <label className="form-label" htmlFor="tag">Tag</label>
                                    <input type="tag" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={upclick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2> Your Notes </h2>
                <div className="conatiner">

                    {notes.length === 0 && "No notes to diaplay"}
                </div>

                {notes.map((note) => {

                    return <Noteitem key={note._id} showalert={props.showalert} updateNote={updateNote} note={note} />

                })}

            </div>
        </>
    )
}

export default Notes;