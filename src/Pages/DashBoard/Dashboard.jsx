import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./Dashboard.css";
import NoteService from "../../Service/NoteService";
import Appbar from "../../components/AppBar/Appbar";
import Note from "../../components/Notes/Notes";
import Archive from "../../components/Archive/Archive";
import { Switch, Route } from "react-router-dom";
import Trash from "../../components/Trash/Trash";
const service = new NoteService();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "3%",
    flexGrow: 1,
    // paddingRight: 200,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [search, setSearch] = useState("");

  return (
    <div className="main">
      <div className={classes.content}>
        <Appbar />
      </div>
      <div className="displaynotes">
        <Switch>
          <Route
            exact
            path="/dashBoard/notes"
            component={() => <Note search={search} />}
          />
          <Route exact path="/dashBoard/archives" component={Archive} />
          <Route exact path="/dashboard/trashes" component={Trash} />
        </Switch>
      </div>
    </div>
  );
}
