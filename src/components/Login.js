import React, {useRef,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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





function Login() {
  const classes = useStyles();
  const [message,setMessage] = useState("");

  const emailRef = useRef('') 
  const passRef = useRef('') 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function InputCheck(){
    if(email === "") {
      alert("Error: Email cannot be blank!");
      return false;
    }
    if (password === "" ){
      alert("Error: The password cannot be blank!");
      return false;
    }
    
    return sendUser()
  }

  async function sendUser () {
      try {
        const response = await fetch ('/login/', {       
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
            "username": emailRef.current.value,
            "password": passRef.current.value,
  
          })
        });
        console.log("Response Status: "+response.status)
        response.json().then(data => {setMessage(data.message)})
        console.log("Response message: "+ message)

        if (response.status === 202)
          window.location.replace("/userpage")
        else 
          alert("Error: "+ message);
    }
    catch (e)
    {
      console.log(e)
    }
    console.log("Sending this data: " + emailRef.current.value+" "+passRef.current.value)
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
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
            inputRef={emailRef} 
            onChange={e => setEmail(e.target.value)} 
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
            inputRef={passRef}
            onChange={e => setPassword(e.target.value)} 
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <OurButton
            onClick={InputCheck}
            className={classes.submit}  
            fullWidth  variant="contained" >
              Login
          </OurButton>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2" className={classes.link}>
              Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" className={classes.link}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;