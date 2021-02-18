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

export default function BotCard({ data }) {

  const styles = useStyles();

  // ======= TEST DATA =======
  data.name = "Test Bot"
  data.description = "Active Strategy"
  data.instruments = ["EUR/USD","AUD/USD","GBP/CHF","CAD/AUD","EUR/JPY"];
  // ======= TEST DATA =======

  return (
    <React.Fragment key={uuid()}>
      <Grid item xs={12} sm={6} md={6}>
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
              <Typography component="h6" variant="h6" color="textPrimary" key={uuid()}>{data.instruments.length} Instruments:</Typography>
            </div>
            <div>    
              <Typography variant="subtitle1" align="center" key={uuid()}>
                { data.instruments.split(", ") }
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button fullWidth variant={"outlined"} color="primary">
              {"Edit"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}