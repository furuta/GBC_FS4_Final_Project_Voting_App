import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";

import Page1 from "./VotingPage1";
import Page2 from "./VotingPage2";
import Page3 from "./VotingPage3";
import Summary from "./SummaryPage";

export default function Voting() {
  let { page } = useParams();
  const history = useHistory();

  const [favoriteCandidate, setFavoriteCandidate] = React.useState(null);
  const [happyWithProgress, setHappyWithProgress] = React.useState(null);
  const [birthday, setBirthday] = React.useState(null);
  const [province, setProvince] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);

  const disabledPrevious = () => {
    return true;
  };
  const disabledNext = () => {
    return !favoriteCandidate || !happyWithProgress;
  };

  return (
    <Grid container={true} direction="column">
      {page == "1" && (
        <Page1
          setFavoriteCandidate={setFavoriteCandidate}
          setHappyWithProgress={setHappyWithProgress}
        />
      )}
      {page == "2" && <Page2 />}
      {page == "3" && <Page3 />}
      {page == "summary" && <Summary />}
      <Box m={2} />
      <Divider />
      <Grid item={true} direction="row">
        <Button disabled={disabledPrevious()}>PREVIOUS</Button>
        <Button
          disabled={disabledNext()}
          onClick={e => history.push("/voting/2")}
        >
          NEXT
        </Button>
      </Grid>
    </Grid>
  );
}
