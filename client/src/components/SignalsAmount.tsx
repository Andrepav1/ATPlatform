import React from "react";
import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import { BUY_GREEN, SELL_RED } from "../util/colors";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 40,
  },
  padding: {
    padding: theme.spacing(2),
  },
  text: {
    marginTop: 4,
    marginLeft: 4,
    marginRight: 10,
  },
  lastText: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 4,
  },
}));

export default function SignalsAmount({
  type,
  minSignals,
  setMinSignals,
  maxSignals,
}) {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="row"
        justifyItems="space"
        className={styles.padding}
      >
        <Typography className={styles.text} noWrap>
          <b
            style={{
              backgroundColor: type === "BUY" ? BUY_GREEN : SELL_RED,
              padding: 4,
              borderRadius: 4,
              color: "white",
              marginRight: 8,
            }}
          >
            {type}
          </b>
          {"Minimum signals: "}
        </Typography>
        <TextField
          type="number"
          InputProps={{
            inputProps: { min: 0, max: maxSignals },
          }}
          className={styles.textField}
          value={minSignals}
          onChange={({ target: { value } }) => setMinSignals(value)}
          variant="standard"
        />
        <Typography className={styles.lastText} noWrap>
          out of {maxSignals}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
