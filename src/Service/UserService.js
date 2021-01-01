import axios from 'axios'


 let userlogin = (data) => {
    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/login";
    console.log("This is from service class", data);
    return axios.post(`${URL}`, data)
  };

 let UserRegister = (data) => {
    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp"
    return axios.post( `${URL}`, data)


    
}
let ForgetPassword = (data) => {
   const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/reset"
   return axios.post( `${URL}`, data)
 
   
}
// let resetPassword = (data ,token) => {
//    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password"
//    return axios.post( `${URL}`, data ,token)
   
 
// }

let resetPassword = (data, token) => {
   console.log(data,token)
   const URL = "http://fundoonotes.incubation.bridgelabz.com/api"
 return axios.post(`${URL}/user/reset-password`, data, {
   headers: {
     Authorization: `${token}`,
   },
 });
};

export default { UserRegister , userlogin ,ForgetPassword , resetPassword }



