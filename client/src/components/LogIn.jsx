// import React framework
import React from 'react';

// import textfield element from material ui package
import TextField from '@material-ui/core/TextField';

// import style elements form material ui package
import {
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Paper,
  Hidden,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5%',
    height: window.innerHeight * 0.9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    padding: '20px 20px',
  },
  fields: {
    padding: '20px',
  },
}));

const LogIn = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <h1>Creat Account / Login</h1>
        <TextField
          className={classes.fields}
          required
          id='outlined-required'
          label='Required'
          defaultValue='Your@email.com'
          variant='outlined'
        />
        <TextField
          className={classes.fields}
          required
          id='outlined-required'
          label='Required'
          defaultValue='Password'
          variant='outlined'
        />
      </div>
    </div>
  );
};

export default LogIn;
