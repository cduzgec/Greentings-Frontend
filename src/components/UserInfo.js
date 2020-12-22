import React, {useState,useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserPage from "./UserPage";

const styles = {
  paperContainer: {
      marginTop: "1px",
      marginLeft: "500px",
      marginRight: "500px"
  },
};


  const useStyles = makeStyles({
    item: {
      '& span, & svg': {
        fontSize: '22px'
      }
    }
  });

function UserInfo(){
    const classes = useStyles();

    useEffect(() => { fetchUser(); }, []);
    const [user, setUser] = useState("")
    const fetchUser = async () => {             /// try catchle
      const data = await fetch(`/user/${localStorage.getItem("user_id")}`);
    
      const userinfo = await data.json();
      setUser(userinfo);
      console.log(user)
    };

    return (
      <div>       
      <UserPage/>
        <Paper style={styles.paperContainer} elevation={10}>
        <Typography variant="h6" >
        <List>
            <ListItem >          
              <ListItemText className={classes.item} primary="Email :"/> 
               <Typography style={{ textTransform: 'lowercase'}} variant="h6" > 
               {user.email} 
               </Typography>           
            </ListItem>
            <ListItem >
              <ListItemText className={classes.item} primary="First Name:" /> {user.first_name}
            </ListItem>
            <ListItem >
              <ListItemText className={classes.item} primary="Last Name:" /> {user.last_name}
            </ListItem>
            <ListItem >
              <ListItemText className={classes.item} primary="Phone:" /> {user.phone_number} 
            </ListItem>
        </List>
        </Typography>
        </Paper>
      </div>
    )
  }

  export default UserInfo;