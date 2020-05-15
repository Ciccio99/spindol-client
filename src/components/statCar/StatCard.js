import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import styles from './StatCard.module.css';

const StatCard = ({ description, stat, units }) => {
  return (
      <Card className={styles.card} elevation={0}>
        <CardContent>
            <Typography className={styles.desc} variant='caption'>{description}</Typography>
            <Typography className={styles.stat} variant='h4'>
              {stat} {units}
            </Typography>
        </CardContent>
      </Card>

  );
};

export default StatCard;
