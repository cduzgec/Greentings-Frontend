import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';
import Image from './images/earth2.jpg';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      opacity: "0.8" 
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    
      fontFamily: "Arial, Helvetica, sans-serif",
      margin: "100px 200px",
      width: "100%",
      height: "fit-content",
      padding: "40px",
    },
  },
  p:{
      fontSize: "18px",
      color: "black"
  },
  h1:{
    color: "black",
  },
  box:{
    backgroundColor: fade(theme.palette.common.white, 0.70),
    padding: "20px",
  }

  
}));

export default function Text() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper style={styles.paperContainer} elevation={10}>
      <div className={classes.box}>
        <h2 className={classes.h1}>Why Shop Green?</h2>
        <p className={classes.p}>
        There are many reasons to shop sustainably, including benefits to you, the environment, and other people.
        </p>
        <h3 className={classes.h1}>Protect the environment</h3>
        <p className={classes.p}>
        Sustainably produced food and products have less negative impact on the environment. This includes fewer chemical pesticides, a greater diversity of plants, less consumption of fossil fuels and sustainably sourced raw material.
        </p>
        <h3 className={classes.h1}>Promote health</h3>
        <p className={classes.p}>
        Sustainable farming focuses on producing healthy food. This means fewer pesticides, 
        chemicals, additives and preservatives, which are toxic to our waterways and our health.
         Sustainable food will also be of higher quality because of the way the animals are treated, 
         such as the space they have and the quality of food they are fed. Sustainable gifts and sustainable fashion minimise pollution and the use of raw materials, energy and water.
        </p>
        <h3 className={classes.h1}>Promote animal welfare</h3>
        <p className={classes.p}>
        You may have assumed that most major  companies were on board with alternatives
         to cruelty to animals, but there are some that still pay to poison and kill. It isn’t always easy to know which brands don’t test on animals.
        </p>
      </div>
      </Paper>
    </div>
  );
}