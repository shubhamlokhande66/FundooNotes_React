import React, { Component } from "react";
import "./signup.css";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  Snackbar,
  CardContent,
  CardActions,
  Checkbox,
} from "@material-ui/core";
import userServices from "../../Service/UserService";
import Typography from "@material-ui/core/Typography";
import AccImg from "../assets/account.svg";

const regexValidateEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$$/
  );
  const regexvalidatePassword = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
  const regexvalidaterePassword = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
  const regexvalidateName = new RegExp(/^[A-Z]{1}[a-z]{3,}$/);
  const regexvalidateLastName = new RegExp(/^[A-Z]{1}[a-z]{3,}$/);


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      snackbarOpen: false,
      snackbarMessage: "",
      service: "",
      showPassword: false,
      errorValid: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
      enable: true,
      service: "advance",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
    
  }

  onSubmit = () => {
    const errors = this.validate(this.state);
    if (errors.email || this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter proper email-ID.   ",
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter correct password",
      });
    } else {
      let data = {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "password": this.state.password,
        "rePassword":this.state.rePassword,
        "service": "advance",
        
      };

      userServices
        .UserRegister(data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Registration Successful",
            });
            this.props.history.push("/login");
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Some problem occured while Registration",
            });
          }
        })
        .catch();
    }
  };
  clickShowPass = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };
  validate = (data) => {
    const errors = {};
    if (!regexValidateEmail.test(data.email))
      errors.email = "Invalid email";
    return errors;
  };

  onchangeFirstName = (event) => {
    event.preventDefault();
    this.setState({
        firstName: event.target.value,
      });
      let errors = this.state.errors;
      let validate = false;
    if (!regexvalidateName.test(this.state.firstName)) {
        errors.firstName = "eg Shubham";
        validate = true;
    } else {
        errors.firstName = "";
     } this.setState({
        snackbarOpen: true,
        snackbarMessage: "First Latters & reamining Small ",
        errorValid: { firstName: validate },
      errors: { firstName: errors.firstName },
      });
    
  };

  onchangeLastName = (event) => {
    event.preventDefault();
    this.setState({
        lastName: event.target.value,
      });
      let errors = this.state.errors;
      let validate = false;
    if (!regexvalidateLastName.test(this.state.lastName)) {
        errors.lastName = "eg Shubham";
        validate = true;
    } else {
        errors.lastName = "";
    }this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets.   ",
        errorValid: { lastName: validate },
        errors: { lastName: errors.lastName },
      });
    
  };
  onchangeEmail = (event) => {
    event.preventDefault();
    this.setState({
        email: event.target.value,
      });
      let errors = this.state.errors;
      let validate = false;
    if (!regexValidateEmail.test(this.state.email)) {
        errors.email = "eg Shubham";
        validate = true;
    } else {
        errors.email = "";
    }  this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets.   ",
        errorValid: { email: validate },
        errors: { email: errors.email },
      });
    
  };
 

  onchangePassword = (event) => {
    event.preventDefault();
    this.setState({
        password: event.target.value,
      });
      let errors = this.state.errors;
      let validate = false;
    if (!regexvalidatePassword.test(this.state.password)) {
        errors.password = "eg Shubham";
        validate = true;
    } else {
        errors.password = "";
    }this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets.   ",
        errorValid: { password: validate },
        errors: { password: errors.password },
      });
    
  };

  onchangeRePassword = (event) => {
    event.preventDefault();
    this.setState({
        rePassword: event.target.value,
      });
      let errors = this.state.errors;
      let validate = false;
    if (!regexvalidaterePassword.test(this.state.rePassword)) {
        errors.rePassword = "eg Shubham";
        validate = true;
    } else {
        errors.rePassword = "";
    }this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets.   ",
        errorValid: { rePassword: validate },
        errors: { rePassword: errors.rePassword },
      });
    
  };

  checkPassword() {
    if (this.state.password === this.state.rePassword) {
      this.setState({ snackbarOpen: true, snackbarMessage: "done" });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter same password",
      });
    }
  }

  SnackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };
  login = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
        <div className="registration">
        <div elevation={0} className="signupPage">
          <div className="header">
            <span className="inlineTitle">
            <Typography className="app_name" variant="h5" color="textSecondary">
              <span style={{ color: "#0606f8" }}>F</span>
              <span style={{ color: "#d10303" }}>u</span>
              <span style={{ color: "#f0b000" }}>n</span>
              <span style={{ color: "#0606f8" }}>d</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "#d10303" }}>o</span>
            </Typography>
            </span>
            <div className="headerText">Create your Fundoo Account </div>
            
            </div>
          <div className="container">
            <form className="form">
              <div className="inputs">
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={this.state.snackbarOpen}
                  autoHideDuration={3000}
                  onClose={() => this.setState({ snackbarOpen: false })}
                  message={this.state.snackbarMessage}
                ></Snackbar>
                <div className="inputField">
                  <TextField
                  autoCapitalize="off"
                  name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={this.state.firstName}
                    onChange={this.onchangeFirstName}
                    error={this.state.errorValid.firstName}
                    placeholder="firstName"
                    helperText={this.state.errors["firstName"]}
                    type="text"
                    fullWidth
                  />
                   </div>
                <div className="inputField">
                  <TextField
                   fullWidth
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={this.state.lastName}
                    onChange={this.onchangeLastName}
                    error={this.state.errorValid.lastName}
                    placeholder="lastName"
                    helperText={this.state.errors["lastName"]}
                    type="text"
                  />
                </div>
                </div>
              <div className="inputs">
                <div className="inputField">
                  <TextField
                    fullWidth
                 
                    value={this.state.email}
                    onChange={this.onchangeEmail}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="email"
                    error={this.state.errorValid.email}
                    placeholder="email"
                    helperText={this.state.errors["email"]}
                    type="text"
                    
                  />
                </div>
                </div>
              <div className="inputs">
                <div className="inputField">
                  <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    label="Password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.onchangePassword}
                    error={this.state.errorValid.password}
                    placeholder="password"
                    helperText={this.state.errors["password"]}
                    type="text"
                    type={this.state.showPassword ? "text" : "password"}
                  />
                   </div>
                <div className="inputField">
                  <TextField
                   
                    id="password"
                    variant="outlined"
                    type="rePassword"
                    fullWidth
                    label="Confirm-Password"
                    value={this.state.rePassword}
                    onChange={this.onchangeRePassword}
                    error={this.state.errorValid.rePassword}
                    placeholder="rePassword"
                    helperText={this.state.errors["rePassword"]}
                    type="text"
                    type={this.state.showPassword ? "text" : "password"}
                  />
                </div>
                </div>
              <span className="checkBoxInputs">
                <Checkbox
                  onClick={this.clickShowPass}
                  color="primary"
                  className="showPass"
                />
                Show Password
              </span>
              <div className="footerButtons">
                <div className="signInLink">
                  <Button
                    color="primary"
                    onClick ={(e)=> this.login(e)}>
                    Sign In insted
                  </Button>
                </div>
                <div className="nextButton">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.onSubmit(e)}
                    primary
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
            <div className="regImg">
              <img src={AccImg} alt="" />
              <p className="ImgText">
                {" "}
                One account. All of Fundoo working for you.
              </p>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}
export default withRouter(Registration);