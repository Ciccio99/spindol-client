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
            <p className={styles.description}>
              {description}
            </p>
            <Typography className={styles.stat} variant='h4'>
              {stat} {units}
            </Typography>
        </CardContent>
      </Card>

  );
};

export default StatCard;
