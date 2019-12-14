import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";

import Page1 from "./VotingPage1";
import Page2 from "./VotingPage2";
import Page3 from "./VotingPage3";
import SummaryPage from "./SummaryPage";

export default function Voting() {
  let { page } = useParams();
  const history = useHistory();

  const [favoriteCandidate, setFavoriteCandidate] = React.useState(null);
  const [happyWithProgress, setHappyWithProgress] = React.useState(null);
  const [birthday, setBirthday] = React.useState(null);
  const [province, setProvince] = React.useState("");
  const [temperature, setTemperature] = React.useState(null);

  const disabledPrevious = () => {
    switch (page.toString()) {
      case "1":
        return true;
      case "2":
        return false;
      case "3":
        return false;
      default:
        return;
    }
  };
  const disabledNext = () => {
    switch (page.toString()) {
      case "1":
        return !favoriteCandidate || !happyWithProgress;
      case "2":
        return !birthday || !province;
      case "3":
        return false; //temperature === null;
      default:
        return;
    }
  };
  const colorNext = () => {
    if (page.toString() === "3") {
      return "primary";
    }
    return "";
  };
  const onClickPrevious = e => {
    switch (page.toString()) {
      case "2":
        history.push("/voting/1");
        break;
      case "3":
        history.push("/voting/2");
        break;
      case "summary":
        history.push("/voting/3");
        break;
      default:
        break;
    }
  };
  const onClickNext = e => {
    switch (page.toString()) {
      case "1":
        history.push("/voting/2");
        break;
      case "2":
        history.push("/voting/3");
        break;
      case "3":
        history.push("/voting/summary");
        break;
      default:
        break;
    }
  };

  return (
    <Grid container={true} direction="column">
      {page === "1" && (
        <Page1
          favoriteCandidate={favoriteCandidate}
          happyWithProgress={happyWithProgress}
          setFavoriteCandidate={setFavoriteCandidate}
          setHappyWithProgress={setHappyWithProgress}
        />
      )}
      {page === "2" && (
        <Page2
          birthday={birthday}
          setBirthday={setBirthday}
          province={province}
          setProvince={setProvince}
        />
      )}
      {page === "3" && (
        <Page3 temperature={temperature} setTemperature={setTemperature} />
      )}
      {page === "summary" && (
        <SummaryPage
          favoriteCandidate={favoriteCandidate}
          birthday={birthday}
          province={province}
          happyWithProgress={happyWithProgress}
          temperature={temperature}
        />
      )}
      <Box m={2} />
      <Divider />
      <Box m={1} />
      <Grid container={true} direction="row" justify="space-between">
        <Button
          disabled={disabledPrevious()}
          onClick={onClickPrevious}
          variant="contained"
        >
          PREVIOUS
        </Button>

        <Button
          disabled={disabledNext()}
          onClick={e => onClickNext(e)}
          variant="contained"
          color={colorNext()}
        >
          NEXT
        </Button>
      </Grid>
    </Grid>
  );
}
