import React from "react";
import  {useState, useEffect} from 'react';
import { Grid, Typography,Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import {green} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from "react-router-dom";


const styles = {
  spaperContainer: { 
   
    //margin: "10px 200px",
    marginTop: "10px",
    marginRight: "60px",
    marginLeft: "50px"
    

  },

};
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "50px",
  },
  itemContainer: {
    padding: "20px",
    color: "0000",
    fontSize: "20px"

  },
  formControl: {
    marginTop: "-12px",
    minWidth: 120,
  },
  p:{
    fontSize: "14px",
    color: "black",
},
button: {
  margin: theme.spacing(1),
  backgroundColor:green[500],
  fontSize: 16,
  '&:hover': {
    backgroundColor: green[800],
  },
},

commentStyle: {
  width: '100%',
  minWidth: '40ch',
  backgroundColor: theme.palette.background.paper,
},
inline: {
  display: 'inline',
},
root: {
  flexGrow: 1,
  marginTop: "20px",
},

}));

function ProductManager() {
  useEffect(() => {fetchComments();},[]);
 
  const[comments,setComments] = useState([]);
  const fetchComments = async () => {             
    const data = await fetch(`/commentapproval`);
    const comments= await data.json();
    setComments(comments);
    console.log(comments);

}

async function ApproveComment (id) {
  try {

    const res = await fetch (`/commentapproval`, {
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
      body: id,
    });
    console.log("response:",res)
    alert("Comment is approved");
    window.location.reload();
  }
  catch (e)
  {
    console.log(e)
  }

}
async function DeleteComment (id) {
    try {
  
      const res = await fetch (`/commentapproval`, {
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
        body: 
          id,
        
       
      });
      console.log("response:",res)
      alert("Comment is deleted");
      window.location.reload();
    }
    catch (e)
    {
      console.log(e)
    }
  
  }

const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
        
       
        <List className={classes.commentStyle}>
              {comments.map (comment => (               
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
                        {"\n"+comment.date}
                        <Rating
                            name="simple-controlled"
                            defaultValue={comment.rating}
                            disabled="true"
                          />
                        <Typography> For product with product id: {comment.product} </Typography>
                         <Button   onClick={() => {ApproveComment(comment.comment_id) }}variant="contained">
                            Approve
                        </Button> 
                        <Button  onClick={() => {DeleteComment(comment.comment_id) }}variant="contained">
                           Delete
                        </Button> 
                      </React.Fragment>  
                    }
                  />
                </ListItem>
                                 
              ))}
              </List> 
          
              </Grid>

  
        </Grid>
    </div>
  );
}

export default withRouter(ProductManager);