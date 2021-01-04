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
  

    useEffect(() => { fetchRequest();}, []);

    const fetchRequest = async () => {
        const data = await fetch(`/cancelorder/1/`);               
        const reqs = await data.json();
        setRequests(reqs);  
        debugger;            
    }

    async function Approve(id) {
        try {
      
          const res = await fetch (`/cancelorder/${id}/`, {
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
    
        const res = await fetch (`/cancelorder/${id}/`, {
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
        console.log("response:",res);
        alert(" rejected");
        window.location.reload();
    }
    catch (e)
    {
        console.log(e)
    }
    
    }



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
                                            There is a request for cancellation of order with id: {req.order}
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
                                            Click to see details for accessing the products for this order
                                    
                                        </Typography>
                                    </React.Fragment>
                                }
                                
                            />
                             
                        <Button variant="contained" onClick={() => Approve(req.ordercancel_id)} >
                        Approve
                        </Button>
                        <Button variant="contained" onClick={() => Reject(req.ordercancel_id)}>
                        Reject
                        </Button>
                        <Button variant="contained"  onClick={() => {window.location.replace(`/adminOrderdetail/${req.order}`);}}>
                        See Details
                        </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>

        </div>
        

    );
};

export default Requests;