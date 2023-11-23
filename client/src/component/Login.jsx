import React, { Component } from "react";
import AuthService from "../services/auth-service.js";
import { withRouter } from "../common/withRouter";
import "../App.css"
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: null,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      message: null, // Clear previous error message
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      message: null, // Clear previous error message
    });
  }

  handleLogin(e) {
    e.preventDefault();

    const { username, password } = this.state;

    // Validate username and password manually
    if (!username || !password) {
      this.setState({
        message: "Username and password are required.",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    AuthService.login(username, password)
      .then(() => {
        this.props.router.navigate("/products");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      });
  }

  render() {
    const { username, password, loading, message } = this.state;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={loading}
                type="submit"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span className="login-button">Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
