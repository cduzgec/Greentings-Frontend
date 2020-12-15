import React, {useRef,useState, useEffect} from 'react';
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

  function EmailConfirmation({ match }) {
    const classes = useStyles();
    console.log(match)

    const codeRef = useRef('') 
    const [message,setMessage] = useState("");
    useEffect(() => {if (message) {console.log("Response message: "+ message); alert("Error: "+ message);}}, [message]);

    async function sendCode () {
      try {
        const response = await fetch ('/emailconfirm/', {       
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
            "user_id": match.params.user_id,      
            "verification_code": codeRef.current.value,

          })
        });
        console.log("Response Status: "+response.status)                        

        if (response.status === 200){      
          localStorage.setItem("isLogged", true)
          localStorage.setItem("user_id", match.params.user_id)
          window.location.replace(`/myaccount/${match.params.user_id}`);            // ıf admins also get email confirmation change this to home page                         
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
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please put the code you received
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Code"
            label="Code"
            type="Code"
            id="Code"
            inputRef={codeRef}
            autoComplete="current-password"
          />
          <OurButton
            onClick={sendCode}
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

export default EmailConfirmation;
 