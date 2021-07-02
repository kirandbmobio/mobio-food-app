import "./index.css";

import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Auth/Home";
import Restaurant from "./pages/Restaurant/index";
import Layout from "./components/layout/Layout";
import Profile from "./pages/User/Profile";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/restaurant" component={Restaurant} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Layout>
  );
}

export default App;
