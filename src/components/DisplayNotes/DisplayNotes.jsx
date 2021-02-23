import React, { useState } from 'react'
import './displayNotes.css'
import DisplayIcons from '../Icon/Icon'
import UpdateNote from '../UpdateNotes/UpdateNotes';


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
                            <div className="pds">
                                {item.title}
                            </div>
                            <div className="pds">
                                {item.description}
                            </div>
                        </div>
                        <div className="toolbar1">
                            <DisplayIcons setBgColor={setBgColor} item={item} id={item.id} GetNote={props.GetNote} archive={props.archive} trash={props.trash}/>
                        </div>
                    </div>
                </div>
            ))}
              <UpdateNote item={note} open={update} close={handleClose} GetNote={props.GetNote} trash={props.trash}/>
        </div>
    );
}

export default DisplayNote