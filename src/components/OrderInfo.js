import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Grid, Card,CardActionArea,CardMedia,CardContent,Divider} from "@material-ui/core";
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserPage from "./UserPage";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    gridContainer: {
        padding: "50px",
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
          }
      },
      card: {
        display: "flex",
        marginLeft: "400px",
        marginRight: "400px"
      },
      cardDetails: {
        flex: 0,
      },
      media: {
        height: "100%",
        width: "111px",
      },
}));

function OrderInfo({match}) {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);


    useEffect(() => { fetchOrder();}, []);

    const fetchOrder = async () => {
        const data = await fetch(`/orditem/${match.params.order_id}`);                                       
        const orders = await data.json();
        setOrders(orders);                                                
        console.log({orders});
    }

    const getShoppingCard = (index, product, price, imageUrl, quantity, id, status) => {
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
              <Typography variant="h7"> {status}</Typography>
            </Grid>

            </Card>
          </CardActionArea>
        );
      };


      return (
        <div>
        <UserPage/>

              <Typography variant="h4" gutterBottom>
                Order Details for order {match.params.order_id}
              </Typography>
       
  
            {orders.map ( (product, index) => (
              <div>
            <Grid item>
    
              {getShoppingCard(
                index,
                product.product_name,
                product.price + "$",
                product.img,
                product.quantity,
                product.product_id,
                product.status
                
              )}
              
            </Grid>

             </div>
            ))}
            

        </div>
      );
};

export default OrderInfo;
