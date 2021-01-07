import React from "react";
import "./Appbar.css";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import icon from "../assets/keepIcon.png";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsSharpIcon from '@material-ui/icons/SettingsOutlined';
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircle';
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import Sidebar from "../Drawer/Drawer";
import { makeStyles } from "@material-ui/core/styles";
var checkOpen = "close";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: "lightgray solid 1px",
    boxShadow: "none",
  },
  hide: {
    display: "none",
  },
  drawer: {
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: "22%",
    borderRight: "#ffff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    borderRight: "#ffff",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function ToolBar() {

 const [open, setOpen ,close] = React.useState(false);
 const classes = useStyles();
  const drawerOpenClose = () => {
    if (checkOpen == "open") {
      setOpen(false);
      checkOpen = "close";
    } else if (checkOpen == "close") {
      setOpen(true);
      checkOpen = "open";
    }
    console.log(checkOpen);
  };

  const drawerOpen = () => {
    setOpen(true);
  }

  const drawerClose = () => {
    setOpen(false);
  }

  return (
    <div className="main">
      {/* <Sidebar/> */}
      <AppBar position="fixed" color="transparent" >
        <Toolbar className="topBar">
          <div className="startOptions">
            <div className="menuButton">
              <IconButton  onClick={drawerOpenClose} edge="start" aria-label="open drawer">
              <MenuIcon />
              </IconButton>
            </div>
            <div className="headerIcon">
              <img className="headerIcon" src={icon} />
            </div>
            <div className="headerTitle">Fundoo</div>
          </div>

          <div className="search">
            <div className="searchIcon">
              <div className="searchIcon">
                <SearchIcon />
              </div>
            </div>
            <InputBase
              className="searchInput"
              placeholder="Search…"
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className="buttonContainer">
            <div className="button">
              <IconButton aria-label="open drawer">
                <ReplayOutlinedIcon />
              </IconButton>
            </div>

            <div className="button">
              <IconButton aria-label="open drawer">
                <DnsRoundedIcon />
              </IconButton>
            </div>

            <div className="button">
              <IconButton aria-label="open drawer">
                <SettingsSharpIcon />
              </IconButton>
            </div>
          </div>
          <div class="appsContainer">
            <div className="button">
              <IconButton aria-label="open drawer">
                <AppsRoundedIcon />
              </IconButton>
            </div>
            <div className="button">
              <IconButton aria-label="open drawer">
                <AccountCircleOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      
      <Sidebar drawerOpenClose={open}   /> 
    
    </div>
  );
}




