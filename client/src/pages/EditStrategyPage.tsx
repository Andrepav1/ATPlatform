import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";

//material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import "../App.css";
import IndicatorFormDialog from "../components/IndicatorFormDialog";
import { fetchRequest, createURL } from "../util/network";
import IndicatorsTable from "../components/IndicatorsTable";
import { Grid, Paper } from "@material-ui/core";
import StrategySummary from "../components/StrategySummary";
import StrategyManagementSummary from "../components/StrategyManagementSummary";
import SignalsAmount from "../components/SignalsAmount";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  },
  horizontalMargin: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginBottom: theme.spacing(2),
  },
}));

function EditStrategyPage(props) {
  if (!props.location.state || !props.location.state.id) {
    props.history.goBack();
  }

  const strategyId = props.location.state.id;

  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [indicatorsData, setIndicatorsData] = useState([]);
  const [minBuySignals, setMinBuySignals] = useState(0);
  const [minSellSignals, setMinSellSignals] = useState(0);

  const [autoRiskManagement, setAutoRiskManagement] = useState(true);
  const [RRR, setRRR] = useState("auto");
  const [lotSize, setLotSize] = useState("0.01");
  const [signalCooldown, setSignalCooldown] = useState("10");

  const [strategyIndicators, setStrategyIndicators] = useState([]);

  const [strategyName, setStrategyName] = useState("");
  const [strategyDescription, setStrategyDescription] = useState("");

  // To edit an indicator
  const [editingIndicator, setEditingIndicator] = useState();

  const getMaxSignals = (type) => {
    let max = 0;
    for (let i = 0; i < strategyIndicators.length; i++) {
      if (strategyIndicators[i].signals[0].type === type) {
        max++;
      }
    }
    return max;
  };

  const confirmIndicator = (indicator) => {
    console.log("new", indicator);
    console.log("editing", editingIndicator);
    console.log("indicators", strategyIndicators);

    if (editingIndicator) {
      indicator._id = editingIndicator._id;
      let newStrategyIndicators = strategyIndicators.filter(
        ({ _id }) => indicator._id !== _id
      );
      setStrategyIndicators([...newStrategyIndicators, indicator]);
    } else {
      indicator._id = uuid();
      setStrategyIndicators([...strategyIndicators, indicator]);
    }
  };

  const newIndicator = () => {
    setEditingIndicator(null);
    setOpen(true);
  };

  const editIndicator = (indicatorId) => {
    // Editing Indicator TODO

    console.log("Edit indicator: " + indicatorId);

    let indicator = strategyIndicators.find(
      (indicator) => (indicator._id = indicatorId)
    );
    setEditingIndicator(indicator);
    // console.log("edit", indicator);

    setOpen(true);
  };

  const removeIndicator = (id) => {
    setStrategyIndicators(
      strategyIndicators.filter((indicator) => indicator._id !== id)
    );
  };

  const saveStrategy = () => {
    if (!strategyName) {
      return alert("You need to select a name");
    }

    let strategy = {
      _id: strategyId,
      name: strategyName,
      description: strategyDescription,
      indicators: strategyIndicators,
      minSignals: { buy: minBuySignals, sell: minSellSignals },
      RRR,
      lotSize: parseFloat(lotSize),
      signalCooldown: parseInt(signalCooldown),
    };

    let update_strategy_url = createURL("/strategies");
    fetchRequest({
      url: update_strategy_url,
      body: { strategy },
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((result) => {
        console.log(result);
        alert("Strategy Saved!");
        // history.push("/strategies");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    let indicators_url = createURL("/indicators");
    fetchRequest({ url: indicators_url })
      .then((result) => {
        // console.log(result);

        setIndicatorsData(result);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });

    let strategy_url = createURL("/strategies", { id: strategyId });
    fetchRequest({ url: strategy_url })
      .then(({ strategy }) => {
        console.log("edit", strategy);
        setStrategyName(strategy.name);
        setStrategyDescription(strategy.description);
        setSignalCooldown(strategy.signalCooldown);
        setLotSize(strategy.lotSize);
        setRRR(strategy.RRR);
        setAutoRiskManagement(strategy.RRR === "auto");
        setMinSellSignals(strategy.minSignals.sell);
        setMinBuySignals(strategy.minSignals.buy);
        setStrategyIndicators(strategy.indicators);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  }, [strategyId]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Box display="flex" flexDirection="row" className={styles.subheader}>
          <Button
            className={styles.horizontalMargin}
            variant="outlined"
            color="primary"
            onClick={() => newIndicator()}
          >
            {"New Technical Indicator"}
          </Button>
          <Button
            className={styles.horizontalMargin}
            variant={"contained"}
            color="primary"
            onClick={() => saveStrategy()}
          >
            {"Save"}
          </Button>
        </Box>
        {open && (
          <IndicatorFormDialog
            indicators={indicatorsData}
            open={open}
            setOpen={setOpen}
            confirmIndicator={confirmIndicator}
            editingIndicator={editingIndicator}
            setEditingIndicator={setEditingIndicator}
          />
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={4}>
            <Paper className={styles.paper}>
              <StrategySummary
                strategyName={strategyName}
                setStrategyName={setStrategyName}
                strategyDescription={strategyDescription}
                setStrategyDescription={setStrategyDescription}
              />
            </Paper>
            <Paper className={styles.paper}>
              <StrategyManagementSummary
                autoRiskManagement={autoRiskManagement}
                setAutoRiskManagement={setAutoRiskManagement}
                RRR={RRR}
                setRRR={setRRR}
                lotSize={lotSize}
                setLotSize={setLotSize}
                signalCooldown={signalCooldown}
                setSignalCooldown={setSignalCooldown}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
            <Paper className={styles.paper}>
              <IndicatorsTable
                indicators={strategyIndicators}
                editIndicator={editIndicator}
                removeIndicator={removeIndicator}
              />
            </Paper>

            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Paper>
                  <SignalsAmount
                    type={"BUY"}
                    minSignals={minBuySignals}
                    setMinSignals={setMinBuySignals}
                    maxSignals={getMaxSignals("BUY")}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Paper>
                  <SignalsAmount
                    type={"SELL"}
                    minSignals={minSellSignals}
                    setMinSignals={setMinSellSignals}
                    maxSignals={getMaxSignals("SELL")}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(EditStrategyPage);
