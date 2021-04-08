import React, { useState } from "react";
import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import SettingsForm from "../components/SettingsForm";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function SettingsPage() {
  const styles = useStyles();
  const emailState = useState("");

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Paper>
              <SettingsForm emailState={emailState} />
            </Paper>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SettingsPage;
