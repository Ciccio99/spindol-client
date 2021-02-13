import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
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
