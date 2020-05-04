import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/userContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://sleepwell.ai/">
        Sleepwell.ai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' }};

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    let user = undefined;
    try {
      let { data } = await axios.post(`${process.env.REACT_APP_API_URI}/users/login`, { email, password }, { withCredentials: true });
      if (data.user) {
        user = data.user;
      }
    } catch (error) {
      if ([401, 403].indexOf(error?.response?.status) !== -1) {
        setErrorMessage(error.response.data.message);
      };
    } finally {
      setLoading(false);
    }
    if (user) {
      dispatchUser({
        type: 'USER_LOGIN',
        user,
      });

      history.replace(from);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage ? <FormHelperText error={true}>{errorMessage}</FormHelperText> : null}
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
          {loading ? <LinearProgress color='secondary'/> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignInView;
