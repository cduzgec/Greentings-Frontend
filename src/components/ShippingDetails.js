import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useEffect } from "react";
import {
    Typography,
    Grid,
    Divider,
    TextField
  } from "@material-ui/core";
import { SettingsOverscanOutlined } from "@material-ui/icons";

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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [phone_number, setTelephone] = useState(0)

  const handleChange = (event) => {
    setShipping(event.target.value);
  };
  const[products,setProducts] = useState([]);
  
  
  useEffect(() => {fetchProducts();}, [])
 
  const fetchProducts = async () => {            

      const data = await fetch(`/basket/${localStorage.getItem("user_id")}/`);

      const products= await data.json();
     
      setProducts(products);

     
  }

  const getTotal = () =>
  {
    var total = 0;
    for (var key in products) {
      total = total + products[key].price *  products[key].quantity ;
    }
    return Number(total.toFixed(2));
  }
  const calculateShippingCost= () =>
  {
    if(getTotal()>100)
    {
      return 0;
    }
    else{return 13;}
      
  }
  const calculateTax = () =>
  {
    let tax=0;
    tax= 0.18* getTotal();
    return Number(tax.toFixed(2));
  }
  const getTotalforOrder= () => {
    
    
    return Number((getTotal()+calculateShippingCost()+calculateTax()).toFixed(2));
  };

  const getFirstName = value => {
    localStorage.setItem('firstName',value);
    
    setFirstName(value);
  };
  const getLastName = value => {
    localStorage.setItem('lastName',value);
    
    setLastName(value);
  };
  const getTelephone = value => {
    localStorage.setItem('phone_number',value);
    
    setTelephone(value);
  };
  const getAddressLine = value => {
    localStorage.setItem('addressLine',value);
    
    setAddressLine(value);
  };
  const getCity = value => {
    localStorage.setItem('city',value);
    
    setCity(value);
  };
  const getPostalCode = value => {
    localStorage.setItem('postalCode',value);
    
    setPostalCode(value);
  };
  const getCountry = value => {
    localStorage.setItem('country',value);
    
    setCountry(value);
  };



  // const getSummaryCard = (product, price, imageUrl) => {
  //   return (
  //     <CardActionArea>
  //       <Card className={classes.card}>
  //         <div className={classes.cardDetails}>
  //           <CardMedia image={imageUrl} className={classes.media} />
  //         </div>

  //         <CardContent style={{ marginLeft: "0" }}>
  //           <Typography variant="h6">{product}</Typography>
            
  //           <Typography variant="subtitle2">{price}</Typography>
  //         </CardContent>
  //       </Card>
  //     </CardActionArea>
  //   );
  // };

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
            defaultValue={localStorage.getItem('firstName') === null ? ("") : localStorage.getItem('firstName')}
            onChange={(event) => getFirstName(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Last name"
            defaultValue={localStorage.getItem('lastName') === null ? ("") : localStorage.getItem('lastName')}
            onChange={(event) => getLastName(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} >
            <TextField required
            label="Address line "
            defaultValue={localStorage.getItem('addressLine') === null ? ("") : localStorage.getItem('addressLine')}
            onChange={(event) => getAddressLine(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="City"
            defaultValue={localStorage.getItem('city') === null ? ("") : localStorage.getItem('city')}
            onChange={(event) => getCity(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Postal code"
            defaultValue={localStorage.getItem('postalCode') === null ? ("") : localStorage.getItem('postalCode')}
            onChange={(event) => getPostalCode(event.target.value)}
            fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Country"
            defaultValue={localStorage.getItem('country') === null ? ("") : localStorage.getItem('country')}
            onChange={(event) => getCountry(event.target.value)}
            fullWidth/>
            
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField required
            label="Telephone Number"
            defaultValue={localStorage.getItem('phone_number') === null ? ("") : localStorage.getItem('phone_number')}
            onChange={(event) => getTelephone(event.target.value)}
            fullWidth/>
        </Grid>
        

      </Grid>
        
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
              Summary
          </Typography>
       
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>SUBTOTAL</td>
          <td align="right" className={classes.itemTotal}>{getTotal()+"$"}</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>SHIPPING</td>
                  <td align="right" className={classes.itemTotal}>{calculateShippingCost()+"$"}</td>
              </tr>
              <tr>
                  <td align="left" className={classes.itemTotal}>TAXES</td>
                  <td align="right" className={classes.itemTotal}>{calculateTax()+"$"}</td>
              </tr>
              

          </table>
          <Divider />
          <table width="100%">
              <tr>
                  <td align="left" className={classes.itemTotal}>
                      <Typography variant="h5" component="p"> TOTAL</Typography>
                      </td>
                  <td align="right" className={classes.itemTotal}><Typography variant="h5" component="span"> {getTotalforOrder()+"$"}</Typography></td>
              </tr>
              
          </table>
      </Grid>
     
    </Grid>
  );
};

export default ShippingDetailsTap;
