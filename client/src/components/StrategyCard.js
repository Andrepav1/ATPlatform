import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    height: "80px",
    overflow: "hidden"
  }
}));

export default function StrategyCard({ data }) {

  const styles = useStyles();

  // ======= TEST DATA =======
  data.name = "Test Strategy"
  data.description = "Strategy based on MACD, RSI and SMA"
  data.indicators = [{ name: "Awesome Oscillator (AO)", config: {} }, { name: "Awesome Oscillator (AO)", config: {} },{ name: "MA Convergence Divergence (MACD)", config: {} }, { name: "Force Index (FI)", config: {} }]
  // ======= TEST DATA =======

  return (
    <React.Fragment>
      <Grid item key={data.name} xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            title={data.name}
            subheader={data.description}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={styles.cardHeader}
          />
          <CardContent>
            <div className={styles.cardPricing}>
              <Typography component="h6" variant="h6" color="textPrimary">{data.indicators.length} Technical Indicators:</Typography>
            </div>
            <ul className={styles.list}>
              {
                data.indicators.map((indicator) => (
                  <Typography component="li" variant="subtitle1" align="center" key={indicator.name} noWrap>
                    {indicator.name}
                  </Typography>
                ))
              }
            </ul>
          </CardContent>
          <CardActions>
            <Button fullWidth variant={"contained"} color="primary">
              {"View"}
            </Button>
            <Button fullWidth variant={"outlined"} color="primary">
              {"Edit"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}