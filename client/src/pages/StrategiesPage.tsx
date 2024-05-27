import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import generate from "project-name-generator";

//material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// import Typography from '@material-ui/core/Typography';

import StrategyCard from "../components/StrategyCard";
import "../App.css";

import { fetchRequest, createURL } from "../util/network";
import ConfirmDialog from "../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  },
}));

function StrategiesPage({ api_key, account_id, history }) {
  const styles = useStyles();

  const [strategiesData, setStrategiesData] = useState([]);

  const [removingStrategyId, setRemovingStrategyId] = React.useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let strategies_url = createURL("/strategies", {
      apiKey: api_key,
      accountId: account_id,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: strategies_url })
      .then(({ strategies }) => {
        // console.log(strategies);
        setStrategiesData(strategies);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  }, [account_id, api_key, removingStrategyId]);

  const removeStrategy = (id) => {
    setRemovingStrategyId(id);
    setOpen(true);
  };

  const cancelRemoveStrategy = () => {
    setRemovingStrategyId(null);
    setOpen(false);
  };

  const confirmRemoveStrategy = () => {
    let delete_strategy_url = createURL("/strategies", {
      id: removingStrategyId,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; method: string; head... Remove this comment to see the full error message
    fetchRequest({
      url: delete_strategy_url,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(({ strategy }) => {
        console.log(strategy.name + " removed");
      })
      .catch(({ error }) => {
        console.log(error);
      });

    cancelRemoveStrategy();
  };

  const editStrategy = (strategy) => {
    history.push({
      pathname: "/strategies/edit",
      search: "?id=" + strategy._id,
      state: { id: strategy._id },
    });
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const onNewStrategyPressed = async () => {
    let strategyName =
      generate({ words: 2, alliterative: true }).spaced + " strategy";
    let newStrategy = {
      name: capitalize(strategyName),
      description: "",
      indicators: [],
      minSignals: { buy: 0, sell: 0 },
      RRR: "auto",
      lotSize: "0.01",
      signalCooldown: "10",
    };

    try {
      // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
      let new_strategy_url = createURL("/strategies");
      // @ts-expect-error TS(2339): Property 'strategy' does not exist on type '{}'.
      const { strategy } = await fetchRequest({
        url: new_strategy_url,
        body: { strategy: newStrategy },
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      editStrategy(strategy);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Main">
      <ConfirmDialog
        title={"Removing Strategy"}
        text={
          "Are you sure you want to remove this strategy? You will not be able to recover it in the future."
        }
        cancelAction={() => cancelRemoveStrategy()}
        confirmAction={() => confirmRemoveStrategy()}
        open={open}
        setOpen={setOpen}
      />
      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Container maxWidth="xl" className={styles.container}>
        <Box
          display="flex"
          flexDirection="row-reverse"
          className={styles.subheader}
        >
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <Button
            variant={"contained"}
            color="primary"
            onClick={onNewStrategyPressed}
          >
            {"New Strategy"}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {strategiesData.map((strategy) => (
            <StrategyCard
              key={uuid()}
              data={strategy}
              onRemoveStrategyPressed={removeStrategy}
              onEditStrategyPressed={editStrategy}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(StrategiesPage);
