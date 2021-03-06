import React from "react";
import "./Forget.css";
import userServices from "../../Service/UserService";
import { TextField, Card } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      snackbarMsg: "",
      snackbarOpen: false,
      errs: {},
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    let errs = {};
    let formIsValid = true;
    const errors = this.validate(this.state);
    if (errors.email || this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Enter proper email-ID.   ",
      });
      formIsValid = false;
      errs["email"] = "* required  valid mail id";
    } else {
      let sendData = {
        email: this.state.email,
      };

      userServices
        .ForgetPassword(sendData)
        .then((response) => {
          if (response === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Check your E-Mail",
            });
            this.props.history.push("/login");
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Link Sent Your Resgister EmailID",
            });
          }
        })
        .catch();
    }
  };

  validate = (data) => {
    const errors = {};
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.email))
      errors.email = "Invalid email";
    return errors;
  };

  onchangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div className="forget_Form">
        <Card class="forget_Container">
          <Typography className="app_name" variant="h5" color="textSecondary">
            <span style={{ color: "#0606f8" }}>F</span>
            <span style={{ color: "#d10303" }}>u</span>
            <span style={{ color: "#f0b000" }}>n</span>
            <span style={{ color: "#0606f8" }}>d</span>
            <span style={{ color: "green" }}>o</span>
            <span style={{ color: "#d10303" }}>o</span>
          </Typography>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={() => this.setState({ snackbarOpen: false })}
            message={this.state.snackbarMsg}
          ></Snackbar>

          <div className="login"> Find Your Email</div>
          <div className="enterEmail">Enter your registered Email</div>

          <div className="set_Div" data-test="EMAIL">
            <TextField
              required
              variant="outlined"
              label="Email"
              type="text"
              id="emailForg"
              value={this.state.email}
              error={this.state.errs["email"]}
              helperText={this.state.errs["email"]}
              onChange={this.onchangeEmail}
            />
          </div>
          <div className="set_Button">
            <Button
              id="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              NEXT
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default ForgetPassword;
