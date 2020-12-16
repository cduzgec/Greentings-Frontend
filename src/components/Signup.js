import React, {useRef, useState, useEffect} from 'react';
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
import PasswordStrengthBar from 'react-password-strength-bar';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import {InputAdornment, IconButton } from "@material-ui/core";

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
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  const [id,setId] = useState("");
  useEffect(() => {if (id) {console.log("User logged in: "+ id); window.location.replace(`/emailconfirmation/${id}`);}}, [id]);
  const [message,setMessage] = useState("");
  useEffect(() => {if (message) {console.log("Response message: "+ message); alert("Error: "+ message);}}, [message]);
 
  function checkForm()
  {
    if (check === false){
      alert("Please check terms and conditions");
      return false; 
    }
    if(fname === "") {
      alert("Error: First name cannot be blank!");
      return false;
    }
    //var re = /^\w+$/;
    //if(!re.test(fnameRef.value)) 
    //{ alert("Error: Username must contain only letters, numbers and underscores!"); return false;}
    
    if(lname === "") {
      alert("Error: Last name cannot be blank!");
      return false;
    }
    if(email === "") {
      alert("Error: Email cannot be blank!");
      return false;
    }
    if (password === "" ){
      alert("Error: The password cannot be blank!");
      return false;
    }
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    if(password !== "" ) {
      if(!re.test(password)) {
        alert("The password you have entered is not valid!");
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
      return false;
    }
    return sendUser()
  }

  async function sendUser () {
      try {
        const response = await fetch ('/signup/', {       
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
            "password": passRef.current.value,
            "phone_number": "NULL",
            "verified": "false",
            "user_type": "Customer",  
            "verification_code" : "111111"  
          })
        });
        console.log("Sending this data: " + emailRef.current.value+" "+passRef.current.value)
        console.log("Response Status: "+response.status)  

        if (response.status === 201){
          response.json().then(data => {setId(data.user_id)})
        }
        else {
          response.json().then(data => {setMessage(data.message)})
          
        }
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
                autoComplete="fname"          //onSubmit= {checkForm()}   
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={fnameRef}
                onChange={e => setFname(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="lname"
                inputRef={lnameRef}
                onChange={e => setLname(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                inputRef={emailRef}
                onChange={e => setEmail(e.target.value)} 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                
                id="password"
                autoComplete="current-password"
                inputRef={passRef}
                onChange={e => setPassword(e.target.value)} 
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <PasswordStrengthBar password={password} />  
              <p>Password should contain at least one number, one lowercase, one uppercase letter and at least six characters </p>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the Terms and Conditions"
                onClick={() => setCheck(!check)}
              />
            </Grid>
          </Grid>
          <OurButton 
            onClick={checkForm} 
            className={classes.submit} 
            fullWidth variant="contained">
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