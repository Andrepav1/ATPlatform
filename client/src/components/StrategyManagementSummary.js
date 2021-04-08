import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Title from "./Title";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  },
  labelPadding: {
    paddingLeft: 16,
    paddingTop: 10,
  },
}));

export default function StrategyManagementSummary({
  autoRiskManagement,
  setAutoRiskManagement,
  RRR,
  setRRR,
  lotSize,
  setLotSize,
  signalCooldown,
  setSignalCooldown,
}) {
  const styles = useStyles();

  const setAutoRiskManagementHandler = (checked) => {
    setAutoRiskManagement(checked);
    if (checked) {
      setRRR("auto");
    }
  };

  const getSignalCooldownItems = () => {
    let items = [];
    let maxCandles = 50;
    for (var i = 1; i <= maxCandles; i++) {
      items.push(i);
    }
    return items.map((n) => (
      <MenuItem key={uuid()} value={n.toString()}>
        {n + (n === 0 ? " candle" : " candles")}
      </MenuItem>
    ));
  };

  return (
    <React.Fragment>
      <div className={styles.padding}>
        <Title>Strategy Management</Title>

        {/* <b style={{ backgroundColor: BUY_GREEN, padding: 4, borderRadius: 4, color: "white", marginLeft: 8 }}>{"BUY"}</b>
        <b style={{ backgroundColor: SELL_RED, padding: 4, borderRadius: 4, color: "white", marginLeft: 8 }}>{"SELL"}</b> */}

        <FormControl fullWidth className={styles.margin}>
          <InputLabel className={styles.labelPadding}>
            Trading Strategy
          </InputLabel>
          <Select fullWidth defaultValue={"0"} variant="filled">
            <MenuItem value={"0"}>
              Open a new position anytime a signal occurs and close all open
              positions of inverse direction
            </MenuItem>
            {/* <MenuItem value={"1"}>
              Open at maximum one position anytime a signal occurs or close open position of inverse direction
            </MenuItem> */}
          </Select>
        </FormControl>

        <FormControl fullWidth className={styles.margin}>
          <TextField
            label="Tradable Lot Size"
            fullWidth
            value={lotSize}
            onChange={({ target: { value } }) => setLotSize(value)}
            variant="filled"
          />
        </FormControl>

        <FormControl fullWidth className={styles.margin}>
          <InputLabel className={styles.labelPadding}>
            Signal Cooldown
          </InputLabel>
          <Select
            fullWidth
            value={signalCooldown}
            variant="filled"
            onChange={({ target: { value } }) => setSignalCooldown(value)}
          >
            <MenuItem key={uuid()} value={"0"}>
              No cooldown
            </MenuItem>
            {getSignalCooldownItems()}
          </Select>
        </FormControl>

        <FormControl fullWidth className={styles.margin}>
          <InputLabel className={styles.labelPadding}>
            Risk-reward Ratio
          </InputLabel>
          <Select
            fullWidth
            value={RRR}
            onChange={({ target: { value } }) => setRRR(value)}
            variant="filled"
            disabled={autoRiskManagement}
          >
            <MenuItem value={"auto"}>auto</MenuItem>
            <MenuItem value={"1"}>1:1</MenuItem>
            <MenuItem value={"1.5"}>1.5:1</MenuItem>
            <MenuItem value={"2"}>2:1</MenuItem>
            <MenuItem value={"3"}>3:1</MenuItem>
            <MenuItem value={"5"}>5:1</MenuItem>
            <MenuItem value={"8"}>8:1</MenuItem>
            <MenuItem value={"10"}>10:1</MenuItem>
            <MenuItem value={"15"}>15:1</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={autoRiskManagement}
              onChange={({ target: { checked } }) =>
                setAutoRiskManagementHandler(checked)
              }
              color="primary"
            />
          }
          label="Do not use Risk-Reward Ratio"
        />
      </div>
    </React.Fragment>
  );
}
