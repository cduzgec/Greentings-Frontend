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
import EditProduct from "./editProduct"; 
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {  Button  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(0, 0, 1),
    backgroundColor: "#eeeee4",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    height: "20px"
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
const numberofitems = 3;

function MainPageItems() {
  const classes = useStyles();

  useEffect(() => {fetchItems();}, []);

  const[items,setItems] = useState([]);
  const [page, setPage] = useState("")
  const [img, setImg] = useState("")
  const [product_id, setProduct_id] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState("")
  const [ brand_name, setBrand_name] = useState("")
  const [ product_name, setRroduct_name] = useState("")

 
  const fetchItems = async () => {             /// try catchle

      const data = await fetch(`/manage/${localStorage.getItem("user_id")}/`);

      const items= await data.json();
      //console.log(items); 
      setItems(items);
    }


      async function DeleteProduct(id) {
        try {
      
          const res = await fetch (`/manage/${localStorage.getItem("user_id")}/`, {
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
              "product_id": id,

            
            })
          });
          console.log("response:",res)
          alert("Product is deleted");
          window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }
      const setLocalVariables = (product_id, brand_name, description, stock, price, img, product_name) => {
        
        setProduct_id(product_id);
        setImg(img);
        setPrice(price);
        setStock(stock);
        setDescription(description);
        setBrand_name(brand_name);
        setRroduct_name(product_name);
        setPage("EditProduct"); 
        }

    async function getCategories  (id)  {

        const data = await fetch(`/categorise/${id}/`);

        const categories= await data.json();
        debugger;
        let result="";
        for (var key in categories)
        {
            result += key + " ";
        }
        return result;

    }
    
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              My Products
            </Typography>

          </Container>
        </div>
        <div className={classes.root}>
        <Paper style={styles.paperContainer} elevation={10}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} styles={{maxWidth: "50%", flexBasis: "50%"}}>
          
            {items.slice(0,numberofitems).map(item => (                                                               //// sayı loopu ekle    
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
                     Stock: {item.stock}
                    </Typography>
                    <Typography>
                     ID: {item.product_id} 
                    </Typography>
                    <Typography>
                     description: {item.description} 
                    </Typography>
                    <Typography>
                    Brand:{item.brand_name}
                    </Typography>
                    <Typography>
                    <Rating name="read-only" defaultValue={2} value={parseInt(item.rating)} readOnly='true' /> 
                    </Typography>
                    <Button onClick={() => {DeleteProduct(item.product_id) }} variant="contained" color="primary" className={classes.button}  endIcon={<DeleteOutlineIcon fontSize="medium" />}>
                     Delete 
                     </Button>
                     <Button onClick={() => {setLocalVariables(item.product_id, 
                        item.brand_name, item.description, item.stock, item.price,
                        item.img, item.product_name);}} variant="contained" color="primary" className={classes.button}  endIcon={<ShoppingCartOutlinedIcon fontSize="medium" />}>
                     Edit
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {page === 'EditProduct'? <EditProduct  
        pdescription={description}
        pname={product_name}
        pprice={price}
        pbrand={brand_name}
        pstock={stock}
        img={img}
        product_id={product_id}

        />
        : null }
      
       
      </main>

    </React.Fragment>
  );
}


export default MainPageItems;