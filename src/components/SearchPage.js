import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OurButton from "./button"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        backgroundColor: "#eeeee4",
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
    sort: {
        marginLeft: "1500px",
        backgroundColor: "#64bf6a"
    },
}));

const styles = {
    paperContainer: {
        opacity: "0.8",
        backgroundColor: "#64bf6a"
    }
};
const numberofitems = 10;


const json = ['Price Descending', '/search/?search=${match.params.search}&ordering=price'];


function SearchPage({ match }) {
    const classes = useStyles();

    useEffect(() => { fetchItems(); }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(`/search/?search=${match.params.search}`);

        const items = await data.json();
        console.log("ITEMS");
        console.log(items);
        setItems(items);
    };         // brand_name: description: img: price: product_id: product_name: rating: stock:

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const applyFilter = (index) => {  // 'Price Descending', 'Price Ascending', 'Rating Descending', 'Rating Ascending'
        //console.log(index)

        handleClose();

        if (index===0){     // Price Descending
        fetch(`/search/?search=${match.params.search}&ordering=-price`)
        .then(response => response.json())
        .then(result => {console.log('Price Descending:', result); setItems(result)})
        .catch(error => console.log('error:', error));
        }
        
        if (index===1){     // Price Ascending
            fetch(`/search/?search=${match.params.search}&ordering=price`)
            .then(response => response.json())
            .then(result => {console.log('Price Ascending:', result); setItems(result)})
            .catch(error => console.log('error:', error));
        }
        if (index===2){     // Rating Descending
            fetch(`/search/?search=${match.params.search}&ordering=-rating`)
            .then(response => response.json())
            .then(result => {console.log('Rating Descending:', result); setItems(result)})
            .catch(error => console.log('error:', error));
        }
        if (index===3){     // Rating Ascending
            fetch(`/search/?search=${match.params.search}&ordering=rating`)
            .then(response => response.json())
            .then(result => {console.log('Rating Ascending:', result); setItems(result)})
            .catch(error => console.log('error:', error));
        }
        
    }
    

    return (

    <React.Fragment>
        <CssBaseline />
        <main>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                        color="textPrimary"
                        gutterBottom>
                        Searching: {match.params.search}
            </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph>
                        Random stuff writing about Search
            </Typography>
                </Container>
            </div>


            <OurButton className={classes.sort} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Sort
        </OurButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                {['Price Descending', 'Price Ascending', 'Rating Descending', 'Rating Ascending'].map((text, index) => (
                    <div key={text}>
                        <MenuItem onClick={() => applyFilter(index)}>{text}</MenuItem>
                    </div>))}
            </Menu>

            <div className={classes.root}>
                <Paper style={styles.paperContainer} elevation={10}>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4} styles={{ maxWidth: "50%", flexBasis: "50%" }}>

                            {items.slice(0, numberofitems).map(item => (
                                <Grid item key={item.product_id} xs={12} sm={6} md={4}>
                                    <Link to={`/product/${item.product_id}`} variant="body2" className={classes.link}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={item.img}
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


export default SearchPage;