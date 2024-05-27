import React, { useState } from "react";
import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import SettingsForm from "../components/SettingsForm";
import { createURL, fetchRequest } from "../util/network";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function SettingsPage({ api_key }) {
  const styles = useStyles();
  const emailState = useState("");

  console.log(api_key);

  const updateSettings = () => {
    console.log("updating settings");

    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    let update_settings_url = createURL("/users/update");
    fetchRequest({
      url: update_settings_url,
      method: "PUT",
      body: {
        api_key,
        email: emailState[0],
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(() => {
        console.log("Settings updated successfully");
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  };

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        // @ts-expect-error TS(2769): No overload matches this call.
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Paper>
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
              <SettingsForm
                emailState={emailState}
                updateSettings={updateSettings}
              />
            </Paper>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SettingsPage);
