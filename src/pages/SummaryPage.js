import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import sendTransaction from "../utils/sendTransaction";
import saveStore from "../utils/saveStore";
import { PROVINCES, DONATION_ADDRESS, HAPPINESS_LABEL } from "../constants";
import { useHistory } from "react-router-dom";

export default function SummaryPage({
  favoriteCandidate,
  happyWithProgress,
  birthday,
  province,
  temperature
}) {
  const [candidateAmt, setCandidateAmt] = React.useState(0);
  const [charityAmt, setCharityAmt] = React.useState(0);
  const history = useHistory();
  let provinces = {};
  PROVINCES.map(v => (provinces[v.code] = v.name));

  const toCandidate = e => {
    setCandidateAmt(e.target.value);
  };

  const toCharity = e => {
    setCharityAmt(e.target.value);
  };

  const submission = () => {
    let sendAmount = 0;
    let message = "";
    if (candidateAmt > 0) {
      sendAmount = candidateAmt;
      message = "candidate";
    } else if (charityAmt > 0) {
      sendAmount = charityAmt;
      message = "charity";
    }
    sendTransaction({
      valueInEth: sendAmount,
      gas: 25000,
      toAddress: DONATION_ADDRESS,
      msg: message
    });
    saveStore({
      candidate: favoriteCandidate,
      birthday: birthday,
      happiness: happyWithProgress,
      province: province,
      temperature: temperature
    });
  };

  const isValid = () => {
    if (charityAmt > 0 && candidateAmt > 0) {
      return true;
    } else {
      return false;
    }
  };

  const birthdayToString = () => {
    if (birthday) {
      return `${birthday.getMonth() + 1}/${birthday.getDate() +
        1}/${birthday.getFullYear()}`;
    }
    return "";
  };

  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography variant="h3">Summary Page</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">Who is your favorite candidate?</Typography>
        <Typography component="p" color="primary">
          {favoriteCandidate}
        </Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">
          How happy are you with the current progress?
        </Typography>
        <Typography component="p" color="primary">
          {HAPPINESS_LABEL[happyWithProgress]}
        </Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">When is your birthday?</Typography>
        <Typography component="p" color="primary">
          {birthdayToString()}
        </Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">Which province do you reside in?</Typography>
        <Typography component="p" color="primary">
          {provinces[province]}
        </Typography>
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">
          What is your ideal room temperature?
        </Typography>
        <Typography component="p" color="primary">
          {temperature + "°C"}
        </Typography>
      </Grid>
      
      <Box m={2} />
      <Grid item={true}>
        <TextField
          onChange={toCandidate}
          id="outlined-basic"
          label="Donate ETH to your candidate (optional)"
          variant="outlined"
          value={candidateAmt}
          fullWidth
        />
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <TextField
          onChange={toCharity}
          id="outlined-basic"
          label="Donate ETH to your charity (optional)"
          variant="outlined"
          value={charityAmt}
          fullWidth
        />
      </Grid>
      <Box m={2} />
      <Grid container={true} direction="column" alignItems="center">
        <Grid item={true}>
          <Button
            onClick={submission}
            disabled={isValid()}
            variant="contained"
            color="primary"
            size="large"
          >
            <DoneAllIcon />
            CAST VOTES
          </Button>
        </Grid>
        <Box m={1} />
        <Grid item={true}>
          <Button
            variant="outlined"
            onClick={e => {
              history.push("/voting/3");
            }}
            size="small"
          >
            GO BACK
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
