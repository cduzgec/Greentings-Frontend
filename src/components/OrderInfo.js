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
import UserPage from "./UserPage";

const styles = {
    paperContainer: {
        marginTop: "1px",
        marginLeft: "500px",
        marginRight: "500px"
        },
};

const useStyles = makeStyles((theme) => ({
    commentStyle: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function OrderInfo({match}) {
    console.log(match)
    const classes = useStyles();
    const [orders, setOrders] = useState([]);


    useEffect(() => { fetchOrder();}, []);

    const fetchOrder = async () => {
        const data = await fetch(`/orditem/${match.params.order_id}`);                             //${localStorage.getItem("user_id")}`);               
        const orders = await data.json();
        setOrders(orders);                                                // map lazım      aşağıda htmlde maple    
        console.log({orders});
    }


    return (
        <div>
        <UserPage/>
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {orders.map(order => (
                        <ListItem alignItems="flex-start" button onClick={() => {window.location.replace(`/product/${order.product}`);}}>           
                            <ListItemText
                                primary= {order.product}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            order quantitiy: {order.quantity}
                                        </Typography>
                                        {"\n" + order.status}
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

export default OrderInfo;
