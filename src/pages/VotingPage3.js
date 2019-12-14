import React from "react";
import "../App.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { temperature, setTemperature } from "../constants";



export default function Page3({temperature, setTemperature}){
  return <div>VotingPage3</div>;
}

function temperature(props) {
  const history = useHistory();
  const useStyles = makeStyles(theme => ({
    root: {
      width: 300
    },
    margin: {
      height: theme.spacing(3)
    }
  }));

  const marks = [
    {
      value: 0,
      label: "0°C"
    },
    {
      value: 20,
      label: "20°C"
    },
    {
      value: 37,
      label: "37°C"
    },
    {
      value: 100,
      label: "100°C"
    }
  ];

  const onClickNext = () => {
    history.push("/voting/SummaryPage");
    window.localStorage.setItem("temperature", props.temperature);
  };
  const onClickPrev = () => {
    history.goBack();
  };

  function setTemperature(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
  }
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Link to="/" component={RouterLink}>
        Back to start
      </Link>
      <Typography id="discrete-slider-always" gutterBottom>
        <h2>Temperature</h2>
      </Typography>
      <Box m={10} />

      <Slider
        defaultValue={null}
        getAriaValueText={value => props.setTemperature(value)}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="on"
        marks={marks}
      />
      <div>
        <Grid containerspacing={1} alignContent="right">
          <Box m={1} />
          <Button
            disabled={!props.temperature}
            variant="contained"
            color="primary"
            onClick={onClickNext}
          >
            Next
          </Button>
        </Grid>
      </div>

      <div>
        <Grid alignItems="left">
          <Box m={1} />
          <Button
            align
            disabled={props.temperature}
            variant="contained"
            color="primary"
            onClick={onClickPrev}
          >
            Previous
          </Button>
        </Grid>
      </div>
    </div>
  );
}
)

