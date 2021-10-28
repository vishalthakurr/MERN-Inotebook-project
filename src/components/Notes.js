import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

export const Notes = () => {

    const context = useContext(noteContext);
    const {note , setNote} = context;
   
    
    

    return (

        <div className="row my-3">
            <h2> Your Notes </h2>
           
            {note.map((note) => {

                return <Noteitem   note={note}/>

            })}

        </div>
    )
}

export default Notes;