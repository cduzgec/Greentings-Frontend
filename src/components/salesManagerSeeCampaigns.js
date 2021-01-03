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
import SeeCampaignProducts from './salesManagerCampaignDetail';

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

function Campaigns() {
    const classes = useStyles();
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState("");
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);



    useEffect(() => { fetchCampaigns();}, []);

    const fetchCampaigns = async () => {
        const data = await fetch(`/campaigns/`);               
        const campaigns = await data.json();
        setCampaigns(campaigns);                                            
        debugger;
    }

    async function getCampaignItems(id){
        
        try {
        
            const res = await fetch(`/campaignitems/${id}/`, {
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
            const items = await res.json();
            debugger;
            setItems(items);
    
        }
            catch (e)
            {
            console.log(e)
            }
            
     }

     async function deleteCampaign(nametodeleted){
        
        try {
        
            const res = await fetch(`/discountpanel/`, {
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
                "campaign_name": nametodeleted
                
                })
            });
 
 
    
        }
            catch (e)
            {
            console.log(e)
            }
            alert("Campaign is deleted");
            window.location.reload();
     }

    const setLocalVariables = (id, name) => {
        getCampaignItems(id);
        setName(name);
        setPage("SeeCampaignProducts");
    }
    

    return (
        <div>

        <ManagerPage/>
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {campaigns.map(campaign => (
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
                                            Campaign Name: {campaign.name}
                                            {"\n"}
                                        Description: {"\n" + campaign.description}
                                        </Typography >
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
                                            Discount Rate: {campaign.discount_rate + "%"+ "\n"}
                                            Products Included: 
                                            {campaign.products.map(product => (
                                                product + " "

                                            ))}
                                        </Typography>
                                    </React.Fragment>
                                }
                                
                            />
                        <Button variant="contained" onClick={() => setLocalVariables(campaign.campaign_id, campaign.campaign_name)} >
                        See Details
                        </Button>
                        <Button variant="contained" onClick={() => deleteCampaign(campaign.name)}>
                        
                        Delete 
                        </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
        <main className={classes.content}>
        <div className={classes.toolbar} />

        {page === 'SeeCampaignProducts'? <SeeCampaignProducts  
        items_= {items} 
        Cname={name}
        />: null }

    
    </main>
        </div>

    );
};

export default Campaigns;