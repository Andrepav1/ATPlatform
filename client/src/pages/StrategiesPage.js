import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';

import StrategyCard from '../components/StrategyCard';
import '../App.css';

import { fetchRequest, createURL } from '../util/network';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  }
}));

function StrategiesPage({ api_key, account_id }) {

  const styles = useStyles();

  const [strategiesData, setStrategiesData] = useState([{}, {}, {}, {}])
  
  const newStrategyHandler = () => {

  }

  useEffect(() => {
    let strategies_url = createURL("/strategies", { apiKey: api_key, accountId: account_id });
    fetchRequest({ url: strategies_url })
    .then((result) => {
      console.log(result);

      // setStrategiesData(result);
    })
    .catch((error) => {
      console.log("fetch error", error);
    })
  },[account_id, api_key]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Box display="flex" flexDirection="row-reverse" className={styles.subheader}>
          <Button variant={"contained"} color="primary" onClick={newStrategyHandler}>  
            {"New Strategy"}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {
            strategiesData.map((strategy) => (
              <StrategyCard data={strategy} />
            ))
          }
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(StrategiesPage);
