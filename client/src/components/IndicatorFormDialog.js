import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

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
  }
}));

export default function IndicatorFormDialog({ indicators, open, setOpen, confirmIndicator, editingIndicator, setEditingIndicator }) {

  const styles = useStyles();
  const [currentIndicator, setCurrentIndicator] = useState()
  const [currentConfig, setCurrentConfig] = useState()
  const [currentSignalConfig, setCurrentSignalConfig] = useState()

  useEffect(() => {
    
    if(editingIndicator) { // Editing TODO

      let newIndicator = indicators.find((element) => element.name === editingIndicator.name);
      setCurrentIndicator(newIndicator);
      setCurrentConfig(editingIndicator.config);
      setCurrentSignalConfig(editingIndicator.signalConfig);
    }
  }, [editingIndicator, indicators])

  const handleCancel = () => {
    setEditingIndicator(null);
    setOpen(false);
  }

  const setCurrentIndicatorHandler = (indicator) => {
    
    let config = {}
    let signalConfig = {}
    
    indicator.config.forEach((data) => config[data.name] = data["defaultValue"])
    indicator.signalConfig.forEach((data) => signalConfig[data.name] = data["defaultValue"])

    setCurrentIndicator(indicator);
    setCurrentConfig(config);
    setCurrentSignalConfig(signalConfig);
  }

  const handleConfigChange = (key, value) => {
    const newConfig = currentConfig;
    newConfig[key] = value
    setCurrentConfig(newConfig)
  }

  const handleSignalConfigChange = (key, value) => {
    const newSignalConfig = currentSignalConfig;
    newSignalConfig[key] = value
    setCurrentSignalConfig(newSignalConfig)
  }

  const handleConfirmIndicator = () => {
     setOpen(false);

     confirmIndicator({
       name: currentIndicator.name,
       config: currentConfig,
       signalConfig: currentSignalConfig
     })
  }

  const isSelected = (indicator) => {
    if(!currentIndicator) return false;
    return currentIndicator.name === indicator.name;
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">New Technical Indicator</DialogTitle>
        <DialogContent>
          <FormControl fullWidth className={styles.margin}>
            <InputLabel className={styles.labelPadding}>Technical Indicator</InputLabel>
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
                  <MenuItem key={uuid()} value={indicator.name} onClick={() => setCurrentIndicatorHandler(indicator)} selected={isSelected(indicator)}>{indicator.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          {
            currentIndicator &&
            currentIndicator.config.map((data) => {

              if(data.type === "boolean") {
                return (
                  <Checkbox 
                    key={uuid()}
                    onChange={() => {}} 
                    color="primary" 
                    className={styles.margin}
                  />
                )
              }
              else {
                return (
                  <TextField
                    id={data.name}
                    key={uuid()}
                    fullWidth
                    label={data.name}
                    type={data.type==="int"?"number":"text"}
                    className={styles.margin}
                    onChange={({ target: { id, value }}) => handleConfigChange(id,value)}
                    variant="filled"
                    defaultValue={data.defaultValue.toString()}
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
                  <FormControl key={uuid()} fullWidth className={styles.margin}>
                    <InputLabel className={styles.labelPadding}>Candle Size</InputLabel>
                    <Select
                      
                      fullWidth
                      defaultValue={data.defaultValue}
                      onChange={({ target: { value } }) => handleSignalConfigChange("candlesSize", value)}
                      variant="filled"
                    >
                      <MenuItem value={"M5"}>M5</MenuItem>
                      <MenuItem value={"M15"}>M15</MenuItem>
                      <MenuItem value={"M30"}>M30</MenuItem>
                      <MenuItem value={"H1"}>H1</MenuItem>
                      <MenuItem value={"H4"}>H4</MenuItem>
                      <MenuItem value={"D1"}>D1</MenuItem>
                    </Select>
                  </FormControl>
                )
              }
              else {
                return (
                  <TextField
                    id={data.name}
                    key={uuid()}
                    fullWidth
                    label={data.name}
                    type={data.type==="int"?"number":"text"}
                    className={styles.margin}
                    defaultValue={data.defaultValue}
                    variant="filled"
                  />
                )
              }
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="primary" variant="outlined" className={styles.button}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmIndicator()} color="primary" variant="contained" disabled={!currentIndicator} className={styles.confirmButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}