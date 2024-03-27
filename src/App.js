import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import Category from "./pages/Category/Category";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
