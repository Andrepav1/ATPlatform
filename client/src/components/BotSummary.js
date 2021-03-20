import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Box, Switch, TableHead, Typography } from '@material-ui/core';
import uuid from 'react-uuid';
import Title from './Title';
import { createURL, fetchRequest } from '../util/network';

// const useStyles = makeStyles((theme) => ({

// }));

export default function BotSummary({ bots, setBots }) {

  const updateBot = (id, status) => {
    let update_bot_url = createURL("/bots/update");
    fetchRequest({ 
      url: update_bot_url, 
      method: "PUT", 
      body: { id, status },
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
    .then(() => {
      console.log("success")
    })
    .catch((error) => {
      console.log("fetch error", error);
    })
  }
  
  const setBotStatus = (id, status) => {
    setBots(bots.map((bot) => {
      if(bot._id===id) bot.live = status;
      return bot;
    }))
    
    updateBot(id, status);
    
  }

  const getBotRow = (bot) => {
    return (
      <TableRow key={uuid()}> 
        <TableCell align="left">
          <Typography noWrap>{bot.name}</Typography>
        </TableCell>
        <TableCell size="small">
          <Box display="flex" flexDirection="row-reverse">
            <Switch
              checked={bot.live}
              onChange={() => setBotStatus(bot._id, !bot.live)}
              color="primary"
            />
          </Box>
        </TableCell>
      </TableRow>
    )
  }

  if(!bots || bots.length === 0) {
    return (
      <React.Fragment>
        <Title>Bot Summary</Title>
        <Typography noWrap style={{ marginTop: 100, color: "#88888888" }}>Nothing here</Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Title>Bot Summary</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography noWrap>Bot Name</Typography>
            </TableCell>
            <TableCell size="small" align="right">
              <Typography noWrap style={{ marginRight: 16 }}>Live</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bots.map((bot) => getBotRow(bot))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}