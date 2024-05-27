import React from 'react';
import uuid from 'react-uuid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Box, IconButton } from '@material-ui/core';
import Title from './Title';
import { fetchRequest, createURL } from '../util/network';
import ConfirmDialog from './ConfirmDialog';
import { BUY_GREEN, SELL_RED } from '../util/colors';

export default function OpenPositions({ positions }) {
  const [open, setOpen] = React.useState(false);

  const [closingPositionId, setClosingPositionId] = React.useState();

  const confirmClosePosition = () => {
    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    const close_trade_url = createURL('/trades/close');

    fetchRequest({
      url: close_trade_url,
      method: 'POST',
      body: { id: closingPositionId },
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then((result) => {
        // success
        console.log(result);
      })
      .catch(({ error }) => {
        alert(error);
      });

    cancelClosePosition();
  };

  const cancelClosePosition = () => {
    setClosingPositionId(null);
    setOpen(false);
  };

  const closePosition = (id) => {
    console.log('Closing position:', id);
    setClosingPositionId(id);
    setOpen(true);
  };

  const getBUYSELLText = (isBuy) => {
    return (
      <b
        style={{
          backgroundColor: isBuy ? BUY_GREEN : SELL_RED,
          padding: 6,
          borderRadius: 4,
          color: 'white'
        }}
      >
        {isBuy ? 'BUY' : 'SELL'}
      </b>
    );
  };

  const getPositionRow = (position) => {
    const pl = parseFloat(position.unrealizedPL);
    return (
      <TableRow key={uuid()}>
        <TableCell>
          {getBUYSELLText(parseInt(position.currentUnits) > 0)}
        </TableCell>
        <TableCell>{position.instrument}</TableCell>
        <TableCell>{position.lotSize}</TableCell>
        <TableCell>{position.price}</TableCell>
        <TableCell>
          <Typography
            style={{
              marginLeft: 8,
              fontSize: 20,
              color: pl < 0 ? '#de0000' : '#0335fc'
            }}
          >
            {pl.toFixed(2)}
          </Typography>
        </TableCell>
        <TableCell size="small">
          <Box display="flex" flexDirection="row-reverse">
            <IconButton
              color="secondary"
              onClick={() => closePosition(position.id)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  if (!positions || positions.length === 0) {
    return (
      <React.Fragment>
        <Title>Open Positions</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Instrument</TableCell>
              <TableCell>Lot Size</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Profit/Loss</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Typography noWrap style={{ marginTop: 90, color: '#88888888' }}>
          Nothing here
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Title>Open Positions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Instrument</TableCell>
            <TableCell>Lot Size</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Profit/Loss</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => getPositionRow(position))}
        </TableBody>
      </Table>
      {open && (
        <ConfirmDialog
          title="Closing Position"
          text="Are you sure you want to close this position? If you select YES, this position will not be counted towards the calculation of the bot performance."
          open={open}
          setOpen={setOpen}
          confirmAction={confirmClosePosition}
          cancelAction={cancelClosePosition}
        />
      )}
    </React.Fragment>
  );
}
