import React, { Component } from "react";
import { authServices } from "../../services/authServices";
import { Link, Navigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import HeaderNavbar from "../../components/HeaderNavbar";
import Swal from "sweetalert2";

export class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      auth: {
        username: "",
        password: "",
      },
      isLoggedIn: false,
      errors: {},
      showPassword: false,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("id");
    const passwordFromUrl = urlParams.get("psw");

    if (usernameFromUrl && passwordFromUrl) {
      this.setState({
        auth: {
          username: usernameFromUrl,
          password: passwordFromUrl,
        },
      },
      () => this.handleLogin());
    }
  }

  handleGetusernamePass = (event) => {
    const { name, value } = event.target;

    this.setState({
      auth: {
        ...this.state.auth,
        [name]: value,
      },
    });
  };

  handleShowPassword = () => {
    const { showPassword } = this.state;

    if (showPassword) {
      this.setState({
        showPassword: false,
      });
    } else {
      this.setState({
        showPassword: true,
      });
    }
  };

  handleLogin = async () => {
    const { auth } = this.state;

    if (this.handleValidationLogin()) {
      const response = await authServices.loginAuth(auth);

      if (response.success) {
        this.setState({
          isLoggedIn: true,
        });
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        this.setState({
          auth: {
            username: "",
            password: "",
          },
        });
      }
    }
  };

  handleValidationLogin = () => {
    const { auth } = this.state;

    var isValidForm = true;
    var errors = {};

    if (auth.username === "") {
      isValidForm = false;
      errors.username = "username Is Required";
    }

    if (auth.password === "") {
      isValidForm = false;
      errors.password = "Password Is Required";
    }

    this.setState({
      errors: errors,
    });
    return isValidForm;
  };

  render() {
    const { isLoggedIn, errors, auth, showPassword } = this.state;
    return (
      <>
        <HeaderNavbar />
        {isLoggedIn && <Navigate to="/category" />}

        <main className="d-flex w-100" style={{ backgroundColor: "#212A3E" }}>
          <div className="container d-flex flex-column">
            <div className="row vh-100">
              <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">
                  <div className="text-center mt-4">
                    <h1 className="h2 text-white fw-bold">Login</h1>
                    <p className="lead text-white fw-bold">
                      Sign in to your account to continue
                    </p>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="m-sm-3">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label className="d-flex">
                              Username<p className="text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                              type="username"
                              name="username"
                              placeholder="Enter your Username"
                              onChange={this.handleGetusernamePass}
                              value={auth.username}
                              required
                              autoFocus
                            />
                            <Form.Text className="text-danger">
                              {errors.username}
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label className="d-flex">
                              Password<p className="text-danger">*</p>
                            </Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Masukkan Password"
                                onChange={this.handleGetusernamePass}
                                value={auth.password}
                                required
                              />
                              <Button
                                className="input-group-append"
                                onClick={this.handleShowPassword}
                              >
                                {showPassword ? (
                                  <Icon.EyeSlashFill />
                                ) : (
                                  <Icon.EyeFill />
                                )}
                              </Button>
                            </div>
                            <Form.Text className="text-danger">
                              {errors.password}
                            </Form.Text>
                          </Form.Group>
                          <div className="d-grid gap-2 mt-3">
                            <Button
                              onClick={this.handleLogin}
                              className="btn btn-lg btn-primary"
                            >
                              Sign in
                            </Button>
                          </div>

                          <Link className="text-decoration-none" to="/">
                            <div className="text-center mb-3 mt-3">
                              Forget Password ?
                            </div>
                          </Link>

                          <div className="text-center mb-3 mt-3">
                            Don't have an account ?{" "}
                            <Link to="/" className="text-decoration-none">
                              Sign Up
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
