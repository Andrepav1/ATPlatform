import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  
}));

export default function Summary({ data }) {

  const styles = useStyles();

  // const getSummaryData = () => {
  //   for (const [key, value] of Object.entries(data)) {
  //     console.log(`${key}: ${value}`);
  //   } 
  // }

  return (
    <React.Fragment>
      <Title>{"Summary for " + data.alias}</Title>
      <Table size="small">
        <TableBody>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Balance"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{parseFloat(data.balance).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Equity"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{parseFloat(data.NAV).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Margin used"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{parseFloat(data.marginUsed).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Free margin"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{parseFloat(data.marginAvailable).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Unrealized P/L"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{parseFloat(data.unrealizedPL).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Margin used (%)"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{(parseFloat(data.marginCallPercent)*100).toFixed(1) + "%"}</Typography>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>  
    </React.Fragment>
  );
}