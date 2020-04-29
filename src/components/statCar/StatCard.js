import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './StatCard.module.css';

const StatCard = ({ description, stat, units }) => {
  return (
      <Card className={styles.card} elevation={0}>
      <Box pl={1} pr={1} pt={1}>
        <CardContent>
          <p className={styles.description}>
            {description}
          </p>
          <h2 className={styles.stat}>
            {stat} {units}
          </h2>
        </CardContent>
        </Box>
      </Card>

  );
};

export default StatCard;
