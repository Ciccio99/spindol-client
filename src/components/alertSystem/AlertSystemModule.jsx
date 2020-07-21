import React from 'react';
import {
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
  useAlertSystemState,
  useAlertSystemDispatch,
} from 'context/alertSystemContext';

const AlertSystemModule = () => {
  const alertSystemState = useAlertSystemState();
  const dispatchAlertSystem = useAlertSystemDispatch();

  const handleAlertClose = () => {
    dispatchAlertSystem({
      type: 'CLOSE',
    });
  };

  return (
    <Snackbar open={alertSystemState.open} autoHideDuration={5000} onClose={handleAlertClose}>
      <MuiAlert
        severity={alertSystemState.severity}
        onClose={handleAlertClose}
        elevation={1}
        variant="filled"
      >
        {alertSystemState.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSystemModule;
