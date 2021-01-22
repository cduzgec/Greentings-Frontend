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
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router";

const styles = {
    paperContainer: {
        marginTop: "1px",
        marginLeft: "1px",
        marginRight: "1px"
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

function Address({user_id}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useState([]);
    const [message,setMessage] = useState("");
    const history = useHistory();
    

    useEffect(() => { fetchAddress();}, []);

    const fetchAddress = async () => {
        const data = await fetch(`/myaddress/${user_id}/`);               
        const adds = await data.json();
        setAddresses(adds);
        console.log({adds})  
        console.log(addresses)                                              
    }

      async function DeleteAddress (address_id) {
        try {
          const response = await fetch (`/address/${address_id}/`, {       
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
            })
          });
          if (response.status === 204){                               
            alert("The selected address is deleted.");
          }
          else if (response.status === 500){                               
            alert("The selected address can't be deleted since it is on process.");
          }
          else {
            response.json().then(data => {setMessage(data.message)})       
          }
        }
      catch (e)
        {
          console.log(e)
        }
      }

      function SelectAddress(address_id,address_line, phone_number, country, city, first_name, last_name,postal_code){
          localStorage.setItem("address_id", address_id )
          localStorage.setItem("address_line", address_line )
          localStorage.setItem("phone_number", phone_number )
          localStorage.setItem("country", country )
          localStorage.setItem("city", city )
          localStorage.setItem("first_name", first_name )
          localStorage.setItem("last_name", last_name )
          localStorage.setItem("postal_code", postal_code)
          history.push('/payment')
      }
    return (
        <div>

        <Paper style={styles.paperContainer} elevation={10}>

        <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                {addresses.map(address => (
                        <ListItem alignItems="flex-start" key = {address.address_id} button>  
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
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            address line:{address.address_line} 
                                        </Typography>
                                        <Typography>
                                        phone number: {address.phone_number}
                                        </Typography>
                                        <Typography>
                                        postal_code: {address.postal_code}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
     
                            <Button variant="contained" onClick={() => SelectAddress(address.address_id,
                               address.address_line,
                               address.phone_number,
                               address.country,
                               address.city,
                               address.first_name,
                               address.last_name,
                               address.postal_code)}>Select</Button>
                            <Button variant="contained" onClick={() => DeleteAddress(address.address_id)}> Delete</Button>
 
                        </ListItem>
                    ))}
                </List>
        </Box>
        </Paper>
        </div>

    );
};

export default Address;