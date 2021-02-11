import React, { useState } from 'react';
import { connect } from 'react-redux'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { BASE_URL } from '../constants/apiConstants';

import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://miro.medium.com/max/3200/0*wUbJjPFh9sUc7HxK)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1,0,6),
  },
}));

const ACCOUNTS_URL = BASE_URL + "/auth/accounts"; 
const LOGIN_URL = BASE_URL + "/auth/login"; 

function LandingPage({ login }) {
  
  const styles = useStyles();

  const [api_key, setApi_key] = useState('')
  const [account_id, setAccount_id] = useState('')
  const [accounts, setAccounts] = useState([])
  const [textFieldDisabled, setTextFieldDisabled] = useState(false)
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (event) => {
    setAccount_id(event.target.innerText);
    setAnchorEl(null);
  };

  const authenticate = () => {

    // Request to server 
    fetch(LOGIN_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ apiKey: api_key })
    })
    .then(response => response.json())
    .then(({ error }) => {
      if(error) {
        return alert("Could not use API KEY");
      }
      login(api_key, account_id);
    })
    .catch((err) => {
      alert("Could not use API KEY", err);
    })
  }

  const requestAccounts = () => {

    var url = new URL(ACCOUNTS_URL);
    url.search = new URLSearchParams({ apiKey: api_key }); 
    
    fetch(url.toString(), {
      mode: 'cors',
    })
    .then(response => response.json())
    .then(({ accounts, error }) => {

      if(error || accounts.lenght === 0) {
        setAccounts([]);
        alert("Could not use API KEY", error);
      }
      else if(accounts.length === 1) {
        setAccount_id(accounts[0].id)
        authenticate();
      }
      else {
        setAccounts(accounts);
        setAccount_id(accounts[0].id);
        setTextFieldDisabled(true);
        // console.log(accounts);
      }

    })
    .catch((err) => {
      setAccounts([]);
      alert("Could not use API KEY", err);
    })

  }

  return (
    <Grid container component="main" className={styles.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={7} className={styles.image} />
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Your OANDA API Key
          </Typography>
          <form className={styles.form} noValidate>
            <TextField
              disabled={textFieldDisabled}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="API Key"
              autoFocus
              value={api_key}
              onChange={(event) => setApi_key(event.target.value)}
            />
            <Button
              disabled={textFieldDisabled}
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={() => requestAccounts()}
            >
              Confirm
            </Button>
            {
              accounts.length !== 0 &&
              <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  {"Selected Account: " + account_id}
                </Button>
                <Menu
                  variant="selectedMenu"
                  color="primary"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                >
                  {
                    accounts.map(({id})=>(<MenuItem onClick={handleSelect}>{id}</MenuItem>))
                  }
                </Menu>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                  onClick={() => authenticate()}
                >
                  Select Account
                </Button>
              </div>
            }
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (api_key, account_id) => dispatch({
      type: 'LOGIN',
      payload: { api_key, account_id },
    })
  }
}


export default connect(null, mapDispatchToProps)(LandingPage)
