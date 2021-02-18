import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import uuid from 'react-uuid';

//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import '../App.css';
import IndicatorFormDialog from '../components/IndicatorFormDialog';
import { fetchRequest, createURL } from '../util/network';
import IndicatorsTable from '../components/IndicatorsTable';
import { Grid, Paper } from '@material-ui/core';
import StrategySummary from '../components/StrategySummary';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  },
  horizontalMargin: {
    marginRight: theme.spacing(2),
  }
}));

function EditStrategyPage({ history }) {
  
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [indicatorsData, setIndicatorsData] = useState([]);
  
  const [strategyIndicators, setStrategyIndicators] = useState([]);

  const [strategyName, setStrategyName] = useState("")
  const [strategyDescription, setStrategyDescription] = useState("")

  const confirmIndicator = (indicator) => {
    indicator.id = uuid();
    setStrategyIndicators([...strategyIndicators, indicator])
  }

  const editIndicator = (id) => {
    console.log("edit", id); // textDecorationColor: 
  }

  const removeIndicator = (id) => {
    setStrategyIndicators(strategyIndicators.filter((indicator) => indicator.id !== id))
  }

  const saveStrategy = () => {

    let strategy = {
      name: strategyName,
      description: strategyDescription,
      indicators: strategyIndicators
    }

    let save_strategy_url = createURL("/strategies");
    fetchRequest({ 
      url: save_strategy_url, 
      body: { strategy }, 
      method: "POST", 
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      } 
    })
    .then((result) => {
      console.log(result);
      history.push("/strategies");
    })
    .catch((error) => {
      console.log("error", error);
    })
  }
  
  useEffect(() => {
    let indicators_url = createURL("/indicators");
    fetchRequest({ url: indicators_url })
    .then((result) => {
      console.log(result);
      
      setIndicatorsData(result);
    })
    .catch((error) => {
      console.log("fetch error", error);
    })
  },[]);

  return (
    <div className="Main">
      <Container maxWidth="xl" className={styles.container}>
        <Box display="flex" flexDirection="row" className={styles.subheader}>
          <Button className={styles.horizontalMargin} variant="outlined" color="primary" onClick={() => setOpen(true)}>
            {"New Technical Indicator"}
          </Button>
          <Button className={styles.horizontalMargin} variant={"contained"} color="primary" onClick={saveStrategy}>
            {"Save"}
          </Button>
        </Box>
        {
          open && <IndicatorFormDialog indicators={indicatorsData} open={open} setOpen={setOpen} confirmIndicator={confirmIndicator} />
        }
        <Grid container spacing={2}>
          
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={styles.paper}>
              <StrategySummary 
                strategyName={strategyName} 
                setStrategyName={setStrategyName} 
                strategyDescription={strategyDescription} 
                setStrategyDescription={setStrategyDescription}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper className={styles.paper}>
              <IndicatorsTable indicators={strategyIndicators} editIndicator={editIndicator} removeIndicator={removeIndicator}/>
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

export default connect(mapStateToProps)(EditStrategyPage);
