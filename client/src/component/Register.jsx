import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return "This field is required!";
  }
  return null;
};

const email = (value) => {
  if (!isEmail(value)) {
    return "Invalid email address.";
  }
  return null;
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "The username must be between 3 and 20 characters.";
  }
  return null;
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "The password must be between 6 and 40 characters.";
  }
  return null;
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      message: null, // Clear previous error message
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      message: null, // Clear previous error message
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      message: null, // Clear previous error message
    });
  }

  handleRegister(e) {
    e.preventDefault();

    const { username, email, password } = this.state;

    // Validate username, email, and password manually
    if (!username || !email || !password) {
      this.setState({
        message: "Username, email, and password are required.",
      });
      return;
    }

    if (!isEmail(email)) {
      this.setState({
        message: "Invalid email address.",
      });
      return;
    }

    if (username.length < 3 || username.length > 20) {
      this.setState({
        message: "The username must be between 3 and 20 characters.",
      });
      return;
    }

    if (password.length < 6 || password.length > 40) {
      this.setState({
        message: "The password must be between 6 and 40 characters.",
      });
      return;
    }

    this.setState({
      successful: false,
    });

    AuthService.register(username, email, password)
      .then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={this.handleRegister}>
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                  {vusername(this.state.username)}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                  {email(this.state.email)}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                  {vpassword(this.state.password)}
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
