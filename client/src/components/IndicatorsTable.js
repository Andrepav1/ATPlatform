import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  noTransactionsText: {
    padding: theme.spacing(4)
  }
}));

export default function IndicatorsTable({ indicators }) {
  const styles = useStyles();

  const getIndicatorRow = (indicator) => {

    return (
      <TableRow key={indicator.name}> 
        <TableCell>{indicator.name}</TableCell>
        <TableCell>{indicator.candleSize}</TableCell>
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
              <TableCell>Candle Size</TableCell>
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
            <TableCell>Candle Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indicators.map((indicator) => getIndicatorRow(indicator))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}