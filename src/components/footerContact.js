
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';
import Image from './images/earth2.jpg';


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

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3016.0637026719273!2d29.3746576!3d40.8924175!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad980437cfef7%3A0x60c6be7f4c4238d1!2sSabanc%C4%B1%20%C3%9Cniversitesi!5e0!3m2!1sen!2str!4v1609955331590!5m2!1sen!2str" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
  );
}