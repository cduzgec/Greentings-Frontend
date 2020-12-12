import React, {useState,useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import OurButton from "./button.js";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginLeft: "500px",
    marginRight: "500px",
  },}));

  // flow: get card input - CheckCard - DoPayment - PostAdress - SendOrder - forward invoice page    // need to implement DoPayment
export default function PaymentForm() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [expiry_date, setExDate] = useState("")
  const [card, setcard] = useState("")
  const [cvv, setCVV] = useState("") 

  const [address_id, setAddressID] = useState("")
  useEffect(() => {if (address_id) {console.log("Address ID: "+ address_id); SendOrder();}}, [address_id]); // input: PostAdress output: SendOrder

  const [order_id, setOrderID] = useState("")
  const [order_date, setOrdDate] = useState("")
  useEffect(() => {if (order_id) {console.log("Order ID: "+ order_id); window.location.replace(`/invoice/${order_id}`);}}, [order_id]); // input: PostAdress output: SendOrder


  function CheckCard()
  { 
    var re = /^[0-9]*/;
    if (card.length !== 16 || !re.test(card)){
      alert("Please check card number. It should be 16 digits number.");
    }
    if(cvv.length !== 3 || !re.test(cvv)){
      alert("Please check CVV number. It should be 3 digits number.");
    }
    else
    { PostAdress () }   // DoPayment (); 
  }

  async function PostAdress () {
    try {
      const response = await fetch ('/address/', {       
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
          "first_name" : localStorage.getItem("firstName"),
          "last_name" : localStorage.getItem("lastName"),
          "city" : localStorage.getItem("city"),
          "postal_code" : localStorage.getItem("postalCode"),
          "country" : localStorage.getItem("country"),
          "address_line" : localStorage.getItem("addressLine"),
          "phone_number" : "0251",                                                //localStorage.getItem("phone_number"),
          "user" : localStorage.getItem("user_id"),
          "state" : "EYALET",
        })
      });
      console.log("Response Status: "+response.status)
       
      if (response.status === 201){                                       // returns Response: 201  {address_id}
        response.json().then(data => {setAddressID(data.address_id)})
      }
      else {
        response.json().then(data => {console.log(data)})
        
      }
    }
  catch (e)
    {
      console.log(e)
    }
  }


async function SendOrder () {
  try {
    const response = await fetch ('/ord/', {       
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
        "user": localStorage.getItem("user_id"),
        "total_price": "50",                                            //localStorage.getItem("total_price"),
        "address": address_id,                                   
      })
    });
    console.log("Response Status: "+response.status)                  // returns  Response: 201 {order_id user date address total_price}
    
    if (response.status === 201){ response.json().then(data => {setOrderID(data.order_id); setOrdDate(data.date) })}
    else { response.json().then(data => {console.log(data)}) }
    }
  catch (e)
    {
      console.log(e)
    }
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            onChange={(event) => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={(event) => {setcard(event.target.value); console.log(card)}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            onChange={(event) => setExDate(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={(event) => setCVV(event.target.value)}
          />
        </Grid>

        <OurButton
            onClick = {CheckCard}         
            className={classes.submit}  
            fullWidth  variant="contained" >
            Pay
          </OurButton>
      </Grid>
    </React.Fragment>
  );
}