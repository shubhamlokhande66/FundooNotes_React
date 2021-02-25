import React, { useState, useEffect } from "react";
import "./Appbar.css";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import icon from "../assets/keepIcon.png";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsSharpIcon from "@material-ui/icons/SettingsOutlined";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircle";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import Sidebar from "../Drawer/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import ListIcon from "@material-ui/icons/List";
import AppIcon from "@material-ui/icons/Apps";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Button } from "@material-ui/core";

import Service from "../../Service/NoteService";
var checkOpen = "close";

const services = new Service();

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
  iconLogo: {
    width: "1.1em",
    height: "1.1em",
    [theme.breakpoints.down("xs")]: {
      width: "0.9em",
      height: "0.9em",
    },
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
  settingMenu: {
    marginTop: theme.spacing(6),
    marginLeft: "1em",
  },
  innericon: {
    marginLeft: "7em",
  },
  row: {
    marginTop: "10px",
    marginLeft: "-4em",
  },
}));

export default function ToolBar(props) {
  const [open, setOpen, close] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [view, setView] = useState(false);
  const [imageRefresh, setImageRefresh] = useState(Math.random());
  const classes = useStyles();
  let history = useHistory();
  const [showProfile, setShowProfile] = useState(false);
  const [displayImage, setDisplayImage] = useState("");
  const [hide, setHide] = useState(false);
  const [file, setFile] = React.useState("");
  let userEmail = localStorage.getItem("email");
  let userFirstName = localStorage.getItem("firstName");
  let userLastName = localStorage.getItem("lastName");

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

  const profileHandleOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const profileHandleClose = () => {
    setAnchorE2(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  const handleViewOpen = () => {
    setView(!view);
  };
  const handleHideAccount = () => {
    setHide(!hide);
  };

  const handleProfile = async (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    const formData = new FormData();
    await formData.append("file", file);
    services
      .uploadImage(formData)
      .then((response) => {
        console.log("Image: " + JSON.stringify(response));
        console.log("imageURL", response.data.status.imageUrl);

        localStorage.setItem("profileImage", response.data.status.imageUrl);
      })
      .catch((err) => {
        console.log("Error = " + err);
      });
  };
  const link = "http://fundoonotes.incubation.bridgelabz.com/";

  return (
    <div className="main">
      {/* <Sidebar/> */}
      <AppBar position="fixed" color="transparent">
        <Toolbar className="topBar">
          <div className="startOptions">
            <div className="menuButton">
              <IconButton
                onClick={drawerOpenClose}
                edge="start"
                aria-label="open drawer"
              >
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
          <div className="buttonContainer"></div>
          <div class="appsContainer">
            <div className="Grid">
              <div className="button">
                <IconButton className="App-icon" onClick={handleViewOpen}>
                  {view ? <AppIcon /> : <ListIcon />}
                  {/* <AppsRoundedIcon /> */}
                </IconButton>
              </div>
            </div>

            <div className="row-head3">
              <IconButton
                onClick={handleHideAccount}
                onClickAway={() => setShowProfile(false)}
                alt={localStorage.getItem("firstName")}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </div>
            <div className={hide ? "true profile" : "false profile"}>
              <div className="person">
                <div className="avatarContainer">
                  <div className={classes.innericon}>
                    <Avatar
                      alt={localStorage.getItem("firstName")}
                      src={link}
                    />
                    <div className={classes.row}>
                      <input type="file" name="file" onChange={handleProfile} />
                    </div>
                  </div>
                </div>
                <div className="name" style={{ fontSize: 20 }}>
                  {userFirstName} {userLastName}
                </div>
                <div className="name" style={{ fontSize: 15 }}>
                  {userEmail}
                </div>
              </div>
              <div className="cardActions">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpenClose={open} />
    </div>
  );
}
