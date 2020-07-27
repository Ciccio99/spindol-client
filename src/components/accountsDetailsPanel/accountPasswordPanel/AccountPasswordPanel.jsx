import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core';

import { useAlertSystemDispatch } from 'context/alertSystemContext';
import { useUserDispatch } from 'context/userContext';
import UserServices from 'services/UserServices';

const AccountPasswordPanel = () => {
  const initFormState = { password: '', confirmPassword: '', currentPassword: '' };
  const dispatchUser = useUserDispatch();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [formState, setFormState] = useState(initFormState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (formState.password && formState.confirmPassword && formState.currentPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('New Password must match Confirm New Password.');
      return;
    }

    if (formState.password === formState.currentPassword) {
      setErrorMessage('New Password cannot match Current Password');
      return;
    }

    async function update() {
      try {
        const user = await UserServices.update(formState);
        dispatchUser({
          type: 'USER_UPDATE',
          user,
        });
        setFormState(initFormState);
        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Password updated!',
        });
      } catch (error) {
        setErrorMessage(error.response.data.message);
        dispatchAlertSystem({
          type: 'ERROR',
          message: error.response.data.message,
        });
      }
    }
    update();
  };

  return (
    <Box mt={5} mb={5}>
      <form onSubmit={handleOnSubmit} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formState.password}
              name="password"
              placeholder="*****"
              label="New Password"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formState.confirmPassword}
              name="confirmPassword"
              placeholder="*****"
              label="Confirm New Password"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formState.currentPassword}
              name="currentPassword"
              placeholder="*****"
              label="Current Password"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {errorMessage ? <Grid item xs={12}><FormHelperText error>{errorMessage}</FormHelperText></Grid> : null}
          <Grid item xs={8} sm={4}>
            <Button disabled={buttonDisabled} type="submit" color="secondary" variant="contained" disableElevation size="large" fullWidth>
              <Typography variant="body2">Update Password</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AccountPasswordPanel;
