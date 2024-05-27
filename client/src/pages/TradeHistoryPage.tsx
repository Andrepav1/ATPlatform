import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "../App.css";
import Activity from "../components/Activity";
import { fetchRequest, createURL } from "../util/network";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

function TradeHistoryPage({ api_key, account_id }) {
  const styles = useStyles();

  const [transactionsData, setTransactionsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let transactions_url = createURL("/transactions", {
      apiKey: api_key,
      accountId: account_id,
      page: currentPage,
    });
    // @ts-expect-error TS(2345): Argument of type '{ url: URL; }' is not assignable... Remove this comment to see the full error message
    fetchRequest({ url: transactions_url })
      .then((result) => {
        console.log(result);
        // @ts-expect-error TS(2339): Property 'reverse' does not exist on type 'unknown... Remove this comment to see the full error message
        setTransactionsData(result.reverse());
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  }, [account_id, api_key, currentPage]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        // @ts-expect-error TS(2769): No overload matches this call.
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>
              // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
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
};

export default connect(mapStateToProps)(TradeHistoryPage);
