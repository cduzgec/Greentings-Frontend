import React, {useState,useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserPage from "./UserPage";
import { Link } from "react-router-dom";
import Sabanj from "./images/Sabancı.JPG" 

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
    },
    img :{
      marginTop: "30px"
    }
  });

function UserInfo(){
    const classes = useStyles();


    return (
      <div>       
      <UserPage/>
        <Paper style={styles.paperContainer} elevation={10}>
        <Typography variant="h6" >
        <List>
            <ListItem >          
              <ListItemText className={classes.item} primary="Email :"/> 
               <Typography style={{ textTransform: 'lowercase'}} variant="h6" > 
                 greentingsshop@gmail.com
               </Typography>           
            </ListItem>
            <ListItem >
              <ListItemText className={classes.item} primary="Address :" />  Orta, Sabancı Ünv. No:27, 34956 Tuzla/İstanbul
            </ListItem>
        </List>
        </Typography>
        </Paper>

        <img className={classes.img} src={Sabanj} alt="sabanj" height={400} width={690}/>



      </div>
    )
  }

  export default UserInfo;