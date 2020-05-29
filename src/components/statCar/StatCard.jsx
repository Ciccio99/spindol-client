import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import styles from './StatCard.module.css';

const StatCard = ({ description, stat, units, tickerPercent }) => {
  return (
    <Card className={styles.card} elevation={0}>
      <CardContent style={{ height: '100%' }}>
        <Grid container spacing={2} direction="column" justify="space-between" alignItems="stretch">
          <Grid item xs={12}>
            <Typography className={styles.desc} variant="caption">{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.stat} variant="h4" display="inline">
              {`${stat} `}
              {units}
            </Typography>
            {
              tickerPercent
              && (
              <Typography variant="h6" display="inline" className={tickerPercent < 0 ? styles.negativeTicker : styles.positiveTicker}>{` (${tickerPercent}%)`}</Typography>)
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};

export default StatCard;
