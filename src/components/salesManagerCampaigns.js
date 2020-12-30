import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Grid, Card,CardActionArea,CardMedia,CardContent,Divider, Button} from "@material-ui/core";
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ManagerPage from "./SalesManager";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { getByDisplayValue } from "@testing-library/react";
import InfiniteScroll from 'react-infinite-scroller';



const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    textfield_: {
        '& .MuiTextField-root': {
          margin: theme.spacing(5),
          width: '30ch',
          
        }},
    
    gridContainer: {
        padding: "50px",
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
          }
      },
      card: {
        display: "flex",
        marginLeft: "500px",
        marginRight: "500px"
      },
      cardDetails: {
        flex: 0,
      },
      media: {
        height: "100%",
        width: "111px",
      },
      
}));

function OrderInfoMANAGER({match}) {
    const classes = useStyles();
    const[items,setItems] = useState([]);
    

    useEffect(() => {fetchItems();}, []);

   
    const fetchItems = async () => {          
  
        const data = await fetch("/product/");
  
        const items= await data.json();
        //console.log(items); 
        setItems(items);}

    const handleChange = (index, event) => {
        let itemsTemp = [...items];
        itemsTemp[index].price =(event.target.value); 
        setItems(itemsTemp);
        };
    async function UpdatePrice(id, price){

        try {
    
        const res = await fetch(`/discountpanel/${id}/`, {
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
                "new_price": price
            
            })
        });
        console.log("response:",res)
        

        }
        catch (e)
        {
        console.log(e)
        }
        
        alert("Price is Updated")
        window.location.reload();
    }



      return (
        <div>
        <ManagerPage/>

              <Typography variant="h5" gutterBottom>
                Set Discounted Price {match.params.order_id}
              </Typography>
       
  
            {items.map ( (product, index) => (
              <div key={index}>
            <Grid item>
           
            <CardActionArea key={index}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardMedia image={product.img} className={classes.media} />
              </div>
              <CardContent style={{ marginLeft: "0" }}>
                <Typography variant="h6">{ product.product_name}</Typography>
                <Typography variant="h7">{ "brand: " + product.brand_name}</Typography>
               
                <Typography variant="h6">{"product id: " +product.product_id}</Typography>
              </CardContent>
              <Grid item>
              
            </Grid>
            <form className={classes.textfield_} >
            <Grid item container direction="row-reverse" alignItems="center">
            <TextField
            required
            variant="outlined"
            
            label="PRICE"
            // defaultValue={product.status}  
            value={product.price}
            margin="normal"
            id="margin-none"
            onChange={ (e) => handleChange(index,e)}
            className={classes.textField}
            >

            </TextField>
            <div>
          <Button variant="contained" onClick={() => {UpdatePrice(product.product_id, product.price);}} >
              SAVE CHANGES
          </Button>
             </div> 
            </Grid>
            </form>
            <Divider></Divider>
            </Card>
            
          </CardActionArea>
              
            </Grid>
            <Grid>
                .
            </Grid>

             </div>
             
            ))}
  



        </div>
        
        
      );

};

export default OrderInfoMANAGER;
