import React, {useRef, useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
import OurButton from "./button.js";
import UserPage from "./UserPage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ChangeInfo() {
  const classes = useStyles();

  const fnameRef = useRef('') //creating a refernce for TextField Component
  const lnameRef = useRef('')  // lnameRef.current.value
  const emailRef = useRef('') 
  const phoneRef = useRef('') 

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => { fetchUser(); }, []);
  const [user, setUser] = useState("")
  const fetchUser = async () => {            
    const data = await fetch(`/user/${localStorage.getItem("user_id")}`);
  
    const userinfo = await data.json();
    setUser(userinfo);
    setEmail(userinfo.email)
    setPhone(userinfo.phone_number)
    console.log({userinfo})
    
  };

  async function sendInfo () {
    try {
      const response = await fetch ('/changeuser/', {       
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
          "first_name": fnameRef.current.value,
          "last_name": lnameRef.current.value,
          "email": email,
          "phone_number": phone
      })
      });
      console.log(fnameRef.current.value,lnameRef.current.value,email,phone)
      console.log("Response Status: "+response.status)
  
      if (response.status === 200){                               
        alert("Your information has been successfully changed");
        localStorage.setItem("firstName",fnameRef.current.value)
        localStorage.setItem("lastName",lnameRef.current.value)
      }
      else {
        response.json().then(data => {alert("This email is taken.Please try another one.")})       
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
          Change Information
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
                defaultValue= {localStorage.getItem("firstName")}
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
                autoComplete="lname"
                defaultValue= {localStorage.getItem("lastName")}
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
                autoComplete="email"
                defaultValue= {email}
                inputRef={emailRef}
                onChange={e => setEmail(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Phone Number"
                autoComplete="email"
                defaultValue= {phone}
                inputRef={phoneRef}
                onChange={e => setPhone(e.target.value)} 
              />
            </Grid>
            
            <Grid item xs={12}>

            </Grid>
          </Grid>
          <OurButton 
            onClick={sendInfo} 
            className={classes.submit} 
            fullWidth variant="contained">
              Change Information
          </OurButton>

        </form>
      </div>
    </Container>
    </div>
  );
}

export default withRouter(ChangeInfo);