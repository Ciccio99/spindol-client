import React from 'react';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select: {
    '&:focus': {
      borderRadius: theme.shape.borderRadiusSmall,
    },
  },
}));

const SelectInput = ({ classes, children, ...other }) => {
  const baseClasses = useStyles();
  return <Select classes={{ ...baseClasses, ...classes }} {...other}>{children}</Select>;
};

export default SelectInput;
