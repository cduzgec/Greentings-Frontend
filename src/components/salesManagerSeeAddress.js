import React from "react";
import { useState, useEffect } from 'react';
import { Typography,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ManagerPage from "./SalesManager";

const styles = {
    paperContainer: {
        marginTop: "1px",
        marginLeft: "400px",
        marginRight: "400px"
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

function Address({addressid}) {
    const classes = useStyles();
    const [address, setAddress] = useState("");
    

    useEffect(() => { fetchRequest();}, []);

    const fetchRequest = async () => {
        const data = await fetch(`/address/${addressid}/`);               
        const adds = await data.json();
        setAddress(adds); 
        debugger;                                           
        
    }


    return (
        <div>

        <ManagerPage/>
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
        
                        <ListItem alignItems="flex-start" >                                       
                            <ListItemText
                                primary= {
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            Name: {address.first_name}  {address.last_name}
                                        </Typography>
                                        <Typography>
                                            city: {address.city}
                                            
                                        </Typography>
                                        <Typography>
                                        country : {address.country}
                                        </Typography>
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body3"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            address line:{address.address_line} 
                                            
                                            
                                            {/* All delivered: {order.allDelivered} */}
                                        </Typography>
                                        <Typography>
                                        phono number: {address.phone_number}
                                        </Typography>
                                    </React.Fragment>
                                }
                                
                            />
 
                        </ListItem>
                
                </List>
            </Box>
        </Paper>

        </div>
        

    );
};

export default Address;