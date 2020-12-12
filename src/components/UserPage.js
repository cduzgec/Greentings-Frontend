import React, {useState,useEffect } from "react";
import { withRouter, Link} from "react-router-dom";
import OurButton from "./button.js";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: "500px",
    marginRight: "500px",
  },
  }));


function UserPage({ match }) {
  const classes = useStyles();
  useEffect(() => { fetchUser();}, []);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const data = await fetch(`/user/${match.params.user_id}`)
    const user = await data.json();
    setUser(user)
    console.log("USERPAGE")
    console.log(user);
  }

  function forward(){window.location.replace(`/changepassword/${match.params.user_id}`)}

  return (
    <div>
        <h1>Welcome {user.first_name}</h1>
        <Grid container>
          <OurButton
              onClick={forward} 
              fullWidth  variant="contained" className={classes.submit} >
                Change Password
            </OurButton>
        </Grid>
    </div>
  );
}

export default withRouter(UserPage);
