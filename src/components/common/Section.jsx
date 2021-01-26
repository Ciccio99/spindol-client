import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
}));

const Section = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.section)} {...rest}>
      {children}
    </div>
  );
};
export default Section;
