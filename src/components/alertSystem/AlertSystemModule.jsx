import React from 'react';
import {
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
  useAlertSystemState,
  useAlertSystemDispatch,
} from 'context/alertSystemContext';
import useMedium from 'hooks/useMedium';

const useStyles = makeStyles(() => ({
  anchorOriginBottomCenter: {
    bottom: '96px',
  },
}));

const AlertSystemModule = () => {
  const alertSystemState = useAlertSystemState();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const { isMedium } = useMedium();
  const classes = useStyles();

  const handleAlertClose = () => {
    dispatchAlertSystem({
      type: 'CLOSE',
    });
  };

  return (
    <Snackbar
      open={alertSystemState.open}
      autoHideDuration={5000}
      onClose={handleAlertClose}
      classes={isMedium ? classes : null}
    >
      <MuiAlert
        severity={alertSystemState.severity}
        onClose={handleAlertClose}
        elevation={24}
        variant="filled"
      >
        {alertSystemState.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSystemModule;
