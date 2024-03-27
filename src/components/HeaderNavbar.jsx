import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from "axios";
import { authServices } from "../services/authServices";
import Cookies from 'js-cookie'

export default class HeaderNavbar extends Component {
  constructor() {
    super();

    this.state = {
      role: localStorage.getItem("role"),
      name: localStorage.getItem("name"),
    };
  }

  handleLogout = async () => {
    const response = await authServices.logoutAuth();
    console.log("🚀 ~ HeaderNavbar ~ handleLogout= ~ response:", response);
    if (response.success) {
      alert(response.data);
      Cookies.remove('authToken')
      localStorage.clear();
      window.location.href = "/";
    }
  };

  // handleLogout = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/logout", {
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       alert(response.data.message);
  //       localStorage.clear(); // Membersihkan penyimpanan lokal
  //       window.location.href = "/"; // Mengarahkan kembali ke halaman login atau halaman lainnya
  //     } else {
  //       alert("Logout gagal");
  //     }
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     alert("Logout gagal");
  //   }
  // };

  render() {
    const { role } = this.state;
    return (
      <>
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <div className="navbar-collapse collapse container">
            <h3>
              <Link className="text-decoration-none fw-bold" to="/">
                NEWAPP
              </Link>
            </h3>
            {role ? (
              <ul className="navbar-nav navbar-align">
                <Button
                  style={{ marginRight: "8px" }}
                  variant="outline-danger"
                  onClick={this.handleLogout}
                >
                  Logout
                </Button>
              </ul>
            ) : (
              <>
                <ul className="navbar-nav navbar-align">
                  <Link to="/">
                    <Button
                      style={{ marginRight: "8px" }}
                      variant="outline-primary"
                    >
                      Daftar
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button>Masuk</Button>
                  </Link>
                </ul>
              </>
            )}
          </div>
        </nav>
      </>
    );
  }
}
