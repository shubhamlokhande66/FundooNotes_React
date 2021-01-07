// import HttpServices from "./Http";
// import * as noteApiConstants from "./API";
// let baseUrl = process.env.REACT_APP_API_URL;

// let getToken = (() => {
//   let token = "";
//   return () => {
//     if (localStorage.getItem("token") !== null) {
//       token = localStorage.getItem("token");
//     }
//     return token;
//   };
// })();

// const token = getToken();

// class NoteService {
//   addNote(data) {
//     return HttpServices.postApiRequest(
//       data,
//       baseUrl + noteApiConstants.notesApi.addNotes,
//       token
//     );
//   }
// }



// export default new NoteService();



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