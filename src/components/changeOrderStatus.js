import React from "react";
import  {useRef,useState, useEffect} from 'react';
import { Grid, Typography,Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import {green} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const styles = {
  spaperContainer: { 
   
    //margin: "10px 200px",
    marginTop: "10px",
    marginRight: "60px",
    marginLeft: "50px"
    

  },

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
  p:{
    fontSize: "14px",
    color: "black",
},
button: {
  margin: theme.spacing(1),
  backgroundColor:green[500],
  fontSize: 16,
  '&:hover': {
    backgroundColor: green[800],
  },
},

root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

function SalesManager() {

const Productref = useRef("") 
const Orderref = useRef("") 
const addressref = useRef("") 
const Orderref2 = useRef("") 
const [productID, setProductID] = useState("");
const [orderID, setOrder] = useState("");
const [orderID2, setOrder2] = useState("");
const [status, setStatus] = useState(0);
const [address, setAddress] = useState(0);

const handleChange = (event) => {
    setStatus(event.target.value);
  };
  async function UpdateOrderStatus(){
    try {
  
      const res = await fetch(`/status/`, {
        method: "post",
        mode: "cors",
        headers:
        {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "Connection": "keep-alive",
          "Content-Encoding": "gzip, deflate, br",
          "Accept-Encoding": "gzip, deflate, br"
        },
        body: JSON.stringify({
            "order":orderID,
            "product":productID,
            "status": status,
          
          })
      });
      console.log("response:",res)
      alert("Updated Status");
      window.location.reload();
    }
    catch (e)
    {
      console.log(e)
    }
  
  }
    
const classes = useStyles();
  return (
    <form className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={6}>
        <div>
            <h1>Change Order Status</h1>

        <div>
        <TextField
        required
         variant="outlined"
          label="Product ID"
          margin="normal"

          margin="normal"
          
          inputRef={Productref} 
          onChange={e => setProductID(e.target.value)}
          helperText="Please enter the id of product to be deleted"
          className={classes.textField}
        />
        <TextField
        required
         variant="outlined"
          label="Order ID"
          margin="normal"
          id="margin-none"
          inputRef={Orderref} 
          onChange={e => setOrder(e.target.value)}
          className={classes.textField}
        />
       <TextField
          required
          variant="outlined"
          select
          label="Status"
          value={status}
          margin="normal"
          id="margin-none"
          onChange={handleChange}
         
          className={classes.textField}
        >
         <MenuItem value={0}>Getting Prepared</MenuItem>
          <MenuItem value={1}>On Delivery</MenuItem>
          <MenuItem value={2}>Delivered</MenuItem>
          <MenuItem value={3}>Cancelled</MenuItem>
        </TextField>
        </div>
        </div>
        <div>
        <Button   onClick={() => {UpdateOrderStatus() }}variant="contained">
            Update Order Status
        </Button>
        </div>
        </Grid>
        <Grid item xs={6}>
          <h1>CHANGE ADRESS INFO FOR ORDER</h1>
          <div>
          <TextField
        required
         variant="outlined"
          label="Order ID"
          margin="normal"

          
          inputRef={Orderref2} 
          onChange={e => setOrder2(e.target.value)}
          helperText="Please enter the id of order to be deleted"
          className={classes.textField}
        />
        <TextField
        required
         variant="outlined"
          label="New adress id"
          margin="normal"

          margin="normal"
          
          inputRef={addressref} 
          onChange={e => setAddress(e.target.value)}
          helperText="Please enter the id of product to be deleted"
          className={classes.textField}
        />
        </div>
        <div>
        <Button   variant="contained">
            Change Adress
        </Button>
        </div>
        </Grid>
        </Grid>
    </form>
  );
}

export default withRouter(SalesManager);