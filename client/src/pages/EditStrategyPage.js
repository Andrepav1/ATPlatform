import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import '../App.css';
import IndicatorFormDialog from '../components/IndicatorFormDialog';
import { fetchRequest, createURL } from '../util/network';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  subheader: {
    paddingBottom: theme.spacing(2),
  }
}));

function EditStrategyPage() {

  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [indicatorsData, setIndicatorsData] = useState([]);
  
  const [strategyIndicator, setStrategyIndicator] = useState([]);

  const confirmIndicator = (indicator) => {
    setStrategyIndicator([...strategyIndicator, indicator])
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
          <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
            {"New Technical Indicator"}
          </Button>
          <Button variant={"contained"} color="primary">
            {"Save"}
          </Button>
        </Box>
        {
          open && <IndicatorFormDialog indicators={indicatorsData} open={open} setOpen={setOpen} confirmIndicator={confirmIndicator} />
        }
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(EditStrategyPage);
