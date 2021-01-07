import React from "react";
import "./Drawer.css"
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Divider, List, ListItem, Typography, ListItemIcon, ListItemText } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const drawerWidth = 200;
var checkOpen = "close";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  root: {
    display: 'flex',
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
}))
export default function DrawerBar(props) {
  const classes = useStyles();

 

  return (
    <div className={classes.root}>
      <Drawer  open={props.drawerOpenClose} 
        variant="persistent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <div className="notes">
            <ListItem >
              <ListItemIcon>
                <EmojiObjectsIcon className="Notes" >
                </EmojiObjectsIcon>
              </ListItemIcon>
              <ListItemText primary='Notes' />
            </ListItem>
          </div>
          <div className="reminder">
            <ListItem  >
              <ListItemIcon>
                <AddAlertIcon className="Reminder">

                </AddAlertIcon>
              </ListItemIcon>
              <ListItemText primary='Reminder' />
            </ListItem>
          </div>
          <div className="Edit-Label">
            <ListItem >
              <ListItemIcon>
                <EditIcon className="Edit Label">

                </EditIcon>
              </ListItemIcon>

              <ListItemText primary='Edit-Label' />
            </ListItem>
          </div>

          <div className="archive">
            <ListItem >
              <ListItemIcon>
                <ArchiveIcon className="Archive">

                </ArchiveIcon>
              </ListItemIcon>

              <ListItemText primary='Archive' />
            </ListItem>
          </div>
          <div className="bin">
            <ListItem  >
              <ListItemIcon>
                <DeleteIcon className="trash">

                </DeleteIcon>
              </ListItemIcon>
              <ListItemText primary='Trash' />
            </ListItem>
          </div>
        </List>
      </Drawer>
    </div>

  )
}

