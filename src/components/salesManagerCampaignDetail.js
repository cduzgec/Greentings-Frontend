import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Grid, Card,CardActionArea,CardMedia,CardContent,Divider, Button} from "@material-ui/core";
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ManagerPage from "./SalesManager";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { getByDisplayValue } from "@testing-library/react";



const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    textfield_: {
        '& .MuiTextField-root': {
          margin: theme.spacing(5),
          width: '30ch',
          
        }},
    
    gridContainer: {
        padding: "50px",
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
          }
      },
      card: {
        display: "flex",
        marginLeft: "500px",
        marginRight: "500px"
      },
      cardDetails: {
        flex: 0,
      },
      media: {
        height: "100%",
        width: "111px",
      },
      
}));

function CampaignInfoMANAGER({items_, }) {
    const classes = useStyles();
 


      return (
        <div>
        <ManagerPage/>

              <Typography variant="h5" gutterBottom>
                Products for campaing
              </Typography>
       
  
            {items_.map ( (product, index) => (
              <div key={index}>
            <Grid item>
           
            <CardActionArea key={index}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardMedia image={product.img} className={classes.media} />
              </div>
              <CardContent style={{ marginLeft: "0" }}>
                <Typography variant="h6">{ product.product_name + " price :" + product.price + "$ "+ " brand: " + product.brand_name} </Typography>
                <Typography variant="h6">{"old price :" + product.base_price + "$ " }</Typography>
      
                <Typography variant="h7">{"product id: " +product.product_id}</Typography>
              </CardContent>
              <Grid item>
              
            </Grid>
            
            <Divider></Divider>
            </Card>
            
          </CardActionArea>
              
            </Grid>

             </div>
             
            ))}


        </div>
        
      );

};

export default CampaignInfoMANAGER;
