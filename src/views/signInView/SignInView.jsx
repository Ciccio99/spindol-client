import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CssBaseline,
  Paper,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
  LinearProgress,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet-async';
import UserServices from 'services/UserServices';
import { useUserDispatch } from 'context/userContext';
import { setUserId, Event } from 'utils/Tracking';
import Button from 'components/common/Button';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    paddingBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formContainer: {
    minWidth: "50vw",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '80%',
  },
}));

const SignInView = () => {
  const classes = useStyles();
  const dispatchUser = useUserDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' } };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { user, error } = await UserServices.signIn(email, password);
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else if (user) {
      dispatchUser({
        type: 'USER_LOGIN',
        user,
      });
      setUserId(user._id);
      Event('User', 'User Sign In');

      history.replace(from);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <title>Hypnos - Sign In</title>
        <meta
          name="description"
          content="A sleep journal that helps you get better sleep. Sign in to Hypnos here."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <img className={classes.avatar} src={getMoodSvg('excellent')} alt="excellent smiley face" /> */}
        <Typography variant="h3" className={classes.title}>
          Sign In
        </Typography>
        {errorMessage ? <FormHelperText error>{errorMessage}</FormHelperText> : null}

        <form className={classes.form} onSubmit={login}>
          <Paper elevation={24}>
            <Box px={6} py={4} pb={6} minWidth="40vw">
              <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                  <HypnosInput
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HypnosInput
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {loading ? <Grid item xs={12}><LinearProgress color="secondary" /></Grid> : null}
              </Grid>
            </Box>
        </Paper>
      <Box display="flex" justifyContent='center'>
        <Button
          text="Sign In →"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        />
      </Box>

      </form>

      </div>
    </Container>
  );
};

const useInputStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    borderBottom: `1px solid ${COLORS.LIGHT_GRAY}`,
  },
  input: {
    '&::placeholder': {
      color: COLORS.BLACK,
      opacity: 0.5,
      fontSize: theme.typography.subtitle1.fontSize,
    },
  },
}));

const HypnosInput = (props) => {
  const { className, ...otherProps } = props;
  const classes = useInputStyles();
  return (
    <InputBase classes={classes} className={className} {...otherProps} />
  );
}

export default SignInView;
