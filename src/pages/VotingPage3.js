import React from "react";
import "../App.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

export default function Page3({ temperature, setTemperature }) {
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

  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography variant="h3">Part 3</Typography>
      </Grid>
      <Grid item={true}>
        <Typography id="discrete-slider-always" component="p" gutterBottom>
          What is your ideal room temperature?
        </Typography>
      </Grid>
      <Box m={4} />
      <Grid item={true}>
        <Slider
          defaultValue={temperature}
          getAriaValueText={value => setTemperature(value)}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          marks={marks}
        />
      </Grid>
    </Grid>
  );
}
