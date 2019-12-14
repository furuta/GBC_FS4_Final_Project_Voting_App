import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function SummaryPage({ favoriteCandidate, happyWithProgress, birthday, province, temperature}) {
  return(
    <Grid container={true} direction="column">
      <Grid item={true}>
        <Typography component="h2">Summary Page</Typography>
      </Grid>
      <Box m={1} />
      <Grid item={true}>
        <Typography component="p">Birthday</Typography>
        <Typography component="p">{birthday}</Typography>
        
      </Grid>
      <Box m={2} />
      <Grid item={true} >
        <Typography component="p">Province</Typography>
        <Typography component="p">{province}</Typography>
        <Box m={2} />
        
        
      </Grid>
    </Grid>
  ) ;
}
