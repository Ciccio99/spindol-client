import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Link,
  Grid,
  // Box,
  Typography,
  Container,
  FormHelperText,
  LinearProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga';
import UserServices from 'services/UserServices';
import UserContext from 'context/userContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInView = () => {
  const classes = useStyles();
  const { dispatchUser } = useContext(UserContext);
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
      ReactGA.set({
        userId: user._id,
        userEmail: user.email,
      });
      ReactGA.event({
        category: 'User',
        action: 'User Sign In',
        value: parseInt(user._id, 10),
      });
      history.replace(from);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Hypnos.ai - Sign In</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Discover which sleep trial best improves your sleep and overall happiness. Sign in to you Hypnos.ai here."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {errorMessage ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
        <form className={classes.form} onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {loading ? <LinearProgress color="secondary" /> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to="/register" component={RouterLink} variant="body2">
                Don't have an account? Register now!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInView;
