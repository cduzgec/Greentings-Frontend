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
      margin: "10px 200px",
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
        <p className={classes.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a blandit mi. Sed turpis dolor, congue nec consequat et, volutpat quis justo. Nullam imperdiet dictum lectus, et eleifend quam semper nec. Nunc suscipit, purus sit amet volutpat viverra, nisl leo dictum lectus, sed sagittis mauris eros eget lorem. Cras eleifend posuere risus, eget ultricies nulla maximus nec. Aliquam venenatis condimentum lorem at egestas. Duis libero enim, tincidunt vitae ligula sit amet, aliquam bibendum erat. Aenean malesuada turpis risus, vel euismod sem convallis sed. Pellentesque ullamcorper commodo gravida. Sed molestie condimentum metus, et cursus arcu sodales at. Donec in neque in tortor dignissim semper. Suspendisse potenti. Fusce fermentum est id dui efficitur posuere. Vivamus vehicula finibus dui, vitae dapibus orci cursus mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
  Suspendisse dignissim dolor quis tristique vestibulum. </p>
      </div>
      </Paper>
    </div>
  );
}