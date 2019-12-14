import "./App.css";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation
} from "react-router-dom";

import Login from "./pages/LoginPage";
import Voting from "./pages/Voting";
import Results from "./pages/ResultsPage";

//const NETWORK = "goerli";

export default function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <div className="App-Content">
            <Solution />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

function Solution() {
  const [userName, setUserName] = React.useState(
    window.localStorage.getItem("userName")
  );

  React.useEffect(() => {
    const onStorage = e => {
      setUserName(window.localStorage.getItem("userName"));
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const location = useLocation();
  const showBackLink = () => {
    if (
      location.pathname === "/voting/summary" ||
      location.pathname === "/results"
    ) {
      return false;
    }
    return true;
  };
  return (
    <div>
      <Grid container={true} justify="space-between">
        <Typography component="h1" gutterBottom={true}>
          Cast Your Vote
        </Typography>
        {showBackLink() && (
          <Link to="/" component={RouterLink}>
            Back to start
          </Link>
        )}
      </Grid>
      <Switch>
        <LoggedInRouter
          isLoggedIn={!!userName}
          path="/voting/:page"
          render={() => {
            return <Voting />;
          }}
        />
        <LoggedInRouter
          isLoggedIn={!!userName}
          path="/results"
          render={() => {
            return <Results />;
          }}
        />
        <Route path="/">
          <Login isLoggedIn={!!userName} />
        </Route>
      </Switch>
    </div>
  );
}

const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to="/" />}
        <Component {...props} />
      </div>
    );
  };
};

const LoggedInRouter = withLoggedInState(Route);
