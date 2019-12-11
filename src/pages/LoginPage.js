import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory } from "react-router-dom";

export default function LoginPage({ isLoggedIn }) {
  const [newUserName, setNewUserName] = React.useState();
  const history = useHistory();
  const redirectUrl = "/voting/1";

  const saveName = e => {
    window.localStorage.setItem("userName", newUserName);
    isLoggedIn = true;
    history.push(redirectUrl);
  };

  return (
    <Grid container={true}>
      {isLoggedIn && <Redirect push={true} to={redirectUrl} />}
      <Typography>
        To begin your voting application, choose a username:
      </Typography>
      <TextField
        placeholder="Username"
        onChange={e => setNewUserName(e.target.value)}
      />
      <Button onClick={saveName}>Continue</Button>
    </Grid>
  );
}
