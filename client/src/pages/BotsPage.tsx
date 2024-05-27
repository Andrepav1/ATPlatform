import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";

//material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import "../App.css";

import { fetchRequest, createURL } from "../util/network";
import BotCard from "../components/BotCard";
import BotDialog from "../components/BotDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  },
}));

function BotsPage({ api_key, account_id }) {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  // data
  const [strategiesData, setStrategiesData] = useState([]);
  const [instrumentsData, setInstrumentsData] = useState([]);
  const [botsData, setBotsData] = useState([]);

  const newBotHandler = () => {
    setOpen(true);
  };

  const confirmBot = (bot) => {
    setOpen(false);

    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    let save_bot_url = createURL("/bots");
    fetchRequest({
      url: save_bot_url,
      body: { bot },
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(() => {
        refetchBots();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const refetchBots = () => {
    let bots_url = createURL("/bots", {
      apiKey: api_key,
      accountId: account_id,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: bots_url })
      .then(({ bots }) => {
        setBotsData(bots);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  };

  useEffect(() => {
    let strategies_url = createURL("/strategies", {
      apiKey: api_key,
      accountId: account_id,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: strategies_url })
      .then(({ strategies }) => {
        setStrategiesData(strategies);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });

    let instruments_url = createURL("/instruments", {
      apiKey: api_key,
      accountId: account_id,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: instruments_url })
      .then(({ instruments }) => {
        setInstrumentsData(instruments);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });

    let bots_url = createURL("/bots", {
      apiKey: api_key,
      accountId: account_id,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: bots_url })
      .then(({ bots }) => {
        setBotsData(bots);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  }, [account_id, api_key]);

  return (
    <div className="Main">
      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Container maxWidth="xl" className={styles.container}>
        <Box display="flex" flexDirection="row" className={styles.subheader}>
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <Button variant={"contained"} color="primary" onClick={newBotHandler}>
            {"New Bot"}
          </Button>
        </Box>
        {open && (
          <BotDialog
            strategies={strategiesData}
            instruments={instrumentsData}
            open={open}
            setOpen={setOpen}
            confirmBot={confirmBot}
            api_key={api_key}
          />
        )}
        <Grid container spacing={2}>
          {botsData.map((bot) => (
            <BotCard key={uuid()} data={bot} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(BotsPage);
