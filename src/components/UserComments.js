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
    const [comments, setComments] = useState([]);
    useEffect(() => { fetchComments(); }, []);
    const fetchComments = async () => {
        const data = await fetch(`/comments/6/`);                 // change url
        const comments = await data.json();
        setComments(comments);
        console.log(comments);
    }

    const classes = useStyles();
    return (
        <Paper style={styles.paperContainer} elevation={10}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <List className={classes.commentStyle}>
                    {comments.map(comment => (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={comment.nickname} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.text}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {comment.nickname}
                                        </Typography>
                                        {"\n" + comment.date}
                                        <Rating
                                            name="simple-controlled"
                                            defaultValue={comment.rating}
                                            disabled="true"
                                        />
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
