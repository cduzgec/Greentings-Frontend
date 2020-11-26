import React from "react";
import { useEffect, useState } from 'react';
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const styles = {
  paperContainer: {

    opacity: "0.8",
    margin: "10px 200px",
    marginTop: "150px"

  },

  sPaperContainer: {
    //margin: "10px 20px",
    marginTop: "500px",


  }
};
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "50px",
  },
  itemContainer: {
    padding: "20px",
    color: "0000",
    fontSize: "20px"

  },
  formControl: {
    marginTop: "-12px",
    minWidth: 120,
  },
  p: {
    fontSize: "14px",
    color: "black",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
    fontSize: 16,
    '&:hover': {
      backgroundColor: green[800],
    },
  },
}));
function ProductDetail({ match }) {
  useEffect(() => { fetchItem(); console.log(match) }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch(`/product/${match.params.product_id}`)
    const item = await fetchItem.json();
    setItem(item)
    console.log(item);
  }
  const classes = useStyles();
  return (
    <Paper style={styles.paperContainer} elevation={10}>
      <Grid container>

        <Grid item xs={12} sm={6}>
          <Paper style={styles.spaperContainer} elevation={10}>
            <Zoom>
              <img
                alt= "images of products"
                src={item.img}
                width="100%"
                height="500px"
                flex="1"
                resizeMode="contain"
              />
            </Zoom>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          container
          direction="column"
          className={classes.gridContainer}
        >
          <Grid item className={classes.itemContainer}>
            <Typography variant="h5" >
              {item.product_name}
            </Typography>
            <Grid>
              Brand: {item.brand_name}
            </Grid>
            <Rating name="read-only" defaultValue={2} value={parseInt(item.rating)} readOnly='true' />
          </Grid>
          <Divider />
          <Grid item>
            <p className={classes.p}>
              {item.description}
            </p>
          </Grid>
          <Divider />
          <Grid item className={classes.itemContainer} container spacing={2}>
            <Grid item>
              <Typography variant="h4" style={{ display: "inline" }}>
                {item.price}$
            </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Select Size
              </InputLabel>

                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  placeholder="Select" //buraya sonra renk size secenegi gelcek
                >
                  <MenuItem >size 1</MenuItem>
                  <MenuItem >size 2</MenuItem>
                  <MenuItem >size 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Select Color
              </InputLabel>

                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  placeholder="Select" //buraya sonra renk size secenegi gelcek
                >
                  <MenuItem >{item.brand_name}</MenuItem>
                  <MenuItem >item.color</MenuItem>
                  <MenuItem >item.color</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
          <Grid item className={classes.itemContainer}>
            <Button variant="contained" color="primary" className={classes.button} endIcon={<ShoppingCartOutlinedIcon fontSize="medium" />}>
              Add To Cart
        </Button>
            <Button variant="contained" color="primary" className={classes.button} endIcon={<FavoriteBorderSharpIcon fontSize="medium" />}>
              Add To Favorites
        </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetail;