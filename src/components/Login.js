import React, {useRef,useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
  
  const emailRef = useRef('') 
  const passRef = useRef('') 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [id,setId] = useState("");
  useEffect(() => {if (id) {console.log("User logged in: "+ id);

    localStorage.removeItem("isLogged")
    localStorage.setItem("isLogged", true)

    localStorage.removeItem("user_id")
    localStorage.setItem("user_id", id)

    //console.log("LOGINDEYIM")
    console.log(localStorage.getItem("isLogged"))
    console.log(localStorage.getItem("user_id"))
    setFlag("go");}}, [id]
  );

  const [flag,setFlag] = useState("");
  useEffect(() => {if (flag) {window.location.replace(`/myaccount/${id}`);}}, [flag]);


  const [message,setMessage] = useState("");
  useEffect(() => {if (message) {console.log("Response message: "+ message); alert("Error: "+ message);}}, [message]);

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
            "email": emailRef.current.value,      // email
            "password": passRef.current.value,
  
          })
        });
        //console.log("Sending this data: " + emailRef.current.value+" "+passRef.current.value)
        console.log("Response Status: "+response.status)

        if (response.status === 202){
          response.json().then(data => {localStorage.setItem("user_type", data.user_type); setId(data.user_id)})
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