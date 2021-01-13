
import axios from 'axios'
const URL = process.env.REACT_APP_BASE_URL;



export default class noteService {


    addNote = (data) => {
      console.log(process.env.REACT_APP_BASE_URL)
        return axios.post(process.env.REACT_APP_BASE_URL+ '/notes/addNotes'  , data,{
            headers: {
              Authorization:localStorage.getItem('token'),
            },
          });
    }

    getNotes = () => {
      console.log(process.env.REACT_APP_BASE_URL)
      return axios.get(process.env.REACT_APP_BASE_URL+'/notes/getNotesList',{
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
    }


    deleteNote = (data) => {
      console.log(process.env.REACT_APP_BASE_URL)
        return axios.post(process.env.REACT_APP_BASE_URL+'/notes/trashNotes', data,{
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
    }
}