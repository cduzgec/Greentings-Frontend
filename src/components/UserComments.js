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

function UserComments({ match }) {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    useEffect(() => { fetchComments(); }, []);
    const fetchComments = async () => {
        const data = await fetch(`/usercomments/${localStorage.getItem("user_id")}/`);                 // change url
        const comments = await data.json();
        setComments(comments);
        console.log(comments);
    }

    
    return (
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {comments.map(comment => (
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.text}
                                secondary={
                                    <React.Fragment>
                                            <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary">
                                        {comment.date +"\n"}
                                            </Typography>
                                        For product: {comment.product + "\n"}
                                            <Rating name="simple-controlled" defaultValue={comment.rating} disabled="true"/>
                                        {"\n" + "Approved:" +comment.validation+"\n"}
                                        
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

export default UserComments;