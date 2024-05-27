import '../App.css';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

// materia UI import
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Summary from '../components/Summary';
import Activity from '../components/Activity';

// util
import { fetchRequest, createURL } from '../util/network';
import { SOCKET_IO_ENDPOINT } from '../util/apiConstants';
import OpenPositions from '../components/OpenPositions';
import BotsSummary from '../components/BotsSummary';
import BotSummary from '../components/BotSummary';

const FIXED_HEIGHT = '320px';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  paperFixedHeight: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: FIXED_HEIGHT
  }
}));

function DashboardPage({ api_key, account_id }) {
  const styles = useStyles();

  const [summaryData, setSummaryData] = useState();
  const [activityData, setActivityData] = useState();
  const [positionsData, setPositionsData] = useState();
  const [botsData, setBotsData] = useState([]);

  useEffect(() => {
    // =================================================
    // fetching summary once when visiting page
    const summary_url = createURL('/accounts/summary', {
      apiKey: api_key,
      accountId: account_id
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: summary_url })
      .then((result) => {
        // console.log(result);
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        setSummaryData(result);
      })
      .catch((error) => {
        console.log('fetch error', error);
      });

    // =================================================
    // fetching summary once when visiting page
    const positions_url = createURL('/trades', {
      apiKey: api_key,
      accountId: account_id
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: positions_url })
      .then(({ trades }) => {
        // console.log(trades);
        setPositionsData(trades);
      })
      .catch((error) => {
        console.log('fetch error', error);
      });

    // =================================================
    // fetching transactions once when visiting page
    const transactions_url = createURL('/transactions', {
      apiKey: api_key,
      accountId: account_id
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: transactions_url })
      .then((result) => {
        // console.log(result);
        const transactionCount = 5;
        // @ts-expect-error TS(2339): Property 'reverse' does not exist on type 'unknown... Remove this comment to see the full error message
        setActivityData(result.reverse().slice(0, transactionCount));
      })
      .catch((error) => {
        console.log('fetch error', error);
      });

    // =================================================
    // fetching bots once when visiting page
    const bots_url = createURL('/bots', {
      apiKey: api_key,
      accountId: account_id
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: bots_url })
      .then(({ bots }) => {
        setBotsData(bots);
      })
      .catch((error) => {
        console.log('fetch error', error);
      });

    // =================================================
    // socket.io data
    const socket = socketIOClient(SOCKET_IO_ENDPOINT, {
      query: { apiKey: api_key, accountId: account_id }
    });

    // keep fetching summary
    socket.on('Summary', (data) => {
      setSummaryData(data);
    });

    // keep fetching open positions
    socket.on('OpenPositions', (data) => {
      setPositionsData(data);
    });

    // keep fetching open positions
    socket.on('Bots', (data) => {
      setBotsData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [api_key, account_id]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={8}>
            <Paper className={styles.paperFixedHeight}>
              <OpenPositions positions={positionsData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper className={styles.paperFixedHeight}>
              <Summary data={summaryData} />
            </Paper>
          </Grid>

          {botsData.map((bot) => (
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={styles.paperFixedHeight}>
                <BotSummary bot={bot} positions={positionsData} />
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} md={6} lg={4}>
            <Paper className={styles.paperFixedHeight}>
              <BotsSummary bots={botsData} setBots={setBotsData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <Paper className={styles.paperFixedHeight}>
              <Activity data={activityData} title="Recent Activity" />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={styles.paperFixedHeight}></Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardPage);
