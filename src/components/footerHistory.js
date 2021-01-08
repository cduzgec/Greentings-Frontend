
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
        We’re on a mission to make building UIs with React fun.
        </p>
        <h3 className={classes.h1}>Our Mission</h3>
        <p className={classes.p}>
        Our company is focused on making React UIs development easier, better, and accessible to more people. We build open source and commercial tools used by many hundreds of thousands of developers in production. We're proud not only of the products we make, but also the community and partnerships we've cultivated with other developers and companies.
        </p>
        <h3 className={classes.h1}>Our Vision</h3>
        <p className={classes.p}>
        Our vision is to provide React components for faster and easier web development. Read more.
        </p>
        <h3 className={classes.h1}>Our Values</h3>
        <p className={classes.p}>
        Our core values include transparency (our work is public most of the time); creating a safe, high-trust team; building incredible developer experiences; maintaining a healthy working environment; and helping to deliver web experiences that feel amazing to use on every device and connection type.
        </p>
        <h3 className={classes.h1}>Our Story</h3>
        <p className={classes.p}>        
        Material-UI started back in 2014 to unify React and Material Design.
        Today, Material-UI has grown to become one of the world's most popular React UI libraries – backed by a vibrant community of more than 1M developers in over 180 countries.
        </p>
    
      </div>
      </Paper>

    </div>
  );
}