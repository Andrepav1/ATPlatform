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
import { Divider, FormControl, InputAdornment, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { BUY_GREEN, SELL_RED } from '../util/colors'

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

    if(key === "period") {
      newConfig[key] = parseInt(value)
    }
    else {
      newConfig[key] = value
    }
    
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
            currentIndicator && (currentIndicator.config.length !== 0) &&
            <React.Fragment>
              <Divider variant="fullWidth" style={{ marginTop: 16, marginBottom: 4 }} />
              <Typography
                style={{ marginBottom: 20 }}
                color="textSecondary"
                display="block"
                variant="body1"
              >
                Technical Indicator Configuration
              </Typography>
            </React.Fragment>
          }

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
              else if(data.type === "enum") {
                return (
                  <FormControl key={uuid()} variant="outlined" fullWidth className={styles.margin}>
                    <InputLabel style={{ backgroundColor: "white", paddingLeft: 6, paddingRight: 6 }}>{data.name}</InputLabel>
                    <Select
                      fullWidth
                      defaultValue={data.defaultValue}
                      onChange={({ target: { value } }) => handleConfigChange(data.name, value)}
                    >
                      { data.enum.map((value) => <MenuItem value={value}>{value}</MenuItem>)}
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
                    type={data.type}
                    className={styles.margin}
                    onChange={({ target: { id, value }}) => handleConfigChange(id,value)}
                    variant="outlined"
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
            currentIndicator && (currentIndicator.signalConfig.length !== 0) &&
            <React.Fragment>
              <Divider variant="fullWidth" style={{ marginTop: 16, marginBottom: 4 }} />
              <Typography
                style={{ marginBottom: 20 }}
                color="textSecondary"
                display="block"
                variant="body1"
              >
                Signal Configuration
              </Typography>
            </React.Fragment>
          }

          {
            currentIndicator && 
            currentIndicator.signalConfig.map((data) => {

              if(data.name === "keepSignalFor") {
                return (
                  <FormControl key={uuid()} variant="outlined" fullWidth className={styles.margin}>
                    <InputLabel style={{ backgroundColor: "white", paddingLeft: 6, paddingRight: 6 }}>Keep Signal For</InputLabel>
                    <Select
                      fullWidth
                      defaultValue={data.defaultValue}
                      onChange={({ target: { value } }) => handleSignalConfigChange("keepSignalFor", value)}
                    >
                      <MenuItem value={1}>1 candle</MenuItem>
                      <MenuItem value={2}>2 candles</MenuItem>
                      <MenuItem value={3}>3 candles</MenuItem>
                      <MenuItem value={4}>4 candles</MenuItem>
                      <MenuItem value={5}>5 candles</MenuItem>
                      <MenuItem value={6}>6 candles</MenuItem>
                      <MenuItem value={7}>7 candles</MenuItem>
                      <MenuItem value={8}>8 candles</MenuItem>
                      <MenuItem value={9}>9 candles</MenuItem>
                      <MenuItem value={10}>10 candles</MenuItem>
                    </Select>
                  </FormControl>
                )
              }
              else if (data.name === "buySignal") {
                return (
                  <TextField
                    fullWidth
                    id={data.name}
                    label={data.label}
                    type={data.type}
                    className={styles.margin}
                    defaultValue={data.defaultValue}
                    onChange={({ target: { value } }) => handleSignalConfigChange("buySignal", value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <b style={{ backgroundColor: BUY_GREEN, padding: 6, borderRadius: 4, color: "white", fontSize: 14 }}>{"BUY"}</b>
                        </InputAdornment>
                      )
                    }}
                  />
                )
              }
              else if (data.name === "sellSignal") {
                return (
                  <TextField
                    fullWidth
                    id={data.name}
                    label={data.label}
                    type={data.type}
                    className={styles.margin}
                    defaultValue={data.defaultValue}
                    onChange={({ target: { value } }) => handleSignalConfigChange("sellSignal", value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <b style={{ backgroundColor: SELL_RED, padding: 6, borderRadius: 4, color: "white", fontSize: 14 }}>{"SELL"}</b>
                        </InputAdornment>
                      )
                    }}
                  />
                );
              }
              else {
                return (
                  <TextField
                    id={data.name}
                    key={uuid()}
                    fullWidth
                    label={data.name}
                    type={data.type}
                    className={styles.margin}
                    defaultValue={data.defaultValue}
                    variant="filled"
                  />
                );
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