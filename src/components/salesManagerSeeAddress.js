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

function Address({items}) {
    const classes = useStyles();



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
                                            Name: {items.first_name}  {items.last_name}
                                        </Typography>
                                        <Typography>
                                            city: {items.city}
                                            
                                        </Typography>
                                        <Typography>
                                        country : {items.country}
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
                                            address line:{items.address_line} 
                                            
                                            
                                            {/* All delivered: {order.allDelivered} */}
                                        </Typography>
                                        <Typography>
                                        phone number: {items.phone_number}
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