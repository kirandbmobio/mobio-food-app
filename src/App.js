import "./index.css";

import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Auth/Home";
import Restaurant from "./pages/Restaurant/index";
import Layout from "./components/layout/Layout";
import Profile from "./pages/User/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import Session from "./utils/session";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/restaurant" component={Restaurant} />
        <Route path="/profile" component={Profile} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:id" component={ResetPassword} />
        {Session.getToken() == null && (
          <Redirect path="/" to="/login"></Redirect>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
