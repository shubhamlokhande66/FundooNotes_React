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
   const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password"
 return axios.post(`${URL}`, data, {
   headers: {
     Authorization: `${token}`,
   },
 });
};

export default { UserRegister , userlogin ,ForgetPassword , resetPassword }







































// import axios from "axios";

// REACT_APP_BASE_URL= "http://fundoonotes.incubation.bridgelabz.com/api/user"
// function UserRegister(registerData) {
//   try {
//     const response = axios.post(
//       process.env.REACT_APP_BASE_URL + "/userSignUp",
//       registerData
//     );
//     return response;
//   } catch (err) {
//     return err;
//   }
// }

// async function userlogin(loginData) {
//   try {
//     const response = await axios.post(
//       process.env.REACT_APP_BASE_URL +  "/login",
//       loginData
//     );
//     localStorage.setItem("token", response.data.id);
//     localStorage.setItem("userDetails", JSON.stringify(response.data));
//     return response;
//   } catch (error) {
//     return error;
//   }
// }

// async function ForgetPassword(data) {
//   try {
//     const response = await axios.post(
//       process.env.REACT_APP_BASE_URL + "/reset",
//       data
//     );
//     return response;
//   } catch (err) {
//     return err;
//   }
// }

// async function resetPassword(data, access_token) {
//   try {
//     const response = await axios.post(
//       process.env.REACT_APP_BASE_URL + "reset-password",
//       data,
//       { params: { access_token } }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export default {
//   UserRegister,
//   userlogin,
//   ForgetPassword,
//   resetPassword
// };
