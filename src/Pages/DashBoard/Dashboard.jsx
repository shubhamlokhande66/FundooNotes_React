

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import './Dashboard.css';
import AddNote from '../../components/CreateNotes/CreateNotes'
import DisplayNotes from '../../components/DisplayNotes/DisplayNotes';
import NoteService from '../../Service/NoteService';
import Appbar from "../../components/AppBar/Appbar";

const service = new NoteService();


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  search: {
    alignItems: 'center',
    position: 'relative',
    borderRadius: '5px',
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '40%',
    height: '45px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '55%',
      height: '45px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    
  },
  inputInput: {
    width: '70%',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  paper: {
    marginRight: theme.spacing(1),

  },
  hide: {
    display: 'menuIcon',
  },
  drawer: {
    // zIndex: '999',
    width: drawerWidth,
    paddingLeft: '8px',
    paddingTop: '60px',
    // flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    borderBottom: '1px',
    flex: 'none'
  },
  drawerOpen: {
    zIndex: '999',
    paddingTop: '60px',
    paddingLeft: '8px',
    border: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: '999',
    paddingTop: '60px',
    paddingLeft: '8px',
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
      paddingLeft: '3px',
    },
    '@media(maxWidth: 600px)' : {
      paddingLeft: '3px',
    }
  },
  appbar:{
    boxShadow: 'none',
    borderBottom: '1px solid lightgray' 
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: '3%',
    flexGrow: 1,
    // paddingRight: 200, 
  },

}));

export default function Dashboard() {

  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [notes,setNotes]= React.useState([]);
  const [noteList, setNoteList] = useState([]);

 

  const getNote = () => {
    service.getNotes().then((res) => {
            setNoteList(res.data.data.data.filter(item => item.isDeleted === false));
        })
        .catch((err) => {
            console.log(err);
        });
}


useEffect(() => {
    getNote()
}, []);



  return (
    <div className="main">
      
      <div className={classes.content}>
        <AddNote GetNote={getNote} />
        < Appbar/>
        <DisplayNotes item={noteList} GetNote={getNote} />
      </div>
      </div>
  )

}