import React, {useState,useEffect} from "react";
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
import Sidebar from './Sidebar'
import Rating from "@material-ui/lab/Rating";
import {green} from '@material-ui/core/colors';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {  Button  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(1, 0, 1),
    backgroundColor: ":#eeeee4"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    
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
      backgroundColor: "#64bf6a",
      marginRight: "300px",
      marginLeft: "300px"
  }
};
const numberofitems = 40;

function Categories({ match }) {
  const classes = useStyles();

  useEffect(() => { fetchCategory();}, [match]);

  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    const fetchCategory = await fetch(`/category/${match.params.categories_id}`)  // params: categories_id: "1"
    const category = await fetchCategory.json();
    setCategory(category)
    console.log("CATEGORY"); 
    console.log(category);   // {category_id: 1, category_name: "clothing"}
  }

  useEffect(() => {fetchItems();}, [category]);

  const[items,setItems] = useState([]);
 
  const fetchItems = async () => {      
      const data = await fetch(`/categoryitems/${category.category_id}/`);                         //    /category/${category.categories_id}

      const items= await data.json();
      console.log("ITEMS");
      console.log(items); 
      setItems(items);};         // brand_name: description: img: price: product_id: product_name: rating: stock:
  
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

  const onchange = (data) => {
    setItems(data)
    console.log("Call back");
    console.log(data);
    }


  return (
    
    <React.Fragment>
      <CssBaseline />
      <main>
      <Sidebar categoryid = {match.params.categories_id} onchange={(e) => { onchange(e) }} />
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom>
              {category.category_name}
            </Typography>
          </Container>
        </div>
        <div className={classes.root}>
        <Paper style={styles.paperContainer} elevation={10}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} styles={{maxWidth: "50%", flexBasis: "50%"}}>
          
            {items.slice(0,numberofitems).map(item => (                                                              
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
                     Price: {item.price} $
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


export default Categories;