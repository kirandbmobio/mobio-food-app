import "./index.css";

import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Auth/Home";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mobio Food App</h1>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Layout>
      </header>
    </div>
  );
}

export default App;
