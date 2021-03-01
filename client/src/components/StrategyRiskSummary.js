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

  const [autoRiskManagement, setAutoRiskManagement] = useState(true)
  const [RRR, setRRR] = useState("")

  const setAutoRiskManagementHandler = (checked) => {
    setAutoRiskManagement(checked);
    if(checked) {
      setRRR("");
    }
  }
  
  return (
    <React.Fragment>
      <div className={styles.padding}>
        <Title>Risk Management</Title>
        <FormControl fullWidth className={styles.margin}>
          <InputLabel className={styles.labelPadding}>Risk-reward Ratio</InputLabel>
          <Select
            key={uuid()}
            fullWidth
            value={RRR}
            onChange={({ target: { value } }) => setRRR(value)}
            variant="filled"
            disabled={autoRiskManagement}
          >
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
              onChange={({ target: {checked} }) => setAutoRiskManagementHandler(checked)} 
              color="primary" 
            />}
          label="Auto Risk Management"
        />
      </div>
    </React.Fragment>
  );
}