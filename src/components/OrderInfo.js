import React from "react";
import { useState, useEffect } from 'react';
import { Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = {
    paperContainer: {

        margin: "10px 200px",
        marginTop: "50px"
    },
    spaperContainer: {

        //margin: "10px 200px",
        marginTop: "10px",
        marginRight: "50px",
        marginLeft: "50px"
    }
};

const useStyles = makeStyles((theme) => ({
    name: {
        textAlign: "left !important",
    },
    commentStyle: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function OrderInfo() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => { fetchOrder();}, []);
    useEffect(() => {if (orders) {fetchItems();}}, [orders]);

    const fetchOrder = async () => {
        const data = await fetch(`/ord/118`);                              //${localStorage.getItem("user_id")}`);               
        const orders = await data.json();
        setOrders(orders);                                                // map lazım      aşağıda htmlde maple    
        console.log(orders);
    }

    const fetchItems = async () => {
        const data = await fetch(`/orditem/${orders.order_id}`);                    // map lazım      aşağıda htmlde maple    
        const items = await data.json();
        setItems(items);
        console.log({items});
    }


    return (
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {orders.map(order => (
                        <ListItem alignItems="flex-start" button onClick={() => {<OrderInfo/>}}>         
                            <ListItemText
                                primary= "Lolol"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {order.date}
                                        </Typography>
                                        {"\n" + order.total_price}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>

    );
};

export default OrderInfo;
