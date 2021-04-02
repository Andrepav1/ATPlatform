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
import { Divider, FormControl, InputLabel, makeStyles, Typography } from '@material-ui/core';
import SignalsList from './SignalsList';

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

export default function IndicatorFormDialog(props) {

  const { 
    indicators, 
    open, 
    setOpen, 
    confirmIndicator, 
    editingIndicator, 
    setEditingIndicator 
  } = props;
  
  const styles = useStyles();
  
  // state
  const [currentIndicator, setCurrentIndicator] = useState()
  const [currentConfig, setCurrentConfig] = useState()
  const [buySignals, setBuySignals] = useState([]);
  const [sellSignals, setSellSignals] = useState([]);

  // ======================= 
  // SIGNAL EXAMPLE 
  // {
  //   type: "BUY",
  //   comparison: 2,
  //   a: "k",
  //   b: "price"
  //   bN: 0
  // }
  // =======================


  useEffect(() => {
    
    if(editingIndicator) { // Editing TODO

      let newIndicator = indicators.find((element) => element.name === editingIndicator.name);
      setCurrentIndicator(newIndicator);
      setCurrentConfig(editingIndicator.config);

      // Adding signals 
      for (let i = 0; i < editingIndicator.signals.length; i++) {
        if(editingIndicator.signals[i].type === "BUY") {
          setBuySignals(prevSignals => [...prevSignals, editingIndicator.signals[i]]);
        }
        else {
          setSellSignals(prevSignals => [...prevSignals, editingIndicator.signals[i]]);
        }
      }
    }
    
  }, [editingIndicator, indicators, setBuySignals, setSellSignals])

  const handleCancel = () => {
    setOpen(false);
    setEditingIndicator(null);
  }

  const setCurrentIndicatorHandler = (indicator) => {
    
    let config = {}

    indicator.config.forEach((data) => config[data.name] = data["defaultValue"])
    
    // reset signals 
    setSellSignals([]);
    setBuySignals([]);

    // set current data
    setCurrentIndicator(indicator);
    setCurrentConfig(config);
  }

  const handleConfigChange = (key, value) => {
    const newConfig = currentConfig;
    newConfig[key] = value
    setCurrentConfig(newConfig)
  }

  const handleConfirmIndicator = () => {

    if(sellSignals.length === 0 && buySignals.length === 0) {
      return alert("You need at least a signal.");
    }

     setOpen(false);

     confirmIndicator({
       name: currentIndicator.name,
       config: currentConfig,
       signals: [...sellSignals, ...buySignals]
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
                Configuration
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
                      defaultValue={currentConfig[data.name]?currentConfig[data.name]:data.defaultValue}
                      onChange={({ target: { value } }) => handleConfigChange(data.name, value)}
                    >
                      { data.enum.map((value) => <MenuItem key={uuid()} value={value}>{value}</MenuItem>)}
                    </Select>
                  </FormControl>
                )
              }
              else if(data.name === "keepSignalFor") {
                return null;
                // TEMPORARILY REMOVED: TO ADD LATER ON
                // return (
                //   <FormControl key={uuid()} variant="outlined" fullWidth className={styles.margin}>
                //     <InputLabel style={{ backgroundColor: "white", paddingLeft: 6, paddingRight: 6 }}>Keep Signal For</InputLabel>
                //     <Select
                //       fullWidth
                //       defaultValue={data.defaultValue}
                //       onChange={({ target: { value } }) => handleConfigChange(data.name, value)}
                //     >
                //       <MenuItem value={0}>Do not keep signal</MenuItem>
                //       <MenuItem value={1}>1 candle</MenuItem>
                //       <MenuItem value={2}>2 candles</MenuItem>
                //       <MenuItem value={3}>3 candles</MenuItem>
                //       <MenuItem value={4}>4 candles</MenuItem>
                //       <MenuItem value={5}>5 candles</MenuItem>
                //       <MenuItem value={6}>6 candles</MenuItem>
                //       <MenuItem value={7}>7 candles</MenuItem>
                //       <MenuItem value={8}>8 candles</MenuItem>
                //       <MenuItem value={9}>9 candles</MenuItem>
                //       <MenuItem value={10}>10 candles</MenuItem>
                //     </Select>
                //   </FormControl>
                // )
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
                    defaultValue={currentConfig[data.name]?currentConfig[data.name]:data.defaultValue.toString()}
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
            <React.Fragment>
              <Divider variant="fullWidth" style={{ marginTop: 16, marginBottom: 4 }} />
              <Typography
                style={{ marginBottom: 20 }}
                color="textSecondary"
                display="block"
                variant="body1"
              >
                Signal when (as a conjuction)
              </Typography>
            
            {
              // Can only have one type of signal for technical indicator
              sellSignals.length === 0 && 
              <SignalsList signals={buySignals} setSignals={setBuySignals} type={"BUY"} indicator={currentIndicator} />
            }

            {
              // Can only have one type of signal for technical indicator
              buySignals.length === 0 &&
              <SignalsList signals={sellSignals} setSignals={setSellSignals} type={"SELL"} indicator={currentIndicator} />
            }

            </React.Fragment>
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