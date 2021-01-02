import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import CloseIcon from "@material-ui/icons/Close";
import userServices from "../../Service/UserService";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton, Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./ResetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: null,
      username: "",
      userdata: [],
      show: false,
      login: "Reset Password",
      next: false,
      password: "",
      helperTextpassowrd: "",
      confirmPassword: "",
      helperTextCpassowrd: "",
      snackbaropen: false,
      snackbarmsg: "",
      confirmpassword: "",
      pass: null,
      conformPasswordFlag: false,
        conformPasswordError: "",
        passwordFlag: false,
        passwordError: "",
        password: "",
        conformPassword: "",
        token :"",
    };
  }

  Reset = (e) => {
    e.preventDefault();
    const err = this.validator();
    if (!err) {
      this.setState({
        conformPasswordFlag: false,
        conformPasswordError: "",
        passwordFlag: false,
        passwordError: "",
        password: "",
        conformPassword: "",
      });
      let resetPasswordData = {
        newPassword: this.state.password,
      };
      userServices
        .resetPassword(resetPasswordData, this.token).then((result) => {
          let obj = JSON.stringify(result);
          console.log("Password reset successful" + obj);
          this.nextPath("../login");
        })
        .catch((error) => {
          console.log("Password reset Failed" + error);
        });
    } else {
      console.log("Reset Failed");
    }
  };

  
  validator = () => {
    if (this.state.password !== "") {
      if (
        /[@#$%^&*()_+!]/.test(this.state.password) &&
        /[a-z]/.test(this.state.password) &&
        /[0-9]/.test(this.state.password) &&
        /[A-Z]/.test(this.state.password)
      ) {
        this.setState({
          password: this.state.password,
          helperTextpassowrd: "",
          // error: false
        });
      } else {
        this.setState({
          helperTextpassowrd: "Min 8 character",
          error: true,
          password: this.state.password,
        });
      }
    } else if (this.state.password === "") {
      this.setState({
        helperTextpassowrd: "Enter the password",
        error: true,
        password: this.state.password,
      });
    }
    if (this.state.confirmpassword === "") {
      this.setState({
        helperTextCpassowrd: "Enter the confirm password",
        error: true,
        confirmpassword: this.state.confirmpassword,
      });
    } else {
      this.checkPassword();
    }
  };

  //close snackbar
  handleClose = (event) => {
    this.setState({ snackbaropen: false });
  };
  onchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onchangePasswordagain = (event) => {
    this.setState({
      confirmpassword: event.target.value,
    });
  };

  checkPassword = () => {
    if (this.state.password === this.state.confirmpassword) {
      this.setState({
        snackbaropen: true,
        snackbarmsg: "Password changed",
        pass: true,
      });
      this.setState({
        confirmpassword: this.state.confirmpassword,
        helperTextpassowrd: "",
        error: false,
      });
    } else {
      this.setState({
        snackbaropen: true,
        snackbarmsg: "enter same password",
        pass: false,
      });
    }
  };
  login = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="login_Form">
        <Card class="login_Container">
          <CardContent>
            <Typography className="app_name" variant="h5" color="textSecondary">
            <span style={{ color: "#0606f8" }}>F</span>
              <span style={{ color: "#d10303" }}>u</span>
              <span style={{ color: "#f0b000" }}>n</span>
              <span style={{ color: "#0606f8" }}>d</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "#d10303" }}>o</span>
            </Typography>

            <div className="login">Reset Password</div>
            <div className="emailAndPass">
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                id="newPass"
                variant="outlined"
                type="password"
                label="NewPassword"
                helperText={this.state.helperTextpassowrd}
                error={this.state.helperTextpassowrd}
                onChange={this.onchangePassword}
              />
            </div>
            <div className="emailAndPass">
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                id="confPassword"
                variant="outlined"
                type="password"
                label="Re-enter New Password"
                helperText={this.state.helperTextCpassowrd}
                error={this.state.helperTextCpassowrd}
                onChange={this.onchangePasswordagain}
              />
            </div>
            <div className="forget_style" onClick={this.login}>
              <span>Login</span>
            </div>
            <div className="set_Button">
              <Button
                id="styled_component"
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => this.Reset(e)}
              >
                Change Password
              </Button>
            </div>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.handleClose}
              message={this.state.snackbarmsg}
              action={[
                <IconButton
                  key="close"
                  arial-label="close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  {/* <CloseIcon /> */}
                </IconButton>,
              ]}
            ></Snackbar>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default ResetPassword;