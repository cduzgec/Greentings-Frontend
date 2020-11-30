import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
  gridContainer: {
    padding: "50px",
    [theme.breakpoints.down('sm')]: {
        padding: "5px",
      }
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down('sm')]: {
        minWidth: 0,
      }
  },
  itemTotal:{
      padding: "10px 0"
  }
}));
const ShoppingCartTab = () => {
  const classes = useStyles();

  const getShoppingCard = (product, price, imageUrl, description) => {
    return (
      <CardActionArea>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardMedia image={imageUrl} className={classes.media} />
          </div>

          <CardContent style={{ marginLeft: "0" }}>
            <Typography variant="h6">{product}</Typography>
            <Typography variant="body2">{description}</Typography>
            <Typography variant="subtitle2">{price}</Typography>
          </CardContent>
        <Grid item container direction="row-reverse" alignItems="center">
          <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id="demo-simple-select-outlined-label">pcs</InputLabel>
            <Select
              labelId="pieces"
              id="demo-simple-select-outlined"
              value={1}
              label="pcs"
            >
              
              <MenuItem value={1}>1 pcs.</MenuItem>
              <MenuItem value={2}>2 pcs.</MenuItem>
              <MenuItem value={3}>3 pcs.</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Card>
      </CardActionArea>
    );
  };

  return (
    <Grid container className={classes.gridContainer} spacing={2}>
      <Grid item xs={12} sm={8} container direction="column">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
        </Grid>
        <Divider />
        <Grid item>
          {getShoppingCard(
            "PRODUCT NAME",
            "$300",
            "https://pbs.twimg.com/profile_images/1062308294671376384/4GqTgUgc_400x400.jpg",
            "Lorem ipsum dolor sit amet, consectetur."
          )}
        </Grid>
        <Grid item>
          {getShoppingCard(
            "PRODUCT NAME",
            "$300",
            "https://pbs.twimg.com/profile_images/1062308294671376384/4GqTgUgc_400x400.jpg",
            "Lorem ipsum dolor sit amet, consectetur."
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
              Summary
          </Typography>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
              ENTER COUPON CODE
          </Typography>
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

export default ShoppingCartTab;
