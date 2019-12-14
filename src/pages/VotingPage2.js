import React from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { PROVINCES } from "../constants";

export default function Page2({
  birthday,
  setBirthday,
  province,
  setProvince
}) {
  return (
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography variant="h3">Part 2</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">When is your birthday?</Typography>
        <BirthayDate birthday={birthday} setBirthday={setBirthday} />
      </Grid>
      <Box m={2} />
      <Grid item={true}>
        <Typography component="p">Which province do you reside in?</Typography>
        <Box m={2} />
        <ProvinceSelect province={province} setProvince={setProvince} />
      </Grid>
    </Grid>
  );
}

function BirthayDate({ birthday, setBirthday }) {
  const handleDateChange = date => {
    setBirthday(date);
    console.log(birthday);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="MM/dd/yyyy"
          value={birthday}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

function ProvinceSelect({ province, setProvince }) {
  const handleChange = event => {
    setProvince(event.target.value);
    console.log(province);
  };

  return (
    <FormControl variant="outlined" fullWidth required>
      <Select onChange={handleChange} value={province}>
        {PROVINCES.map((item, index) => (
          <MenuItem key={item.code} value={item.code}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
