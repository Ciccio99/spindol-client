import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import styles from './StatCard.module.css';

const StatCard = ({ description, stat, units }) => {
  return (
      <Card className={styles.card} elevation={0}>
      <Box pl={1} pr={1} pt={1}>
        <CardContent>
          <p className={styles.description}>
            {description}
          </p>
          <Typography className={styles.stat} variant='h4'>
            {stat} {units}
          </Typography>
          {/* <h2 className={styles.stat}>
            {stat} {units}
          </h2> */}
        </CardContent>
        </Box>
      </Card>

  );
};

export default StatCard;
