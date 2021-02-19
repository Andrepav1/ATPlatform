import React from 'react';
import uuid from 'react-uuid';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(2),
  },
  title: {

  },
  noTransactionsText: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6)
  }
}));

export default function Activity({ data, title, full, changePageHandler, currentPage }) {
  const styles = useStyles();

  const getType = (type) => {
    switch (type) {
      case "TRADE_CLIENT_EXTENSIONS_MODIFY":
        return "Client Settings Modified";
      case "DAILY_FINANCING":
        return "Financing";
      case "MARKET_ORDER":
        return "Order Set";
      case "DIVIDEND_ADJUSTMENT":
        return "Divident Adjustment";
      case "ORDER_FILL":
        return "Order Filled";
      default:
        return type;
    }
  }

  const getActivityRow = (data) => {

    // if(data.type === "TRADE_CLIENT_EXTENSIONS_MODIFY") return;

    return (
      <TableRow key={uuid()}> 
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.time.substring(0, 10)}</TableCell>
        <TableCell>{data.instrument}</TableCell>
        <TableCell>{getType(data.type)}</TableCell>
        <TableCell align="right">{data.financing}</TableCell>
      </TableRow>
    );
  }

  if(!data) {
    return (
      <React.Fragment>
        <Title className={styles.title}>{title}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Instrument</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Typography className={styles.noTransactionsText}>No transactions available</Typography>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Title className={styles.title}>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Instrument</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => getActivityRow(row))}
        </TableBody>
      </Table>
      {
        !full &&
        <div className={styles.seeMore}>
          <Link color="primary" href="/history">
            See more
          </Link>
        </div>
      }
      {
        full &&
        <div className={styles.seeMore}>
          <Link color="primary" href="#" onClick={() => changePageHandler(1)}>{" << "}</Link>
          <Link color="primary" href="#" onClick={() => changePageHandler(currentPage-1)}>{" < "}</Link>
          {currentPage}
          <Link color="primary" href="#" onClick={() => changePageHandler(currentPage+1)}>{" > "}</Link>
          <Link color="primary" href="#" onClick={() => changePageHandler(currentPage+10)}>{" >> "}</Link>  
        </div>
      }
    </React.Fragment>
  );
}