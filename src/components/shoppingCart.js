import React from "react";

import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useState,useEffect } from "react";
import Button from "@material-ui/core/Button";



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
  const[products,setProducts] = useState([]);
  const classes = useStyles();
  
  
  useEffect(() => {fetchProducts();}, [])
 
  const fetchProducts = async () => {            

      const data = await fetch("/basket/1/");

      const products= await data.json();
     
      setProducts(products);
     
     
  }

  const getTotal = () =>
  {
    var total = 0;
    for (var key in products) {
      total = total + products[key].price *  products[key].quantity ;
    }
    return total;
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
    return tax;
  }
  const getTotalforOrder= () => {
    localStorage.setItem('total_price', (getTotal()+calculateShippingCost()+calculateTax()));
    
    return getTotal()+calculateShippingCost()+calculateTax();
  };
  async function sendProducttoCart (id,quantityy) {
    try {
      const res = await fetch ('/basket/1/', {
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
          "product": id,
          "quantity": quantityy,
        
        })
      });
      return await res.status; 
    }
    catch (e)
    {
      console.log(e)
    }

  }
  async function deleteProduct (id, index) {
    try {
      const res = await fetch ('/basket/1/', {
        method: "delete",
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
          "product": id,
          
        
        })
      });
      if(await res.status === 200 ||(await res.status === 204)){
        var tempProducts = [...products];
        tempProducts.splice(index,1);
        setProducts(tempProducts);
        console.log(products);
      } 
    }
    catch (e)
    {
      console.log(e)
    }

  }

  // async fonksııyondan cıkarınca setProduct re render edebılır
  const updateQuantity = async (key,value, e) =>
  {
    let resCode = await sendProducttoCart (products[key].product_id,parseInt(value))
    if(resCode===200){
      var tempProducts = [...products];
      tempProducts[key].quantity = parseInt(value) ;
      setProducts(tempProducts);
      console.log(products);
 
      
    } else if(resCode === 406){
      e.value = products[key].quantity;
      alert("stock is not enough");
    }
    
  }


  const getShoppingCard = (index, product, price, imageUrl, quantity,id) => {
    return (
      <CardActionArea key={index}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardMedia image={imageUrl} className={classes.media} />
          </div>

          <CardContent style={{ marginLeft: "0" }}>
            <Typography variant="h6">{product}</Typography>
            <Typography variant="h5">{price}</Typography>
          </CardContent>
        <Grid item container direction="row-reverse" alignItems="center">
        <Button onClick={() => {deleteProduct(id,index) }} variant="contained" color="primary">
          Delete
        </Button>
        <TextField
          id="standard-number"
          label="Quantity"
          type="number"
          defaultValue={quantity}
          onChange={(event) =>
            event.target.value < 1
                ? (event.target.value = 1)
                : updateQuantity(index,event.target.value, event.target)}
          InputLabelProps={{    
            shrink: true,
          }}
        />
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
        {products.map ( (product, index) => (
          <div>
        <Grid item>

          {getShoppingCard(
            index,
            product.product_name,
            product.price + "$",
            product.img,
            product.quantity,
            product.product_id
            
          )}
          
        </Grid>
         <Divider />
         </div>
        ))}
        
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

export default ShoppingCartTab;
