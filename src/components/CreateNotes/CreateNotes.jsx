import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/Brush";
import Service from "../../Service/NoteService";
import IconButtons from "../Icon/Icon";
import "./Create.css";

const services = new Service();

const NewNote = (props) => {
  const [open, setOpen] = useState(true);
  const [pin, setPin] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const noTrash = true;
  const id = "";

  const handleClick = () => {
    setOpen(false);
  };

  const handlePin = () => {
    setPin(true);
  };

  const saveNote = () => {
    if (title !== "") {
      let formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("color", bgColor);
      services
        .addNote(formData)
        .then((res) => {
          console.log(res);
          props.GetNote();
          setBgColor("#fff");
          setTitle("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpen(true);
  };

  return (
    <div className="notes">
      {open ? (
        <div className="contain container">
          <div className="note" onClick={handleClick}>
            Take a note...
          </div>
          <IconButton>
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton>
            {" "}
            <BrushIcon />
          </IconButton>
          <IconButton>
            {" "}
            <ImageOutlinedIcon />
          </IconButton>
        </div>
      ) : (
        <div
          className="contain container1"
          style={{ backgroundColor: bgColor }}
        >
          <div className="note1">
            <div className="title pd">
              <InputBase
                placeholder="Title"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="note pd">
              <InputBase
                placeholder="Take a note..."
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="toolbar">
            <IconButtons
              setBgColor={setBgColor}
              archive={props.archive}
              noTrash={noTrash}
              id={id}
            />
            <div className="close-button">
              <Button
                size="small"
                onClick={() => {
                  saveNote();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNote;
