import axios from "axios";
const URL = process.env.REACT_APP_BASE_URL;

export default class noteService {
  addNote = (data) => {
    console.log(data);
    return axios.post(
      process.env.REACT_APP_BASE_URL + "/notes/addNotes",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  getNotes = () => {
    return axios.get(process.env.REACT_APP_BASE_URL + "/notes/getNotesList", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };

  deleteNote = (data) => {
    return axios.post(
      process.env.REACT_APP_BASE_URL + "/notes/trashNotes",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  updateNotes = (data) => {
    return axios.post(
      process.env.REACT_APP_BASE_URL + "/notes/updateNotes",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  updateColor = (data) => {
    return axios.post(
      process.env.REACT_APP_BASE_URL + "/notes/changesColorNotes",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  archiveNotes = (data) => {
    return axios.post(
      process.env.REACT_APP_BASE_URL + "/notes/archiveNotes",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  getArchiveNoteList = () => {
    return axios.get(
      process.env.REACT_APP_BASE_URL + "/notes/getArchiveNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  getTrashNoteList = () => {
    return axios.get(
      process.env.REACT_APP_BASE_URL + "/notes/getTrashNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };

  uploadImage = (data) => {
    //const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/uploadProfileImage";

    return axios.post(
      process.env.REACT_APP_BASE_URL + "/user/uploadProfileImage",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };
}
