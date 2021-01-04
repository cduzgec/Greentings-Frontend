import React from "react";
import { useState, useEffect } from 'react';
import { Typography,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles';
import Image from './images/winter.jpg';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

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
        margin: "20px 200px",
        width: "100%",
        height: "fit-content",
        
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
      backgroundColor: fade(theme.palette.common.white, 0.30),
      padding: "20px",
    }
  
    
  }));

function Campaign() {
    const classes = useStyles();
    const [campaigns, setCampaigns] = useState([]);




    useEffect(() => { fetchCampaigns();}, []);

    const fetchCampaigns = async () => {
        const data = await fetch(`/campaigns/`);               
        const campaigns = await data.json();
        setCampaigns(campaigns);                                            
        debugger;
    }

    

    return (
        <div className={classes.root}>
        <Paper style={styles.paperContainer} elevation={10}> 
        <Slider autoplay={3000}>
        
        {campaigns.map((item, index) => (
            <div className={classes.box}
                key={index}
                
            >
                <div className="center">
                <h1>The Winter Sale has begun, with deep discounts on thousands of Products!</h1>
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                    <Button onClick={() => {window.location.replace(`/campaignProducts/${item.campaign_id}`);}}>
                    <AcUnitIcon fontSize="large"></AcUnitIcon>
                        <p>check it out</p>
                    <AcUnitIcon fontSize="large"></AcUnitIcon>
                        </Button>
                </div>
            </div>
        ))}
      
        </Slider>
        </Paper>
        </div>

    );
};

export default Campaign;