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
import SeeAddress from "./salesManagerSeeAddress";

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

function Requests() {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState("");
    const [id, setAddressId] = useState(0);

    useEffect(() => { fetchRequest();}, []);

    const fetchRequest = async () => {
        const data = await fetch(`/oac/`);               
        const reqs = await data.json();
        setRequests(reqs);          
                                 
        
    }
    const setLocalVariables = (address_id) => {
        
        setAddressId(address_id);
        setPage("SeeAddress");
        
    }
    async function Approve(id) {
        try {
      
          const res = await fetch (`/oac/`, {
            method: "put",
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
                "oac_id": parseInt(id)
      
        })
    });
          console.log("response:",res);
          alert(" approved");
          window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }
    async function Reject(id) {
    try {
    
        const res = await fetch (`/oac/`, {
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
            "oac_id": parseInt(id)
    
    })
});
        console.log("response:",res);
        alert(" rejected");
        window.location.reload();
    }
    catch (e)
    {
        console.log(e)
    }
    
    }


    // const fetchInvoices = async (orderr_id) => {
    //     debugger;
    //     const data = await fetch(`/seepdf/${orderr_id}/`);               
    //     const invoice = await data.json();
    //     setInvoices(invoice);                                            
    //     console.log({orders});
    // }


    return (
        <div>

        <ManagerPage/>
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {requests.map(req => (
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
                                            Order number {req.order} 
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
                                            New address: {req.address}
                                            {/* All delivered: {order.allDelivered} */}
                                        </Typography>
                                    </React.Fragment>
                                }
                                
                            />
                            
                        <Button variant="contained" onClick={() => setLocalVariables(req.address)}>
                        See New Adress in Detail
                        </Button>
                        <Button variant="contained" onClick={() => {window.location.replace(`/adminOrderdetail/${req.order}`);}}>
                        See Order in Detail
                        </Button>
                        <Button variant="contained" onClick={() => Approve(req.orderadresschange_id)}>
                        Approve
                        </Button>
                        <Button variant="contained"  onClick={() => Reject(req.orderadresschange_id)}>
                        Reject
                        </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
        <main className={classes.content}>
        <div className={classes.toolbar} />

        {page === 'SeeAddress'? <SeeAddress  
        addressid= {id} 
        />: null }

    
    </main>
        </div>
        

    );
};

export default Requests;