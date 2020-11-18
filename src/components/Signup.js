import React, {useRef} from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.success.dark,
  }
}));


function SignUp () {
  // write javascipt here ***************************************************************
  const classes = useStyles()



  const fnameRef = useRef('') //creating a refernce for TextField Component
  const lnameRef = useRef('')  // lnameRef.current.value
  const emailRef = useRef('') //on clicking button accesing current value of TextField and outputing it to console
  const passRef = useRef('') 
// fnameRef.current.value, lnameRef.current.value, emailRef.current.value, passRef.current.value
  
async function sendUser () {
      if ((fnameRef.current.value === "") || (lnameRef.current.value === "") ||(emailRef.current.value === "") ||(passRef.current.value === ""))  
      return 
      
      try {

        let r = Math.random().toString(36).substring(7);
        console.log("random code for this user:", r);

        await fetch ('/user/', {       //////////// API DEGISICEK
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
            "first_name": fnameRef.current.value,
            "last_name": lnameRef.current.value,
            "email": emailRef.current.value,
            "username": "NULL",
            "password": passRef.current.value,
            "phone_number": "NULL",
            "user_type": "Customer",
            "code": r
          })
        });

    }
    catch (e)
    {
      console.log(e)
     }

    console.log("Sending this data: " + fnameRef.current.value+" " + lnameRef.current.value+" "+emailRef.current.value+" "+passRef.current.value)
    }
  
  return (  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>      
          <LockOutlinedIcon />                          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>    
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"             
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={fnameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lnameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"                                 //address bar 
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passRef}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <OurButton 
            href="/emailconfirmation"
            onClick={sendUser} 
            className={classes.submit} 
            type= "submit" 
            fullWidth variant="contained"  >
              Sign Up
          </OurButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.link}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


export default SignUp;