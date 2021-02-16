import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


export default function FormDialog({ indicators, open, setOpen, confirmIndicator }) {

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

  const isSelected = (indicator) => {
    if(!currentIndicator) return false;
    return currentIndicator.name === indicator.name;
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Technical Indicator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select
          </DialogContentText>
          <Select autoFocus fullWidth>
            {
              indicators.map((indicator) => (
                <MenuItem key={indicator.name} onClick={() => setCurrentIndicator(indicator)} selected={isSelected(indicator)}>{indicator.name}</MenuItem>
              ))
            }
          </Select>
          <TextField fullWidth/>
          <DialogContentText>{"currentIndicator.name"}</DialogContentText>
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