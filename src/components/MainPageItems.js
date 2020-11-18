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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
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
      margin: "100px 200px",
      width: "100%",
      height: "fit-content",
      padding: "40px",
    },
  },

}));

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      opacity: "0.8",
      backgroundColor: "#64bf6a"
  }
};
//const cards = [1, 2, 3, 4, 5, 6];

function Album() {
  const classes = useStyles();

  useEffect(() => {fetchItems();}, []);

  const[items,setItems] = useState([]);

  const fetchItems = async () => {
      const data = await fetch("/product/");

      const items= await data.json();
      console.log(items); 
      setItems(items);};

      
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
              New Arrivals
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph>
              Buy our cool products and be cool as f*ck
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
                <Link to = {`/product/${item.product_id}`} variant="body2" className={classes.link}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {item.img}
                    title="Image title" />
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
                    Rating: {item.rating}/5
                    </Typography>
                    </CardContent>
                </Card>
              </Link>
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


export default Album;