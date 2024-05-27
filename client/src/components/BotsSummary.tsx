import React from "react";

// import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Box, Switch, TableHead, Typography } from "@material-ui/core";
import uuid from "react-uuid";
import Title from "./Title";
import { createURL, fetchRequest } from "../util/network";

// const useStyles = makeStyles((theme) => ({

// }));

export default function BotsSummary({ bots, setBots }) {
  const updateBot = (id, updateObj) => {
    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    let update_bot_url = createURL("/bots/update");
    fetchRequest({
      url: update_bot_url,
      method: "PUT",
      body: { ...updateObj, id },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  };

  const setBotStatus = (id, status) => {
    setBots(
      bots.map((bot) => {
        if (bot._id === id) bot.live = status;
        return bot;
      })
    );

    updateBot(id, { live: status });
  };

  const getBotRow = (bot) => {
    return (
      <TableRow key={uuid()}>
        <TableCell align="left">
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <Typography noWrap>{bot.name}</Typography>
        </TableCell>
        <TableCell size="small">
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <Box display="flex" flexDirection="row-reverse">
            // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
            <Switch
              checked={bot.live}
              onChange={() => setBotStatus(bot._id, !bot.live)}
              color="primary"
            />
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  if (!bots || bots.length === 0) {
    return (
      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <React.Fragment>
        <Title>Your bots</Title>
        <Typography noWrap style={{ marginTop: 100, color: "#88888888" }}>
          Nothing here
        </Typography>
      </React.Fragment>
    );
  }

  return (
    // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    <React.Fragment>
      <Title>Your bots</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
              <Typography noWrap>Bot Name</Typography>
            </TableCell>
            <TableCell size="small" align="right">
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
              <Typography noWrap style={{ marginRight: 16 }}>
                Live
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{bots.map((bot) => getBotRow(bot))}</TableBody>
      </Table>
    </React.Fragment>
  );
}
