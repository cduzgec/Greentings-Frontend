import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardHeader,
    Radio,
    CardContent,
    Divider,
    TextField
  } from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer: {
    padding: "50px",
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 0,
    
  },
  media: {
    height: "100%",
    width: "111px",
  },
  itemTotal:{
    padding: "10px 0"
},
shippingContainer:{
    marginTop: "15px",
    borderTop: "1px solid grey",
    borderBottom: "1px solid grey"
}
});

const ShippingDetailsTap = () => {
  const classes = useStyles();

  const [shipping, setShipping] = useState("standard")
  const handleChange = (event) => {
    setShipping(event.target.value);
  };

  const getSummaryCard = (product, price, imageUrl) => {
    return (
      <CardActionArea>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardMedia image={imageUrl} className={classes.media} />
          </div>

          <CardContent style={{ marginLeft: "0" }}>
            <Typography variant="h6">{product}</Typography>
            
            <Typography variant="subtitle2">{price}</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    );
  };

  return (
    <Grid container className={classes.gridContainer} spacing={4} alignItems="flex-start">
      <Grid item xs={12} sm={6} md={8} container  spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
                Shipping Details
            </Typography>
            <Divider />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="First name"
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Last name"
            fullWidth/>
        </Grid>
        <Grid item xs={12} >
            <TextField required
            label="Address line 1"
            fullWidth/>
        </Grid>
        <Grid item xs={12} >
            <TextField required
            label="Address line 2"
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="City"
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="State"
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Postal code"
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Country"
            fullWidth/>
            
        </Grid>
        
        <Grid item xs={12} className={classes.shippingContainer} container spacing={1} justify="center">
            
        <Grid item xs={12} sm={12} md={6}>
        
        <Card>
            <CardHeader
              avatar={
                <Radio
                  checked={shipping === "standard"}
                  onChange={handleChange}
                  value="standard"
                  name="shippingType"
                  inputProps={{ "aria-label": "Free Shipping" }}
                />
              }
              title="Free Shipping"
              subheader="Between 2-5 working days"
            />
            
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Card>
            <CardHeader
              avatar={
                <Radio
                  checked={shipping === "express"}
                  onChange={handleChange}
                  value="express"
                  name="shippingType"
                  inputProps={{ "aria-label": "Next Day Delivery" }}
                />
              }
              title="Next Day Delivery - $20"
              subheader="24 hours from checkout"
            />
            
          </Card>
        </Grid>
        </Grid>
      </Grid>
        
      <Grid item xs={12} sm={6} md={4} container spacing={1}>
        
        <Typography variant="h4" gutterBottom>
              Summary
          </Typography>
          <Divider />
          <Grid item xs={12}>
          {getSummaryCard(
            "PRODUCT NAME",
            "$300",
            "https://pbs.twimg.com/profile_images/1062308294671376384/4GqTgUgc_400x400.jpg"
          )} 
          </Grid>
          <Grid item xs={12}>
          {getSummaryCard(
            "PRODUCT NAME",
            "$300",
            "https://pbs.twimg.com/profile_images/1062308294671376384/4GqTgUgc_400x400.jpg"
          )} 
          </Grid>
          
          
          
          
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>SUBTOTAL</td>
                  <td align="right" className={classes.itemTotal}>$600</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>SHIPPING</td>
                  <td align="right" className={classes.itemTotal}>FREE</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>TAXES</td>
                  <td align="right" className={classes.itemTotal}>$13</td>
              </tr>
          </table>
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>
                      <Typography variant="h5" component="p"> TOTAL</Typography>
                      </td>
                  <td align="right" className={classes.itemTotal}><Typography variant="h5" component="span"> $613</Typography></td>
              </tr>
              
          </table>
        </Grid>
     
    </Grid>
  );
};

export default ShippingDetailsTap;
