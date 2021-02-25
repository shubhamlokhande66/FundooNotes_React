import React, { useState, useEffect } from "react";
import "./Drawer.css";
import Drawer from "@material-ui/core/Drawer";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EditIcon from "@material-ui/icons/Edit";
import {
  Divider,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import NoteService from "../../Service/NoteService";

const service = new NoteService();
const drawerWidth = 200;
var checkOpen = "close";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  root: {
    display: "flex",
    height: 3,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: 62,
  },
  header: {
    width: 20,
  },
  appBar: {
    width: 500,
  },
}));
export default function DrawerBar(props) {
  const classes = useStyles();
  const [keyValue, setKeyValue] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [search, setSearch] = useState("");
  let history = useHistory();
  const handleClass = (value) => {
    setKeyValue(value);
  };
  useEffect(() => {
    handleClass("Notes");
    history.push("/dashboard/notes");
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        open={props.drawerOpenClose}
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <div className="notes">
            <ListItem
              button
              component={Link}
              to="/dashBoard/notes"
              onClick={() => {
                handleClass("Notes");
              }}
              className={keyValue === "Notes" ? "pink" : "white"}
              key="Notes"
            >
              <ListItemIcon>
                <EmojiObjectsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Notes</ListItemText>
            </ListItem>
          </div>
          <div className="reminder">
            <ListItem>
              <ListItemIcon>
                <AddAlertIcon className="Reminder"></AddAlertIcon>
              </ListItemIcon>
              <ListItemText primary="Reminder" />
            </ListItem>
          </div>
          <div className="Edit-Label">
            <ListItem>
              <ListItemIcon>
                <EditIcon className="Edit Label"></EditIcon>
              </ListItemIcon>

              <ListItemText primary="Edit-Label" />
            </ListItem>
          </div>
          <ListItem
            button
            onClick={() => {
              handleClass("Archive");
            }}
            component={Link}
            to="/dashboard/archives"
            className={keyValue === "Archive" ? "pink" : "white"}
            key="Archive"
          >
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </ListItem>

          <div className="bin">
            <ListItem
              button
              onClick={() => {
                handleClass("Delete");
              }}
              component={Link}
              to="/dashboard/trashes"
              className={keyValue === "Delete" ? "pink" : "white"}
              key="Delete"
            >
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItem>
          </div>
        </List>
      </Drawer>
    </div>
  );
}
