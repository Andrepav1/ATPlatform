import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import '../App.css';
import Activity from '../components/Activity';
import { fetchRequest, createURL } from '../util/network';


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

function TradeHistoryPage({ api_key, account_id }) {

  const styles = useStyles();

  const [transactionsData, setTransactionsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  }
  
  useEffect(() => {
    let transactions_url = createURL("/transactions", { apiKey: api_key, accountId: account_id, page: currentPage });
    fetchRequest({ url: transactions_url })
    .then((result) => {
      console.log(result);
      setTransactionsData(result.reverse());
    })
    .catch((error) => {
      console.log("fetch error", error);
    })
  },[account_id, api_key, currentPage]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              <Activity 
                data={transactionsData} 
                title="Transaction History" 
                full={true} 
                changePageHandler={changePageHandler} 
                currentPage={currentPage}
              />
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

export default connect(mapStateToProps)(TradeHistoryPage);
