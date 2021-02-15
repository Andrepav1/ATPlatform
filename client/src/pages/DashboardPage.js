import '../App.css';
import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";

// materia UI import
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import Summary from '../components/Summary';
import Activity from '../components/Activity';

// util
import { fetchRequest, createURL } from '../util/network'
import { SOCKET_IO_ENDPOINT } from '../util/apiConstants';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

function DashboardPage({ api_key, account_id }) {

  const styles = useStyles();

  const [summaryData, setSummaryData] = useState();
  const [activityData, setActivityData] = useState()

  useEffect(() => {

    // =================================================
    // fetching summary once when visiting page 
    let summary_url = createURL("/accounts/summary", { apiKey: api_key, accountId: account_id })
    fetchRequest({ url: summary_url.toString() })
    .then((result) => {
      console.log(result);
      setSummaryData(result);
    })
    .catch((error) => {
      console.log("fetch error", error);
    })

    // =================================================
    // fetching orders once when visiting page 
    let transactions_url = createURL("/transactions", { apiKey: api_key, accountId: account_id });
    fetchRequest({ url: transactions_url })
    .then((result) => {
      console.log(result);
      let transactionCount = 6;
      setActivityData(result.reverse().slice(0,transactionCount));
    })
    .catch((error) => {
      console.log("fetch error", error);
    })

    // =================================================
    // keep fetching summary
    const socket = socketIOClient(SOCKET_IO_ENDPOINT, { query: { apiKey: api_key, accountId: account_id }});

    socket.on("Summary", data => {
      setSummaryData(data);
    });

    return () => socket.disconnect();
  }, [api_key, account_id]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <Chart />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={5} lg={4}>
            <Paper className={styles.paper}>
              <Summary data={summaryData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
            <Paper className={styles.paper}>
              <Activity data={activityData} title="Recent Activity" />
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

export default connect(mapStateToProps)(DashboardPage);