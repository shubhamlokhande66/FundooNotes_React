import React, { useState, useEffect } from 'react';
import DisplayNote from '../DisplayNotes/DisplayNotes';
import Service from '../../Service/NoteService';
import './Archive.css'
const services = new Service()

export default function Trash() {
    const [archiveNote, setArchiveNote] = useState([]);
    let archive = true;

    const getArchiveNote = () => {
        services.getArchiveNoteList()
            .then((res) => {
                setArchiveNote(res.data.data.data.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getArchiveNote();
    }, []);

    return (
        <div className='Archive'>
            <div className='archive'>
            <DisplayNote item={archiveNote} GetNote={getArchiveNote} archive={archive} />
            </div>
        </div>
    )
}