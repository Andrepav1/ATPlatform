import React from 'react';
import uuid from 'react-uuid';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon  from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { Box, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noTransactionsText: {
    padding: theme.spacing(4)
  },
}));

export default function IndicatorsTable({ indicators, editIndicator, removeIndicator }) {
  const styles = useStyles();

  const getConfigData = ({ config }) => {
    let configData = Object.entries(config);
    return configData.map(([k,v]) => k + ": " + v).join(", ");
  }

  const getSignalsData = ({ signals }) => {
    let buySignals = 0, sellSignals = 0;
    for (let i = 0; i < signals.length; i++) {
      if(signals[i].type === "BUY") { // BUY
        buySignals++;
      }
      else { // SELL
        sellSignals++;
      }
    }
    return buySignals + " BUY, " + sellSignals + " SELL"
  }

  const getIndicatorRow = (indicator) => {

    return (
      <TableRow key={uuid()}> 
        <TableCell>{indicator.name}</TableCell>
        <TableCell>{getConfigData(indicator)}</TableCell>
        <TableCell>{getSignalsData(indicator)}</TableCell>
        <TableCell size="small">
          <Box display="flex" flexDirection="row-reverse">
            <IconButton color="default" onClick={() => editIndicator(indicator.id)}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => removeIndicator(indicator.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  if(!indicators || indicators.length === 0) {
    return (
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Indicator</TableCell>
              <TableCell>Configuration</TableCell>
              <TableCell>Signals</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Typography className={styles.noTransactionsText}>No indicators selected</Typography>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Indicator</TableCell>
            <TableCell>Configuration</TableCell>
            <TableCell>Signals</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indicators.map((indicator) => getIndicatorRow(indicator))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}