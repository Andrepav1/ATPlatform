import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import CandleStickStockScaleChart from './CandleStickStockScaleChart'
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

export default function Chart() {

  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <Title>Today</Title>
      <CandleStickStockScaleChart />
    </Container>
  );
}