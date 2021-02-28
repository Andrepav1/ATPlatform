import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import Title from './Title';
import uuid from 'react-uuid';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  }
}));

export default function StrategyRiskSummary() {

  const styles = useStyles();

  const [autoRiskManagement, setAutoRiskManagement] = useState(false)
  const [RRR, setRRR] = useState()
  
  return (
    <React.Fragment>
      <div className={styles.padding}>
        <Title>Risk Management</Title>
        <FormControl fullWidth className={styles.margin}>
          <InputLabel className={styles.labelPadding}>Risk-reward Ratio</InputLabel>
          <Select
            key={uuid()}
            fullWidth
            defaultValue={"None"}
            value={RRR}
            onChange={({ target: { value } }) => setRRR(value)}
            variant="filled"
            disabled={autoRiskManagement}
          >
            <MenuItem value={"None"}>None</MenuItem>
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
              onChange={({ target: {checked} }) => setAutoRiskManagement(checked)} 
              color="primary" 
            />}
          label="Auto Risk Management"
        />
      </div>
    </React.Fragment>
  );
}