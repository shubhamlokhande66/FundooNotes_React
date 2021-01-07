
import axios from 'axios'

let addNote = (data, token) => {
    console.log(data,token)
    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes"
  return axios.post(`${URL}`, data, {
    headers: {
      Authorization: localStorage.getItem(token)
    },
  });

 };
 export default { addNote}