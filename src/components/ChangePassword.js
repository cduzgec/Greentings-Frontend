import React, {useRef, useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
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

function ChangePassword() {
  const classes = useStyles();

  const passwordRef = useRef('')  // passwordRef.current.value
  const password2Ref = useRef('')  // passwordRef.current.value

  const [message,setMessage] = useState("");
  useEffect(() => {if (message) {console.log("Response message: "+ message); alert("Error: "+ message);}}, [message]);

  function checkIfSame(){
    if (passwordRef.current.value === password2Ref.current.value )
    {
      sendPassword();
    }
    else
    {
      alert("Please make sure that passwords are the same");
      return false;
    }
  }

  async function sendPassword () {
    try {
      const response = await fetch ('/pass/', {       
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
          "user_id": localStorage.getItem("user_id"),
          "password": passwordRef.current.value
        })
      });
      console.log("Sending this data: " + passwordRef.current.value)
      console.log("Response Status: "+response.status)
      
  
      if (response.status === 201){                                  // kodunu öğren
        alert("Your password has been successfully changed")
      }
      else {
        response.json().then(data => {setMessage(data.message)})       
      }
    }
  catch (e)
    {
      console.log(e)
    }

  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please enter your new password
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new password"
            label="new password"
            name="new password"
            autoFocus
            inputRef={passwordRef}
            />
            <Typography component="h1" variant="h5">
             Please re-enter your new password
            </Typography>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="re-enter new password"
            label="re-enter new password"
            type="re-enter new password"
            id="re-enter new password"
            inputRef={password2Ref}
          />
          <OurButton
            href="/userpage"
            className={classes.submit}  
            type="submit" 
            fullWidth  variant="contained" 
            onClick={checkIfSame}>
              Change password
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
  );
}

export default withRouter(ChangePassword);