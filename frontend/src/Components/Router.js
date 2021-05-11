/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Routes/Home";
import CalendarApp from "../Routes/Calendar";
import Board from "../Routes/Board";
import Certi from "../Routes/Certi";
import User from "../Routes/User";
import ChatBox from "../Components/aside/ChatMessageBox/ChatMessageBox";
import Login from "../Routes/Login";
import Register from "../Routes/Register";
import DetailBoard from "../Components/DetailBoard";
export default () => (
  <Router>
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/calendar" exact component={CalendarApp} />
        <Route path="/board" exact component={Board} />
        <Route path="/certi" exact component={Certi} />
        <Route path="/user" exact component={User} />
        <Route path="/ChatBox" exact component={ChatBox} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/detailBoard/:no" component={DetailBoard} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
