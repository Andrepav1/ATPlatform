import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { fetchRequest, createURL } from '../util/network';
import { Paper } from '@material-ui/core';
import BacktestingSummary from '../components/BacktestingSummary';
import CandleStickChart from '../components/CandleStickChart';
import AreaChart from '../components/AreaChart';

const FIXED_HEIGHT = "460px";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  },
  paperFixedHeight: {
    padding: theme.spacing(2),
    height: FIXED_HEIGHT
  }
}));

function BacktestingPage({ api_key, account_id }) {

  const styles = useStyles();

  // API data
  const [strategiesData, setStrategiesData] = useState([]);
  const [instrumentsData, setInstrumentsData] = useState([]);

  // selected option summary data
  const strategyState = useState();
  const instrumentState = useState("");
  const chartPeriodState = useState();

  useEffect(() => {
    let strategies_url = createURL("/strategies", { apiKey: api_key, accountId: account_id });
    fetchRequest({ url: strategies_url })
    .then(({strategies}) => {
      setStrategiesData(strategies);
    })
    .catch((error) => {
      console.log("fetch error", error);
    })

    let instruments_url = createURL("/instruments", { apiKey: api_key, accountId: account_id });
    fetchRequest({ url: instruments_url })
    .then(({instruments}) => {
      setInstrumentsData(instruments);
    })
    .catch((error) => {
      console.log("fetch error", error);
    })

  },[account_id, api_key]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container} >
        <Grid container spacing={2}>
          
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={styles.paperFixedHeight}>
              <BacktestingSummary 
                strategies={strategiesData}
                instruments={instrumentsData}
                strategyState={strategyState}
                instrumentState={instrumentState}
                chartPeriodState={chartPeriodState}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper className={styles.paperFixedHeight}>
              <AreaChart />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={styles.paperFixedHeight}>
              {/* <CandleStickChart data={data}/> */}
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(BacktestingPage);
