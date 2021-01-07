import React from "react";
import {useState,useEffect } from "react";
import {Typography,Grid,Card,CardActionArea, CardMedia,CardContent,Divider,TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

function Invoice ({match}) {
  const classes = useStyles();
  const[products,setProducts] = useState([]);
  const[userID,setUserID] = useState();
  const[user,setUser] = useState([]);
  const[orderDate,setOrderDate] = useState();
  const[orderDetail,setOrderDetail] = useState([]);
  const[address,setAddress] = useState([]);

  useEffect(() => {fetchProducts(); fetchUserID(); }, [])
  useEffect(() => {if (userID) {fetchUserInfo(); console.log(userID); }}, [userID]);
  useEffect(() => {if (orderDetail) {fetchAdress(); console.log(orderDetail); }}, [orderDetail]);

  const fetchProducts = async () => {            

      const data = await fetch(`/orditem/${match.params.order_id}`);  
      const products= await data.json();
      setProducts(products);  
      //console.log({products})
  } 
  const fetchUserID = async () => {            
    const data = await fetch(`/order/${match.params.order_id}`);  
    const orderDetail= await data.json();
    setUserID(orderDetail.user)
    setOrderDetail(orderDetail)
    console.log({orderDetail})
  } 
  const fetchUserInfo = async () => {            
    const data = await fetch(`/user/${userID}`);  
    const userinfo= await data.json();
    setUser(userinfo)
    console.log({userinfo})
  }
  const fetchAdress = async () => {            
    const data = await fetch(`/address/${orderDetail.address}`);  
    const addressinfo= await data.json();
    setAddress(addressinfo)
    console.log({addressinfo})
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
    if(getTotal()>100 || getTotal()===0)
    {
      return 0;
    }
    else{return 13;}
      
  }
  const calculateTax = () =>
  {
    let tax=0;
    tax= 0.18* getTotal();
    return Number( tax.toFixed(2));
  }
  const getTotalforOrder= () => {
    return Number((getTotal()+calculateShippingCost()+calculateTax()).toFixed(2));
  };

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
            Invoice for Order {match.params.order_id}
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
              Order  Summary
          </Typography>

          <Divider />
            <table width="100%">
                <tr>
                    <td align="left" className={classes.itemTotal}>FIRST NAME</td>
                    <td align="right" className={classes.itemTotal}>{user.first_name}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>LAST NAME</td>
                    <td align="right" className={classes.itemTotal}>{user.last_name}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>PHONE NUMBER</td>
                    <td align="right" className={classes.itemTotal}>{address.phone_number}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>ORDER DATE</td>
                    <td align="right" className={classes.itemTotal}>{orderDetail.date}</td>
                </tr>
            </table>
          <Divider />
       
          <Divider />

          <Typography variant="h4" gutterBottom>
              Price Information
          </Typography>

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

          <Divider />

          <Typography variant="h4" gutterBottom>
              Address Information
          </Typography>

            <table width="100%">
                <tr>
                    <td align="left" className={classes.itemTotal}>ADDRESS LINE</td>
                    <td align="right" className={classes.itemTotal}>{address.address_line}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>CITY</td>
                    <td align="right" className={classes.itemTotal}>{address.city}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>COUNTRY</td>
                    <td align="right" className={classes.itemTotal}>{address.country}</td>
                </tr>
                <tr>
                    <td align="left" className={classes.itemTotal}>POSTAL CODE</td>
                    <td align="right" className={classes.itemTotal}>{address.postal_code}</td>
                </tr>
            </table>
          <Divider />
          
      </Grid>
    </Grid>
  );
};

export default Invoice;
