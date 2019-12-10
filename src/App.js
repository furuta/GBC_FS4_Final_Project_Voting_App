import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";

import Login from "./Login";
import Page1 from "./voting/Page1";
import Page2 from "./voting/Page2";
import Page3 from "./voting/Page3";
import Summary from "./voting/Summary";
import Results from "./Results";

function App() {
  return (
    <div className="App">
      <Login />
      <Page1 />
      <Page2 />
      <Page3 />
      <Summary />
      <Results />
    </div>
  );
}

export default App;
