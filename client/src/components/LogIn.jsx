// import React and hooks from framework
import React, { useState } from 'react';

// import textfield element from material ui package
import TextField from '@material-ui/core/TextField';

import SendIcon from '@material-ui/icons/Send';

// import style elements form material ui package
import {
  makeStyles,
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
  button: {
    margin: theme.spacing(1),
  },
}));

const LogIn = () => {
  // create variable to utilize useStyles object styling setting in component
  const classes = useStyles();

  // set up component state using react useState hooks
  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('password');

  // need onSubmit function
  const handleSubmit = (event) => {
    // prevent page refresh default form action
    event.preventDefault();
    // can see the text values from input field need make call to back end with information
    const { email, password } = event.target;

    // create object containing user information
    const userCreds = {
      e_mail: email,
      pass_word: password,
    };

    alert(`These are the user creds => eMail:${email} pWord:${password}`);

    // reset form input fields
    setEmail('your@email.com');
    setPassword('password');
  };

  return (
    <div className={classes.root}>
      <form className={classes.box} onSubmit={handleSubmit}>
        <h1>Creat Account / Login</h1>
        <TextField
          className={classes.fields}
          required
          id='outlined-required'
          label='Required'
          variant='outlined'
          name='email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          className={classes.fields}
          required
          id='outlined-required'
          label='Required'
          variant='outlined'
          name='password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant='contained' type='submit' endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
