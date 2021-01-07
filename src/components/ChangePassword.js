import React, {useRef, useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
import OurButton from "./button.js";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import {InputAdornment, IconButton } from "@material-ui/core";
import UserPage from "./UserPage";
//import jsSHA from 'jssha'
import jsSHA from "jssha/dist/sha.mjs"
//import jsSHA256 from "jssha/dist/sha256.js";
import jsSHA256 from "jssha"

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

  const oldpasswordRef = useRef('')  // passwordRef.current.value
  const newpasswordRef = useRef('')  
  const newpassword2Ref = useRef('')  

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);


  const [message,setMessage] = useState("");
  useEffect(() => {if (message) {console.log("Response message: "+ message); alert("Error: "+ message);}}, [message]);

  function CheckPassword(){
    console.log("Check the password inputs")
    if (oldpasswordRef.current.value === "" || newpasswordRef.current.value === "" || newpassword2Ref.current.value === "" )
    {
      alert("Please fill the required places.");
      return false;
    }
    if (newpasswordRef.current.value !== newpassword2Ref.current.value)
    {
      alert("Please make sure that passwords are the same");
      return false;
    }
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    if(!re.test(newpasswordRef.current.value)) {
      alert("The password you have entered is not valid! You should have at least one number, one lowercase and one uppercase letter and at least six characters.");
      return false;
    }
    else
    {
      //hashPassword();
      sendPassword();
    }
  }

  function hashPassword(){
    const jsSHA = require("jssha");
    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(newpasswordRef.current.value);
    const hash = shaObj.getHash("HEX");
    console.log(hash);

    //sendPassword();
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
          "old_password": oldpasswordRef.current.value,
          "new_password": newpasswordRef.current.value
        })
      });
      console.log("Sending this data: " + newpasswordRef.current.value)
      console.log("Response Status: "+response.status)
      
  
      if (response.status === 200){                               
        alert("Your password has been successfully changed");
        window.location.replace(`/myaccount/${localStorage.getItem("user_id")}`);
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
    <div>       
    <UserPage/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please enter your old password
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="old password"
            label="old password"
            name="old password"
            autoFocus
            inputRef={oldpasswordRef}
            />
            <Typography component="h1" variant="h5">
            Please enter your new password
            </Typography>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new password"
            label="new password"
            type="new password"
            id="new password"
            inputRef={newpasswordRef}
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
            inputRef={newpassword2Ref}
            type={showPassword2 ? "text" : "password"} // <-- This is where the magic happens
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <p>Password should contain at least one number, one lowercase, one uppercase letter and at least six characters </p>
          
          <OurButton
            className={classes.submit}  
            fullWidth  variant="contained" 
            onClick={CheckPassword}>
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
    </div>
  );
}

export default withRouter(ChangePassword);