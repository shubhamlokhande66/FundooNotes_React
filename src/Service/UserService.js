import axios from "axios";
const URL = process.env.REACT_APP_BASE_URL;

let userlogin = (data) => {
  return axios.post(`${URL}/user/login`, data);
};

let UserRegister = (data) => {
  return axios.post(`${URL}/user/userSignUp`, data);
};
let ForgetPassword = (data) => {
  return axios.post(`${URL}/user/reset`, data);
};

let resetPassword = (data, token) => {
  console.log(data, token);
  return axios.post(`${URL}/user/reset-password`, data, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export default { UserRegister, userlogin, ForgetPassword, resetPassword };
