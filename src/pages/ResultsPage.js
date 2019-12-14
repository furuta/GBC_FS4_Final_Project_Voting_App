import React from "react";
import firebase from "../fbConfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { PROVINCES, CANDIDATE_NAME, HAPPINESS_LABEL } from "../constants";
const db = firebase.firestore();

function culcAge(birthday) {
  const today = new Date();
  const targetdate =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const birthdate =
    birthday.getFullYear() * 10000 +
    (birthday.getMonth() + 1) * 100 +
    birthday.getDate();
  return Math.floor((targetdate - birthdate) / 10000);
}

export default function ResultsPage() {
  const [candidates, setCandidates] = React.useState(null);
  const [ages, setAges] = React.useState(null); //birthDates
  const [happiness, setHappiness] = React.useState(null);
  const [resideProvince, setResideProvince] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);

  const getStoreData = (collectionName, aggregator) => {
    db.collection(collectionName).onSnapshot(
      snapshot => {
        aggregator(snapshot);
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  const aggregateCandidates = snapshot => {
    let results = {};
    snapshot.forEach(doc => {
      const label = CANDIDATE_NAME[doc.id];
      results[label] = doc.data().votes;
    });
    //TODO: Sort items by key
    setCandidates(results);
  };

  const aggregateBirthDates = snapshot => {
    let results = {
      "19 or less": 0,
      "20 to 29": 0,
      "30 to 39": 0,
      "40 to 49": 0,
      "50 or more": 0
    };
    snapshot.forEach(doc => {
      const birthday = new Date(doc.data().date.seconds * 1000);
      const age = culcAge(birthday);
      if (age < 20) {
        results["19 or less"] += 1;
      } else if (age < 30) {
        results["20 to 29"] += 1;
      } else if (age < 40) {
        results["30 to 39"] += 1;
      } else if (age < 50) {
        results["40 to 49"] += 1;
      } else {
        results["50 or more"] += 1;
      }
    });
    setAges(results);
  };

  const aggregateHappiness = snapshot => {
    let results = {};
    snapshot.forEach(doc => {
      const label = HAPPINESS_LABEL[doc.id];
      results[label] = doc.data().votes;
    });
    //TODO: Sort items by key
    setHappiness(results);
  };
  const aggregateProvince = snapshot => {
    let results = {};
    let provinces = {};
    PROVINCES.map(v => (provinces[v.code] = v.name));
    snapshot.forEach(doc => {
      const label = provinces[doc.id];
      results[label] = doc.data().votes;
    });
    //TODO: Sort items by key
    setResideProvince(results);
  };
  const aggregateTemperature = snapshot => {
    let results = {};
    snapshot.forEach(doc => {
      results[`${doc.id}℃`] = doc.data().votes;
    });
    //TODO: Sort items by key
    setTemperature(results);
  };

  React.useEffect(() => {
    getStoreData("candidates", aggregateCandidates);
    getStoreData("birthDates", aggregateBirthDates);
    getStoreData("happiness", aggregateHappiness);
    getStoreData("resideProvince", aggregateProvince);
    getStoreData("temperature", aggregateTemperature);
  }, []);

  if (
    candidates === null ||
    ages === null ||
    happiness === null ||
    resideProvince === null ||
    temperature === null
  ) {
    return (
      <div className="Loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography variant="h3">Results</Typography>
      </Grid>
      <Box m={1} />
      <Result label="Favorite candidate:" votes={candidates} />
      <Box m={1} />
      <Result label="Progress:" votes={happiness} />
      <Box m={1} />
      <Result label="Age groups:" votes={ages} />
      <Box m={1} />
      <Result label="Province:" votes={resideProvince} />
      <Box m={1} />
      <Result label="Ideal room temperature:" votes={temperature} />
    </Grid>
  );
}

function Result({ label, votes }) {
  return (
    <Grid item={true}>
      <Typography component="p">{label}</Typography>
      {Object.keys(votes).map(key => (
        <Typography component="p" color="primary" key={key}>
          {key}: {votes[key]}
        </Typography>
      ))}
    </Grid>
  );
}
