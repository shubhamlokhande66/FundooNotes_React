

import axios from 'axios'



export const saveNotes = (data , token) => {
  console.log(data.token)
  const URL = "http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes"
  return axios.post(`${URL}`, data, {
     headers: {
       Authorization: localStorage.getItem('token'),
     },
   });
}


export const getNoteList = (token) => {
  console.log(token)
  const URL = "http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList"
  return axios.get(`${URL}`, {
   headers: {
     Authorization: localStorage.getItem('token'),
   },
 });
}





