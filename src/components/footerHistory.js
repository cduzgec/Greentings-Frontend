
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    
      fontFamily: "Arial, Helvetica, sans-serif",
      margin: "50px 200px",
      marginBottom: "50 px",
      width: "100%",
      height: "fit-content",
      padding: "40px",
    },
  },
  p:{
      fontSize: "20px",
      color: "black"
  },
  h1:{
    color: "black",
  },
  box:{
    backgroundColor: fade(theme.palette.common.white, 0.80),
    padding: "20px",
  }

  
}));

export default function History() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={10}>
      <div className={classes.box}>
        
        <h2 className={classes.h1}>About Us</h2>
        <p className={classes.p}>
        We’re on a mission to to help make sustainable, 
        earth-friendly commerce the new normal. 
        We inspire conscious commerce by offering trusted, 
        high quality goods that create authentic positive impact. 
        Together, we aim to learn, share, and celebrate a healthier planet..
        </p>
 
        <h3 className={classes.h1}>Our Values</h3>
        <p className={classes.p}>
       
Be transparent, 
Be authentic, 
Be passionate, 
Inspire our customers, 
Create positive change, 
Details matter
        </p>
        <h3 className={classes.h1}>Our Story</h3>
        <p className={classes.p}>        
        Greentings started back in 2020  as a CS308 Software Engineering Course Project.
        Today, we aim to build first green shopping environment in Turkey.
        </p>
    
      </div>
      </Paper>

    </div>
  );
}