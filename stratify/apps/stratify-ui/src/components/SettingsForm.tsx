import React from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  },
}));

export default function SettingsForm({ emailState, updateSettings }) {
  const styles = useStyles();

  const [email, setEmail] = emailState;

  return (
    <React.Fragment>
      // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
      <div className={styles.padding}>
        <Title>Settings</Title>
        <TextField
          className={styles.margin}
          fullWidth
          label="Email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          variant="filled"
        />

        <Button
          fullWidth
          onClick={() => updateSettings()}
          color="primary"
          variant="contained"
          className={styles.margin}
        >
          Update
        </Button>
      </div>
    </React.Fragment>
  );
}
