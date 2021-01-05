import React, {useState,useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginLeft: "500px",
    marginRight: "500px",
    marginTop: "70px"
  },


}));

  const styles = {
    paperContainer: {
        opacity: "0.8",
        backgroundColor: "#ffffff",
        marginRight: "300px",
        marginLeft: "300px",
        paddingTop: "50px",
        height: "300px"

    }
  };
  // flow: get card input - CheckCard - DoPayment - PostAdress - SendOrder - SendPDF - forward invoice page    // need to implement DoPayment
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
  useEffect(() => {if (order_id) {console.log("Sending invoice for order id: "+ order_id); SendPDF();}}, [order_id]); // input: SendOrder output: SendPDF

  const [message, setMessage] = useState("")
  useEffect(() => {if (order_id) {console.log("Order ID: "+ order_id); window.location.replace(`/invoice/${order_id}`);}}, [message]); // input: SendPDF output: Forward page


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
          "phone_number" : localStorage.getItem("phone_number"),                                                
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
        "total_price": localStorage.getItem("total_price"),                                           
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

  const SendPDF = async () => {      
    const data = await fetch(`/pdfsend/${order_id}`);                         //    /category/${category.categories_id}

    const mes= await data.json();
    setMessage(mes);};         // brand_name: description: img: price: product_id: product_name: rating: stock:


  return (
    <React.Fragment>
      <Paper style={styles.paperContainer} elevation={10}>
      <Container className={classes.cardGrid} maxWidth="md">
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
            onChange={(event) => {setcard(event.target.value);}}
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
          <Button variant="contained" color="primary" onClick = {CheckCard} >Pay</Button>
      </Grid>
      </Container>
        </Paper>
    </React.Fragment>
  );
}