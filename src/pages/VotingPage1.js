import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { CANDIDATE_NAME, HAPPINESS_LABEL } from "../constants";

export default function Page1({
  favoriteCandidate,
  happyWithProgress,
  setFavoriteCandidate,
  setHappyWithProgress
}) {
  const onChangeCandidate = e => {
    setFavoriteCandidate(e.target.value);
    
  };
  const onChangeHappy = e => {
    setHappyWithProgress(e.target.value);
    
  };
  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography variant="h3">Part 1</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">Who is your favorite candidate?</Typography>
        <RadioGroup
          aria-label="candidate"
          name="candidate"
          defaultValue={favoriteCandidate}
          onChange={onChangeCandidate}
        >
          {Object.keys(CANDIDATE_NAME).map(key => (
            <FormControlLabel
              key={key}
              value={key}
              control={<Radio color="primary" />}
              label={CANDIDATE_NAME[key]}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">
          How happy are you with the current progress?
        </Typography>
        <RadioGroup
          aria-label="happy"
          name="happy"
          defaultValue={happyWithProgress}
          onChange={onChangeHappy}
        >
          {Object.keys(HAPPINESS_LABEL).map(key => (
            <FormControlLabel
              key={key}
              value={key}
              control={<Radio color="primary" />}
              label={HAPPINESS_LABEL[key]}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
