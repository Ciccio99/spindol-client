import React from 'react';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  journalRoot: {
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    caretColor: COLORS.RED,
  },
  journalInput: {
    '&::placeholder': {
      color: COLORS.BLACK,
      opacity: 1,
    },
  },
}));

const JournalInput = (props) => {
  const classes = useStyles();

  return (
    <InputBase
      classes={{ root: classes.journalRoot, input: classes.journalInput }}
      multiline
      fullWidth
      placeholder="Last night, I dreamed..."
      {...props}
    />
  );
};

export default JournalInput;
