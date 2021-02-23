import React, { useState, useEffect } from 'react';
import DisplayNote from '../DisplayNotes/DisplayNotes';
import Service from '../../Service/NoteService';
import './Trash.css'
const services = new Service()

export default function Trash() {
    const [trashNote, setTrashNote] = useState([]);
    let trash = true;
    
    const getTrashNote = () => {
        services.getTrashNoteList()
            .then((res) => {
                setTrashNote(res.data.data.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTrashNote()
    }, []);

    return (
        <div className='trash'>
            <DisplayNote item={trashNote} GetNote={getTrashNote} trash={trash} />
        </div>
    )
}