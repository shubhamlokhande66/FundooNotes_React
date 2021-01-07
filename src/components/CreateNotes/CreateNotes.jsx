import React, { useState, useContext } from "react";
import {
  Paper,
  InputBase,
  Button,
  IconButton,
  Tooltip,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoteServices from "../../Service/NoteService.js";
import ColorPalletIcon from "../../components/colour/colour";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import "./Create.css"
function CreateNote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [loading, setLoading] = useState(false);
  const [token, settoken]=useState([]);

  const useStyles = makeStyles((theme) => ({
    createNote: {
      display: "inline-flex",
      width: "50%",
      background: color,
      padding: "0.3rem 0.5rem",
      margin: "1.6rem 0",
      boxShadow: "1px 1px 4px grey",
      flexDirection: "column",
      [theme.breakpoints.down(960)]: {
        width: "70%",
      },
      [theme.breakpoints.down(540)]: {
        width: "85%",
      },
      [theme.breakpoints.down(360)]: {
        width: "95%",
      },
    },
    createNoteTittle: {
      padding: "0.1rem 0.3rem",
      display: "flex",
      justifyContent: "space-between",
    },
    createNoteDescription: {
      padding: "0.5rem 0.3rem 0.8rem 0.3rem",
    },
    createNoteList: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "0.5rem",
      [theme.breakpoints.down(380)]: {
        flexDirection: "column",
      },
    },
    createNoteCloseButton: {
      fontSize: "1.5rem",
      color: "rgba(0,0,0,0.8)",
      textTransform: "capitalize",
      [theme.breakpoints.down(460)]: {
        // padding: "0.2rem",
      },
    },
    
    createNoteListIconButton: {
      [theme.breakpoints.down(540)]: {
        padding: "0.3rem",
      },
    },
    createNoteListIcons: {
      width: "1.2rem",
      height: "1.2rem",
      color: "#202124",
      opacity: "0.71",
    },
    
  }));

  const classes = useStyles();

 
  let addNote = () => { 
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("color", color);
    data.append("token" , token);
    if (title !== "" && description !== "") {
      setLoading(true);
      NoteServices.addNote(data ,props.token)
        .then(() => {
          setLoading(false);

          props.getAllNotes();

        })
        .catch(() => {
          setLoading(false);
        });
    } else {
    }
  };


  return (
    <>
      {loading ? <CircularProgress /> : null}
      <Paper className={classes.createNote}>
        <div className={classes.createNoteTittle}>
          <InputBase
            placeholder=" Title"
            fullWidth
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
        </div>
        <InputBase
          multiline={true}
          rowsMax={20}
          placeholder=" Take a note..."
          fullWidth
          className={classes.createNoteDescription}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <div className={classes.createNoteList}>
          <div>
          <IconButton aria-label="open drawer">
              <AddAlertIcon />
            </IconButton>
            <IconButton aria-label="open drawer">
              <PersonAddIcon />
            </IconButton>

            <ColorPalletIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              setColor={setColor}
            />
            <IconButton aria-label="open drawer">
              <ImageOutlinedIcon />
            </IconButton>
            <IconButton aria-label="open drawer">
              <SystemUpdateAltOutlinedIcon />
            </IconButton>
            <IconButton aria-label="open drawer">
              <MoreVertOutlinedIcon />
            </IconButton>
           
          </div>
          
          <Button
         className="createNoteCloseButton"
            className={classes.createNoteCloseButton}
            onClick={() => {
                
              addNote();
              props.setShowMiniCreateNote();
            }}
          > 

           <h6>Close</h6> 
          </Button>
        </div>
      </Paper>
    </>
  );
}
export default CreateNote;