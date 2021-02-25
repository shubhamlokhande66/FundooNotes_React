import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Services from "../../Service/UserService";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import "./signIn.css";

export default class signIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
      showPassword: false,
      snackbarOpen: false,
      snackbarMessage: "",
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  clickShowPass = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      emailFlag: false,
      passwordError: "",
      passwordFlag: false,
    };

    if (this.state.email.length == 0) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Enter your Email ";
    }
    if (
      !/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(
        this.state.email
      )
    ) {
      errors.emailFlag = true;
      isError = true;
      errors.emailError = "Please Enter Correct Email";
    }
    if (this.state.password.length == 0) {
      errors.passwordFlag = true;
      isError = true;
      errors.passwordError = "Enter Password";
    }

    this.setState({
      ...errors,
    });

    return isError;
  };
  SnackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        email: "",
        emailFlag: false,
        emailError: "",
        password: "",
        passwordFlag: false,
        passwordError: "",
      });
      let loginData = {
        email: this.state.email,
        password: this.state.password,
      };
      Services.userlogin(loginData)
        .then((response) => {
          console.log(response);
          //localStorage.setItem("userToken", response.data.id);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("email", response.data.email);
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Login Succesfully.",
            });
            localStorage.setItem("token", response.data.id);
            setTimeout(() => {
              this.props.history.push("/dashboard");
            }, 2000);
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Enter correct credentials",
            });
          }
        })
        .catch();
    }
  };

  render() {
    return (
      <div className="main">
        <div elevation={0} className="page">
          <span className="inlineTitle">
            <b>
              <font color="#1976d2">F</font>
              <font color="#e53935">u</font>
              <font color="#ffb74d">n</font>
              <font color="#1976d2">d</font>
              <font color="#388e3c">o</font>
              <font color="#e53935">o</font>
            </b>
          </span>
          <span className="signIn">Sign in</span>
          Use your Fundoo Account
          <form className="loginForm">
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
            <div className="inputfield">
              <TextField
                className="input"
                label="Email"
                variant="outlined"
                name="email"
                value={this.state.email}
                helperText={this.state.emailError}
                error={this.state.emailFlag}
                onChange={(e) => this.change(e)}
              />
            </div>
            <div className="passField">
              <TextField
                className="input"
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={(e) => this.change(e)}
                error={this.state.passwordFlag}
                helperText={this.state.passwordError}
              />
            </div>
            <span className="checkBox">
              <Checkbox
                onClick={this.clickShowPass}
                color="primary"
                className="showPass"
              />
              Show Password
            </span>
            <div className="forgetPassword">
              <Button
                color="primary"
                onClick={() => this.nextPath("../forgotPassword")}
              >
                Forgot password?
              </Button>
            </div>
            <span className="footer">
              <div className="button">
                <Button
                  color="primary"
                  onClick={() => this.nextPath("../registration")}
                >
                  Create account
                </Button>
              </div>
              <div className="button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.onSubmit(e)}
                >
                  Sign In
                </Button>
              </div>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
