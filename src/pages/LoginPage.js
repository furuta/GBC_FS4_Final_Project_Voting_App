import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Redirect, useHistory } from "react-router-dom";

export default function LoginPage({ isLoggedIn }) {
  const [newUserName, setNewUserName] = React.useState("");
  const history = useHistory();
  const redirectUrl = "/voting/1";

  const saveName = e => {
    window.localStorage.setItem("userName", newUserName);
    isLoggedIn = true;
  };

  return (
    <Grid container={true} direction="column">
      {isLoggedIn && <Redirect push={true} to={redirectUrl} />}
      <Grid item={true}>
        <Typography>
          To begin your voting application, choose a username:
        </Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <TextField
          label="Username"
          variant="outlined"
          onChange={e => setNewUserName(e.target.value)}
        />
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Button onClick={saveName} disabled={!newUserName} variant="contained">
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
