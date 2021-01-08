import React, {useRef, useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import OurButton from "./button.js";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.dark,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      color: theme.palette.success.dark,
    }
  
  }));



function ForgotPassword() {
  const classes = useStyles();

  const emailRef = useRef('')  
  const [message,setMessage] = useState("");

  async function sendPassword () {
    try {
      const response = await fetch ('/forgot/', {       
        method: "post",
        mode: "cors",
        headers:
        {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "Connection": "keep-alive",
          "Content-Encoding": "gzip, deflate, br",
          "Accept-Encoding": "gzip, deflate, br"
        },
        body: JSON.stringify({
          "email": emailRef.current.value
        })
      });
      console.log("Sending this data: " + emailRef.current.value)
      console.log("Response Status: "+response.status)
  
      if (response.status === 200){                               
        alert("Please check your inbox");
      }
      else {
        alert("You need to insert a valid email")       
      }
    }
  catch (e)
    {
      console.log(e)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please enter your email address
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Email Adress"
            label="Email Adress"
            type="Email Adress"
            id="Email Adress"
            inputRef={emailRef}
          />
          <OurButton
            onClick={sendPassword}
            className={classes.submit}  
            fullWidth  variant="contained" >
              Confirm
          </OurButton>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default withRouter(ForgotPassword);
