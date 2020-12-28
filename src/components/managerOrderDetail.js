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

function OrderInfoMANAGER({match}) {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    // const [status, setStatus] = useState([]);

    useEffect(() => { fetchOrder();}, []);

    const handleChange = (index, event) => {
        let orderTemp = [...orders];
        orderTemp[index].status = getString(event.target.value); 
        setOrders(orderTemp);
      };

    const fetchOrder = async () => {
        const data = await fetch(`/orditem/${match.params.order_id}`);                                       
        const orders = await data.json();

        setOrders(orders);
        // let statusTemp = [];
        // for (let order in orders) {
        //     statusTemp.push(order.status);
        // }      
        // setStatus(statusTemp);                             
        console.log({orders});
    }

    const getValue = (status) => {

        if( status==="Getting Prepared") 
        { return 0;}
        if(status==="On Delivery")
        { return 1;}    
        if(status==="Delivered")
        {return 2;}
        if(status==="Cancelled")
        {return 3;}
    }
    const getString = (status) => {
        
        if( status===0)
           { return "Getting Prepared";}
        if(status===1)
            {return "On Delivery";}
        if(status===2)
           {return "Delivered";}
        if(status===3)
            {return "Cancelled";}
    }
    async function UpdateOrderStatus(){
        
        for (let item in orders)
        {

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
                    "order":match.params.order_id,
                    "product":orders[item].product_id,
                    "status": getValue(orders[item].status),
                
                })
            });
            console.log("response:",res)

            }
            catch (e)
            {
            console.log(e)
            }
        
        }
        window.location.reload();
    }

      return (
        <div>
        <ManagerPage/>

              <Typography variant="h4" gutterBottom>
                Order Details for MANAGERorder {match.params.order_id}
              </Typography>
       
  
            {orders.map ( (product, index) => (
              <div key={index}>
            <Grid item>
    
            <CardActionArea key={index}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardMedia image={product.img} className={classes.media} />
              </div>
              <CardContent style={{ marginLeft: "0" }}>
                <Typography variant="h6">{ product.product_name}</Typography>
                <Typography variant="h5">{product.price + "$"}</Typography>
              </CardContent>
              <Grid item>
              
            </Grid>
            <form className={classes.textfield_} >
            <Grid item container direction="row-reverse" alignItems="center">
            <TextField
            required
            variant="outlined"
            select
            label="Status"
            // defaultValue={product.status}  
            value={getValue(product.status)}
            margin="normal"
            id="margin-none"
            onChange={ (e) => handleChange(index,e)}
            className={classes.textField}
            >
            <MenuItem value={0}>Getting Prepared</MenuItem>
            <MenuItem value={1}>On Delivery</MenuItem>
            <MenuItem value={2}>Delivered</MenuItem>
            <MenuItem value={3}>Cancelled</MenuItem>
            </TextField>
            </Grid>
            </form>
            <Divider></Divider>
            </Card>
            
          </CardActionArea>
              
            </Grid>

             </div>
             
            ))}
                <div>
          <Button variant="contained"  onClick={UpdateOrderStatus}>
              slm
          </Button>
      </div>  

        </div>
        
      );

};

export default OrderInfoMANAGER;
