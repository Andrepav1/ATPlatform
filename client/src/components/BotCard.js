import React from 'react';
import uuid from 'react-uuid';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  instruments: {
    height: "80px",
    overflow: "hidden"
  }
}));

export default function BotCard({ data }) {

  const styles = useStyles();
  console.log(data);

  // ======= TEST DATA =======
  // data.name = "Test Bot"
  // data.activeStrategy = "TESTStrategy"
  // data.instruments = ["EUR/USD","AUD/USD","GBP/CHF","CAD/AUD","EUR/JPY"];
  // ======= TEST DATA =======

  return (
    <React.Fragment key={uuid()}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Box display="flex" flexDirection="row-reverse" style={{ position: "relative" }}>
            <Brightness1Icon style={{ color: data.live?"#1bf723":"#de0000", position: "absolute", fontSize: 16, marginTop: 12, marginRight: 12 }} />
          </Box>
          <CardHeader
            title={data.name}
            subheader={data.activeStrategy.name + " (" + data.chartPeriod + ")"}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={styles.cardHeader}
          />
          <CardContent>
            <div className={styles.cardPricing}>
              <Typography component="h6" variant="h6" color="textPrimary" key={uuid()}>Active on instruments:</Typography>
            </div>
            <div>    
              <Typography className={styles.instruments} variant="subtitle1" align="center" key={uuid()}>
                { data.instruments.join(", ") }
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button fullWidth variant={"outlined"} color="secondary">
              {"Remove"}
            </Button>
            <Button fullWidth variant={"contained"} color="primary">
              {"Edit"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}