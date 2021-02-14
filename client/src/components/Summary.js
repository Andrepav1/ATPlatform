import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Title from './Title';

// const useStyles = makeStyles((theme) => ({

// }));

export default function Summary({ data }) {

  // const styles = useStyles();

  const getDataValue = (value, isPercentage = false) => {
    if(data && data[value]) {
      if(isPercentage) {
        return (parseFloat(data[value])*100).toFixed(1) + "%";
      }
      return parseFloat(data[value]).toFixed(2)
    }
    else {
      return " - "
    }
  }

  return (
    <React.Fragment>
      <Title>{"Summary for " + (data&&data.alias?data.alias:"\t")}</Title>
      <Table size="small">
        <TableBody>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Balance"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{ getDataValue("balance") }</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Equity"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{ getDataValue("NAV") }</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Margin used"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{ getDataValue("marginUsed")}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Free margin"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue("marginAvailable")}</Typography>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Unrealized P/L"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue("unrealizedPL")}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{"Margin used (%)"}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue("marginCallPercent", true)}</Typography>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>  
    </React.Fragment>
  );
}