import React from 'react';
import {
  Box, Typography, ButtonBase, Button,
} from '@material-ui/core';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'start',
    borderRadius: '15px',
    textTransform: 'none',
    lineHeight: '0.5rem',
  },
}));

const GoalMenuButton = (props) => {
  const { label, subLabel, ...rest } = props;
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" fullWidth disableRipple disableTouchRipple classes={classes} {...rest}>
      <Box px={1} py={2} width="100%" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" style={{ lineHeight: '1.25rem' }}><strong>{label}</strong></Typography>
          <Typography variant="caption">{subLabel}</Typography>
        </Box>
        <ArrowForwardIosTwoToneIcon fontSize="small" />
      </Box>
    </Button>
  );
};

export default GoalMenuButton;
