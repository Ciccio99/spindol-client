import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import UserContext from '../../context/userContext';
import UserServices from '../../services/UserServices';
import styles from './AccountDetailsPanel.module.css';
import AccountInfoPanel from './accountInfoPanel/AccountInfoPanel';
import AccountPasswordPanel from './accountPasswordPanel/AccountPasswordPanel';

const AccountDetailsPanel = () => {
  const initFormState = { email: '', name: '' };
  const { user, dispatchUser } = useContext(UserContext);
  const [formState, setFormState] = useState(initFormState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (formState.email || formState.name || (formState.password && formState.confirmPassword)) {
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

      }

    };
    update();
  }

  return (
    <Box className={styles.panel} mt={4} mb={4} boxShadow={0} borderRadius={10} p={3}>
      <Box mb={5}>
        <Typography variant='h5'>Account Info</Typography>
      </Box>
      <AccountInfoPanel/>
      <Divider/>
      <AccountPasswordPanel/>
    </Box>
  );
};

export default AccountDetailsPanel;
