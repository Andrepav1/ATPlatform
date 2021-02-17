import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FormDialog({ indicators, open, setOpen, confirmIndicator }) {

  const styles = useStyles();
  const [currentIndicator, setCurrentIndicator] = useState()

  const handleConfirmIndicator = () => {
     setOpen(false);

     // TODO: create config object
     const currentConfig = {

     };

     confirmIndicator({
       name: currentIndicator.name,
       config: currentConfig
     })
  }

  const onConfigChangeHandler = () => {
    
  }

  const isSelected = (indicator) => {
    if(!currentIndicator) return false;
    return currentIndicator.name === indicator.name;
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Technical Indicator</DialogTitle>
        <DialogContent>
          <Select 
            variant="filled"
            autoFocus 
            fullWidth 
            value={currentIndicator?currentIndicator.name:""}
            className={styles.margin}
          >
            {
              indicators && 
              indicators.map((indicator) => (
                <MenuItem key={indicator.name} value={indicator.name} onClick={() => setCurrentIndicator(indicator)} selected={isSelected(indicator)}>{indicator.name}</MenuItem>
              ))
            }
          </Select>
          {
            currentIndicator &&
            currentIndicator.config.map((data) => {
              if(data.type === "boolean") {
                return (
                  <Checkbox 
                    key={data.name}
                    onChange={() => {}} 
                    color="primary" 
                    className={styles.margin}
                  />)
              }
              else {
                return (
                  <TextField
                    key={data.name}
                    fullWidth
                    label={data.name}
                    type={data.type==="int"?"number":"text"}
                    className={styles.margin}
                    onChange={onConfigChangeHandler}
                    variant="filled"
                    defaultValue={data.defaultValue}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )
              }
            })
          }
          {
            currentIndicator && 
            currentIndicator.signalConfig.map((data) => {

              if(data.name === "candlesSize") {
                return (
                  <Select fullWidth className={styles.margin} variant="filled">
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"15"}>15</MenuItem>
                    <MenuItem value={"30"}>30</MenuItem>
                    <MenuItem value={"1H"}>1H</MenuItem>
                    <MenuItem value={"4H"}>4H</MenuItem>
                    <MenuItem value={"1D"}>1D</MenuItem>
                  </Select>
                )
              }
              else {
                return (
                  <TextField
                    key={data.name}
                    fullWidth
                    label={data.name}
                    type={data.type==="int"?"number":"text"}
                    className={styles.margin}
                    variant="filled"
                  />
                )
              }
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmIndicator()} color="primary" variant="contained" disabled={!currentIndicator}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}