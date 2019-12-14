import React from "react";
import { useHistory, Link as RouterLink } from 'react-router-dom';
import "../App.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { temperature, setTemperature } from "../constants";



export default function Page3({temperature, setTemperature}){
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
    window.localStorage.setItem("temperature", temperature);
  };
  const onClickPrev = () => {
    history.goBack();
  };

  function setTemp(value) {
    console.log(value);
    return marks.findIndex(mark => mark.value === value) + 1;
  }
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Grid container={true} direction="column">
        <Grid item={true}>
          <Typography id="discrete-slider-always" gutterBottom>
          <h2>Temperature</h2>
          </Typography>
        </Grid>
        <Box m={4} />
        <Grid item={true} >
          <Slider
            defaultValue={null}
            getAriaValueText={value => setTemperature(value)}
            aria-labelledby="discrete-slider-always"
            step={1}
            valueLabelDisplay="on"
            marks={marks}
          />
        </Grid>

      </Grid>
      

      
      
        {/* <Grid containerspacing={1} alignContent="right">
          <Box m={1} />
          <Button
            disabled={!temperature}
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
            disabled={temperature}
            variant="contained"
            color="primary"
            onClick={onClickPrev}
          >
            Previous
          </Button>
        </Grid> */}
      
    </div>
  );
}


