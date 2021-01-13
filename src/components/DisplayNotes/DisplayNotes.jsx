import React, { useState } from 'react'
import './displayNotes.css'
import DisplayIcons from '../Icon/Icon'
import UpdateNote from '../UpdateNote/UpdateNote';


const DisplayNote = (props) => {
    const [bgColor, setBgColor] = useState("#fff")
    const [note, setNote] = useState([])
    const [update, setUpdate] = useState(false)
    const onArchive = true

    const handleUpdate = (value) => {
        setUpdate(true)
        setNote(value)
    }

    const handleClose = () => {
        setUpdate(false)
    }
    
    return (        
        <div className="display-note">
            {props.item.map((item) => (
                <div className="display">
                    <div className="addNote"  style={{ backgroundColor: item.color}}>
                        <div className="notes1" onClick={() => handleUpdate(item)}>
                            <div className="title pds">
                                {item.title}
                            </div>
                            <div className='note pds'>
                                {item.description}
                            </div>
                        </div>
                        <div className="toolbar1">
                            <DisplayIcons setBgColor={setBgColor} item={item} id={item.id} GetNote={props.GetNote} />
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default DisplayNote