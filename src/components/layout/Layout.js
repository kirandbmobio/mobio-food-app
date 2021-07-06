import "./Layout.css";

import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { ThemeProvider, BottomNavigation, Container } from "@material-ui/core";
import theme from "../../../src/theme/index";

import GlobalStyles from "../GlobalStyles/GlobalStyles";
import Sidebar from "../Sidebar/Sidebar";

import Session from "../../utils/session";

function Layout(props) {
  const history = useHistory();

  if (Session.getToken() == null) {
    if (
      window.location.pathname == "/restaurant" ||
      window.location.pathname == "/profile" ||
      window.location.pathname == "/home"
    ) {
      history.push("/login");
    }
  } else {
    if (
      window.location.pathname == "/login" ||
      window.location.pathname == "/signup" ||
      window.location.pathname == "/"
    ) {
      history.push("/home");
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>{props.children}</div>
      <BottomNavigation></BottomNavigation>
    </ThemeProvider>
  );
}

export default Layout;
