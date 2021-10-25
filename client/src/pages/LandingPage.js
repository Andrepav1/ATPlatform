import React from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth0 } from "@auth0/auth0-react";

import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://miro.medium.com/max/3200/0*wUbJjPFh9sUc7HxK)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  submit: {
    margin: theme.spacing(1, 0, 6),
  },
}));

function LandingPage() {
  const styles = useStyles();

  const { loginWithRedirect } = useAuth0();

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
            SOME STUFF
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={() => loginWithRedirect()}
          >
            Log in
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = () => {
  return {};
};

export default connect(null, mapDispatchToProps)(LandingPage);
