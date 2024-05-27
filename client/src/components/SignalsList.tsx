import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BUY_GREEN, SELL_RED } from "../util/colors";
import { comparisons } from "../util/apiConstants";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3),
  },
  marginHorizontal: {
    marginRight: theme.spacing(1),
  },
  textField: {
    width: 60,
  },
}));

export default function SignalsList({
  signals,
  setSignals,
  type,
  indicator: { components },
}) {
  const styles = useStyles();

  const handleRemoveSignal = (signalId) => {
    setSignals(signals.filter(({ id }) => id !== signalId));
  };

  const handleAddSignal = () => {
    setSignals([
      ...signals,
      {
        id: uuid(),
        type,
        a: components[0],
        b: components[1],
        bN: 0,
        comparison: 0,
      },
    ]);
  };

  const handleSignalChange = (signalId, key, value) => {
    let newSignals = [...signals];
    for (let i = 0; i < newSignals.length; i++) {
      if (newSignals[i].id === signalId) {
        newSignals[i][key] = value;
      }
    }
    setSignals(newSignals);
  };

  const getSignalRow = (signal) => {
    return (
      <Grid item xs={12} key={uuid()}>
        <FormControl variant="standard" className={styles.marginHorizontal}>
          // @ts-expect-error TS(2769): No overload matches this call.
          <Select
            variant="standard"
            value={signal.a}
            onChange={({ target: { value } }) =>
              handleSignalChange(signal.id, "a", value)
            }
          >
            {
              // Allow all components apart from number
              components.map((comp) =>
                comp !== "number" && comp !== "price" ? (
                  <MenuItem key={uuid()} value={comp}>
                    {comp}
                  </MenuItem>
                ) : null
              )
            }
          </Select>
        </FormControl>

        <FormControl variant="standard" className={styles.marginHorizontal}>
          // @ts-expect-error TS(2769): No overload matches this call.
          <Select
            variant="standard"
            value={signal.comparison}
            onChange={({ target: { value } }) =>
              handleSignalChange(signal.id, "comparison", value)
            }
          >
            <MenuItem value={comparisons.LESS_THAN}>Less than</MenuItem>
            {/* <MenuItem value={comparisons.EQUALS}>Equals</MenuItem> */}
            <MenuItem value={comparisons.GREATER_THAN}>Greater than</MenuItem>
            <MenuItem value={comparisons.CROSS_DOWN}>Crosses below</MenuItem>
            <MenuItem value={comparisons.CROSS}>Crosses</MenuItem>
            <MenuItem value={comparisons.CROSS_UP}>Crosses above</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" className={styles.marginHorizontal}>
          // @ts-expect-error TS(2769): No overload matches this call.
          <Select
            variant="standard"
            value={signal.b}
            onChange={({ target: { value } }) =>
              handleSignalChange(signal.id, "b", value)
            }
          >
            {components.map((comp) => (
              <MenuItem key={uuid()} value={comp}>
                {comp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {signal.b === "number" && (
          <FormControl variant="standard" className={styles.textField}>
            // @ts-expect-error TS(2769): No overload matches this call.
            <TextField
              type="number"
              value={signal.bN}
              onChange={({ target: { value } }) =>
                handleSignalChange(signal.id, "bN", value)
              }
            />
          </FormControl>
        )}

        <Button
          variant="text"
          color="secondary"
          onClick={() => handleRemoveSignal(signal.id)}
        >
          {"x"}
        </Button>
      </Grid>
    );
  };

  if (signals.length === 0) {
    return (
      <Container className={styles.container}>
        // @ts-expect-error TS(2769): No overload matches this call.
        <Grid container justify="space-between">
          <Grid>
            // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
            <Typography className={styles.noSignals}>
              <b
                style={{
                  backgroundColor: type === "BUY" ? BUY_GREEN : SELL_RED,
                  padding: 6,
                  borderRadius: 4,
                  color: "white",
                  fontSize: 14,
                }}
              >
                {type}
              </b>
              {" Signal"}
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleAddSignal()}
            >
              {"+ New"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    <Container className={styles.container}>
      <Grid container justify="space-between">
        <Grid>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <Typography className={styles.noSignals}>
            <b
              style={{
                backgroundColor: type === "BUY" ? BUY_GREEN : SELL_RED,
                padding: 6,
                borderRadius: 4,
                color: "white",
                fontSize: 14,
              }}
            >
              {type}
            </b>
            {" when:"}
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleAddSignal()}
          >
            {"+ New"}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {signals.map((signal) => getSignalRow(signal))}
      </Grid>
    </Container>
  );
}
