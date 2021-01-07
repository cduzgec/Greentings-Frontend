
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';
import Image from './images/earth2.jpg';
import Team from './team';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      opacity: "1" 
  }
};
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
      <Paper style={styles.paperContainer} elevation={10}>
      <div className={classes.box}>
        <h2 className={classes.h1}>GREETINGS FROM THE FUTURE !</h2>
        <text style={{ textTransform: 'lowercase'}} className={classes.p}>
         Greentings has great pleasure in bringing you a selection of environmentally friendly,  sustainable, fair trade and organic products.
         We carefully research our products knowing that making ethical choices is important to you and we think we are the ideal place to shop. 
        </text>

      </div>
      </Paper>
    </div>
  );
}