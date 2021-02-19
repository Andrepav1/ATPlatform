import React, { useState } from 'react';
import uuid from 'react-uuid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  labelPadding: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  confirmButton: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  timePicker: {
    margin: theme.spacing(2),
  }
}));

export default function BotDialog({ strategies, instruments, open, setOpen, confirmBot, editStrategy }) {

  const styles = useStyles();
  const [name, setName] = useState();
  const [activeStrategy, setActiveStrategy] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [activeInstruments, setActiveInstruments] = useState([]);
  const [alwaysOn, setAlwaysOn] = useState(false);
  
  const setStrategyHandler = (strategy) => {
    setActiveStrategy(strategy);
  }

  const handleConfirmBot = () => {

    if(!activeStrategy) {
      return alert("You need to select a strategy first");
    }
    
    if(activeInstruments.length === 0) {
      return alert("You need to select at least an instrument");
    }

    if(!name) {
      return alert("You need to select a name");
    }

    if(alwaysOn) {
      setEndTime(null);
      setStartTime(null);
    }

    let bot = {
      name,
      activeStrategy: { id: activeStrategy._id, name: activeStrategy.name },
      startTime,
      endTime,
      instruments: activeInstruments
    }
    
    confirmBot(bot);
  }
  
  const handleSelectInstrument = ({ target: { value }}) => {
    setActiveInstruments(value);
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">New Bot</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            key={uuid()}
            fullWidth
            label={"Name"}
            value={name}
            className={styles.margin}
            onChange={({ target: { value }}) => setName(value)}
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth className={styles.margin}>
            <InputLabel className={styles.labelPadding}>Active Strategy</InputLabel>
            <Select 
              variant="filled" 
              fullWidth 
              value={activeStrategy?activeStrategy.name:""}
            >
              {
                strategies && 
                strategies.map((strategy) => (
                  <MenuItem key={uuid()} value={strategy.name} onClick={() => setStrategyHandler(strategy)} >{strategy.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth className={styles.margin}>
            <InputLabel className={styles.labelPadding}>Active Instruments</InputLabel>
            <Select
              className={styles.margin}
              fullWidth 
              multiple
              id="activeInstruments"
              variant="filled"
              value={activeInstruments}
              onChange={handleSelectInstrument}
              MenuProps={{
                getContentAnchorEl: null
              }}
            >
            {
              instruments && 
              instruments.map((instrument) => (
                <MenuItem key={uuid()} value={instrument.name}>{instrument.displayName}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox 
                checked={alwaysOn} 
                onChange={({ target: {checked} }) => setAlwaysOn(checked)} 
                color="primary" 
              />}
            label="Always On"
          />
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                disabled={alwaysOn}
                className={styles.timePicker}
                id="time-picker"
                label="Start Time"
                value={startTime}
                onChange={(time) => setStartTime(time)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                disabled={alwaysOn}
                className={styles.timePicker}
                id="time-picker"
                label="End Time"
                value={endTime}
                onChange={(time) => setEndTime(time)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="outlined" className={styles.button}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmBot()} color="primary" variant="contained" className={styles.confirmButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}