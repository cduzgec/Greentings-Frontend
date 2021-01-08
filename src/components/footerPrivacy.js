
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';
import Image from './images/earth2.jpg';
import Team from './team';
import Typography from '@material-ui/core/Typography';


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
        <h2 className={classes.h1}>Privacy Policy</h2>
        <text className={classes.p}>
          Agreement to Privacy Policy
        </text>

        <Typography paragraph>
          This privacy policy ("policy") will help you understand how we uses and
          protects the data you provide to us when you visit and use website.
          We reserve the right to change this policy at any given time, of which you will be promptly
          updated. If you want to make sure that you are up to date with the latest changes, we advise
          you to frequently visit this page.
          What User Data We Collect
          When you visit the website, we may collect the following data:
          • Your IP address.
          • Your contact information and email address.
          • Other information such as interests and preferences.
          • Data profile regarding your online behavior on our website.
          Why We Collect Your Data
          We are collecting your data for several reasons:
          • To better understand your needs.
          • To improve our services and products.
          • To send you promotional emails containing the information we think you will find
          interesting.
          • To contact you to fill out surveys and participate in other types of market research.
          • To customize our website according to your online behavior and personal preferences.
          Safeguarding and Securing the Data
          [name] is committed to securing your data and keeping it confidential. [name] has done all in its
          power to prevent data theft, unauthorized access, and disclosure by implementing the latest
          technologies and software, which help us safeguard all the information we collect online.
          Our Cookie Policy
          Once you agree to allow our website to use cookies, you also agree to use the data it collects
          regarding your online behavior (analyze web traffic, web pages you spend the most time on,
          and websites you visit).
          The data we collect by using cookies is used to customize our website to your needs. After we
          use the data for statistical analysis, the data is completely removed from our systems.
          Please note that cookies don't allow us to gain control of your computer in any way. They are
          strictly used to monitor which pages you find useful and which you do not so that we can
          provide a better experience for you
        </Typography>


      </div>
      </Paper>

    </div>
  );
}