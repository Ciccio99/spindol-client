import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

import UserContext from '../../../context/userContext';
import UserServices from '../../../services/UserServices';

const AccountInfoPanel = () => {
  const initFormState = { email: '', name: '' };
  const { user, dispatchUser } = useContext(UserContext);
  const [formState, setFormState] = useState(initFormState);
  const [buttonDisabled, setButtonDisabled] = useState(true);


  useEffect(() => {
    if (formState.email || formState.name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updateBody = {};
    Object.keys(formState).forEach((key) => {
      if (formState[key]) {
        updateBody[key] = formState[key];
      }
    });
    async function update() {
      try {
        const user = await UserServices.update(updateBody);
        dispatchUser({
          type: 'USER_UPDATE',
          user,
        });
        setFormState(initFormState);
      } catch (error) {
        // TODO: Set warning popup for Errors
        console.log(error);
      }

    };
    update();
  }

  return (
    <Box mt={1} mb={5}>
        <form onSubmit={handleOnSubmit} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formState.email}
                name='email'
                type='email'
                placeholder={user.email}
                label='Email'
                onChange={handleInputChange}
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={formState.name}
                name='name'
                placeholder={user?.name}
                label='Full Name'
                onChange={handleInputChange}
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                />
            </Grid>
            <Grid item xs={8} sm={4}>
                <Button disabled={buttonDisabled} type='submit' color='secondary' variant='contained' disableElevation size='large' fullWidth>
                  <Typography variant='body2'>Update Info</Typography>
                </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
  );
}

export default AccountInfoPanel;
