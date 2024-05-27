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

  // console.log(data);

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'USD':
        return '$';
      default:
        return '';
    }
  };

  const getDataValue = (value, isPercentage = false) => {
    if (data && data[value]) {
      if (isPercentage) {
        return (parseFloat(data[value]) * 100).toFixed(1) + '%';
      }
      return (
        getCurrencySymbol(data['currency']) +
        ' ' +
        parseFloat(data[value]).toFixed(2)
      );
    } else {
      return ' - ';
    }
  };

  return (
    <React.Fragment>
      <Title>{'Summary for ' + (data && data.alias ? data.alias : '\t')}</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{'Balance'}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue('balance')}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{'Equity'}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue('NAV')}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{'Margin used'}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue('marginUsed')}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography noWrap>{'Free margin'}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{getDataValue('marginAvailable')}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to
              type 'ReactNod... Remove this comment to see the full error
              message
              <Typography noWrap>{'Unrealized P/L'}</Typography>
            </TableCell>
            <TableCell align="right">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to
              type 'ReactNod... Remove this comment to see the full error
              message
              <Typography noWrap>{getDataValue('unrealizedPL')}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to
              type 'ReactNod... Remove this comment to see the full error
              message
              <Typography noWrap>{'Margin used (%)'}</Typography>
            </TableCell>
            <TableCell align="right">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to
              type 'ReactNod... Remove this comment to see the full error
              message
              <Typography noWrap>
                {getDataValue('marginCallPercent', true)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
