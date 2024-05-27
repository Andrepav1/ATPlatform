import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import uuid from "react-uuid";

import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  labelPadding: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}));

export default function BacktestingSummary({
  strategies,
  instruments,
  strategyState,
  chartPeriodState,
  instrumentState,
}) {
  const styles = useStyles();

  const [activeStrategy, setActiveStrategy] = strategyState;
  const [chartPeriod, setChartPeriod] = chartPeriodState;
  const [activeInstrument, setActiveInstrument] = instrumentState;

  const handleRunBacktesting = () => {
    console.log("run backtesting");
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "USD":
        return "$";
      default:
        return "";
    }
  };

  return (
    <div>
      <Title>Backtesting</Title>

      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <FormControl fullWidth className={styles.margin}>
        <InputLabel className={styles.labelPadding}>Strategy</InputLabel>
        <Select
          variant="filled"
          fullWidth
          value={activeStrategy ? activeStrategy.name : ""}
        >
          {strategies &&
            strategies.map((strategy) => (
              <MenuItem
                key={uuid()}
                value={strategy.name}
                onClick={() => setActiveStrategy(strategy)}
              >
                {strategy.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <FormControl fullWidth className={styles.margin}>
        <InputLabel className={styles.labelPadding}>Instrument</InputLabel>
        <Select
          fullWidth
          id="activeInstruments"
          variant="filled"
          value={activeInstrument}
          onChange={({ target: { value } }) => setActiveInstrument(value)}
        >
          {instruments &&
            instruments.map((instrument) => (
              <MenuItem key={uuid()} value={instrument.name}>
                {instrument.displayName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <FormControl key={uuid()} fullWidth className={styles.margin}>
        <InputLabel className={styles.labelPadding}>Chart Period</InputLabel>
        // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        <Select
          fullWidth
          value={chartPeriod}
          defaultValue={"H1"}
          onChange={({ target: { value } }) => setChartPeriod(value)}
          variant="filled"
        >
          <MenuItem value={"M1"}>M1</MenuItem>
          <MenuItem value={"M5"}>M5</MenuItem>
          <MenuItem value={"M15"}>M15</MenuItem>
          <MenuItem value={"M30"}>M30</MenuItem>
          <MenuItem value={"H1"}>H1</MenuItem>
          <MenuItem value={"H4"}>H4</MenuItem>
          <MenuItem value={"D1"}>D1</MenuItem>
        </Select>
      </FormControl>

      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <FormControl key={uuid()} fullWidth className={styles.margin}>
        <InputLabel className={styles.labelPadding}>Candles amount</InputLabel>
        <Select fullWidth defaultValue={"5000"} variant="filled">
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <MenuItem value={"5000"}>5000 Candles</MenuItem>
        </Select>
      </FormControl>

      <Button
        fullWidth
        onClick={() => handleRunBacktesting()}
        color="primary"
        variant="contained"
      >
        Run Backtesting
      </Button>
    </div>
  );
}
