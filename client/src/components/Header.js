import React from 'react';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: 9999,
  }
}));

function Header({ logout }) {
  const styles = useStyles();
  
  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar position="absolute" className={styles.appBar}>
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={styles.title}>
            ATS
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({
      type: 'LOGOUT',
    }),
  }
}


export default connect(null, mapDispatchToProps)(Header)