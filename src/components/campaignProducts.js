import React, {useState,useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Rating from "@material-ui/lab/Rating";
import {green} from '@material-ui/core/colors';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {  Button  } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(5, 0, 1),
    backgroundColor: "#eeeee4",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    
      fontFamily: "Arial, Helvetica, sans-serif",
      margin: "50px 200px",
      width: "100%",
      height: "fit-content",
      padding: "40px",
    },
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
    fontSize: 16,
    '&:hover': {
      backgroundColor: green[800],
    },
  },

}));

const styles = {
  paperContainer: {
      opacity: "0.8",
      backgroundColor: "#64bf6a"
  }
};


function CampaignItems({match}) {
  const classes = useStyles();

  useEffect(() => {getCampaignItems();}, []);

  const[items,setItems] = useState([]);
 
  async function getCampaignItems(){
        
    try {
    
        const res = await fetch(`/campaignitems/${match.params.campaign_id}/`, {
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



  async function sendProducttoCart (id) {
      try {

        const response = await fetch (`/basket/${localStorage.getItem("user_id")}/`, {
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
            "product": id,
            "quantity": 1,
          
          })
        });
        if (response.status === 201){
          response.json().then(data => {
            console.log(data)
            console.log(data[0].user_id)
            localStorage.setItem("user_id",data[0].user_id); 
            alert("Product is added to the cart");
        })}
        else {
          response.json().then(data => {alert(data.message)})
        }
        
      }
      catch (e)
      {
        console.log(e)
      }

    }
      
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom>
              Campaign Items
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph>
              Buy our cool products and be cool 
            </Typography>
          </Container>
        </div>
        <div className={classes.root}>
        <Paper style={styles.paperContainer} elevation={10}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} styles={{maxWidth: "50%", flexBasis: "50%"}}>
          
            {items.map(item => (                                                             
              <Grid item key= {item.product_id} xs={12} sm={6} md={4}>
                
                <Card className={classes.card}>
                <Link to = {`/product/${item.product_id}`} variant="body2" className={classes.link}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {item.img}
                    title="Image title" />
                    </Link>
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {item.product_name}
                    </Typography>
                    <Typography>
                     New Price: {item.price} $
                    </Typography>
                    <Typography style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                     Old Price: {item.base_price} $
                    </Typography>
                    <Typography>
                    Brand:{item.brand_name}
                    </Typography>
                    <Typography>
                    <Rating name="read-only" defaultValue={2} value={parseInt(item.rating)} readOnly='true' /> 
                    </Typography>
                    <Button onClick={() => {sendProducttoCart(item.product_id) }} variant="contained" color="primary" className={classes.button}  endIcon={<ShoppingCartOutlinedIcon fontSize="medium" />}>
                     Add To Cart
                     </Button>
                    </CardContent>
                </Card>
              
              </Grid>
            ))}

          
          </Grid>
        </Container>
        </Paper>
        </div>
      </main>

    </React.Fragment>
  );
}


export default CampaignItems;