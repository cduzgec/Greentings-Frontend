import React from "react";
import { useState, useEffect } from 'react';
import { Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import UserPage from "./UserPage";

const styles = {
    paperContainer: {
        marginTop: "1px",
        marginLeft: "300px",
        marginRight: "300px"
    },
};

const useStyles = makeStyles((theme) => ({
    commentStyle: {
        width: '100%',
        maxWidth: '100',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function Orders() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);

    useEffect(() => { fetchOrder();}, []);

    const fetchOrder = async () => {
        const data = await fetch(`/order/`);               
        const orders = await data.json();
        setOrders(orders);                                            
        console.log({orders});
    }


    return (
        <div>
        <h2>
          List of Orders         
        </h2>
        {/* <UserPage/> */}
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {orders.map(order => (
                        <ListItem alignItems="flex-start" button onClick={() => {window.location.replace(`/adminOrderdetail/${order.order_id}`);}}>                                       
                            <ListItemText
                                primary= {
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            Customer {order.user} with order number {order.order_id} on
                                        </Typography>
                                        {"\n" + order.date}
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            Total price: {order.total_price+"\n"}
                                            All delivered: {order.allDelivered}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
        </div>

    );
};

export default Orders;