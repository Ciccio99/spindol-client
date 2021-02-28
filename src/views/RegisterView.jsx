import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet-async';
import UserServices from 'services/UserServices';
import { useUserDispatch } from 'context/userContext';
import { setUserId, Event } from 'utils/Tracking';
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
import Button from 'components/common/Button';
import LinkText from 'components/common/LinkText';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';

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
  title: {
    marginBottom: theme.spacing(4),
  },
}));

const useInputStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    borderBottom: `1px solid ${COLORS.LIGHT_GRAY}`,
    caretColor: COLORS.RED,
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
  return <InputBase classes={classes} className={className} {...otherProps} />;
};

const RegisterView = () => {
  const history = useHistory();
  const { token } = useParams();
  const classes = useStyles();
  const dispatchUser = useUserDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const user = await UserServices.signUp(
        email,
        name,
        password,
        confirmPassword,
        token
      );
      if (user) {
        dispatchUser({
          type: 'USER_LOGIN',
          user,
        });
        setUserId(user._id);
        Event('User', 'Created Account', `UserId: ${user._id}`);

        history.push(ROUTES.plans);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <title>Spindol - Register</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3" className={classes.title}>
          Register
        </Typography>
        {errorMessage ? (
          <FormHelperText error>{errorMessage}</FormHelperText>
        ) : null}
        <form className={classes.form} onSubmit={signUp}>
          <Paper elevation={24}>
            <Box px={6} py={4} pb={6}>
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
                    id="name"
                    placeholder="Full Name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HypnosInput
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HypnosInput
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            </Box>
          </Paper>
          {loading ? <LinearProgress color="secondary" /> : null}
          <Button
            type="submit"
            text="Sign Up"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <LinkText to={ROUTES.signIn}>
                Already have an account? Sign In <span>→</span>
              </LinkText>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterView;
