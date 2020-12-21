import React from "react";
import  {useRef,useState, useEffect} from 'react';
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
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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

root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

function ProductManager() {

    useEffect(() => {fetchCategories();},[]);
    const [category, setCategory] =useState([]);
    const [categoryInput, setCategoryInput] =useState("");
    const priceref = useRef('') 
    const describeref = useRef('') 
    const imgref = useRef('') 
    const deleteProductref = useRef(0) 
    const brandref = useRef('') 
    const nameref = useRef('') 
    const stockref = useRef(0) 
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDesc] = useState("");
    const [stock, setStock] = useState(0);
    const [DeleteProductID, setDeleteProductID] = useState(0);
    
  
    const handleChange = (event) => {
        setCategoryInput(event.target.value);
      };

    const fetchCategories = async () => {             
    const data = await fetch(`/category/`);
    // const category= await data.json().then(data => {
    //     setCategory(data.category_name)});
    // }
    const categories= await data.json();
    var tempArr = [];
    for(var i = 0;i<categories.length;i++){
        tempArr.push(categories[i].category_name);
    }
    setCategory(tempArr);
    console.log(category)
   
    }

    async function AddProduct (){
        try {
      
          const res = await fetch(`/manage/${localStorage.getItem("user_id")}/`, {
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
                "product_name": name,
                "price": parseInt(price),
                "description": description,
                "stock": parseInt(stock),
                "img": image,
                "brand_name": brand,
                "category_name": categoryInput,
              
              })
          });
          console.log("response:",res)
          alert("Product is added");
          window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }
      async function DeleteProduct() {
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
              "product_id": parseInt(DeleteProductID)

            
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

const classes = useStyles();
  return (
    <form className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={6}>
        <div>
            <h1>ADD A NEW PRODUCT</h1>
            <div>
        <TextField
        variant="outlined"
          id="standard-full-width"
          label="product description"
          style={{ margin: 8 }}
          
          fullWidth
          margin="normal"
          inputRef={describeref} 
          onChange={e => setDesc(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div>
        <TextField
        required
         variant="outlined"
          label="Stock"
          margin="normal"
          id="margin-none"
          inputRef={stockref} 
          onChange={e => setStock(e.target.value)}
          className={classes.textField}
        />
        <TextField
        required
         variant="outlined"
          label="image url"
          margin="normal"
          id="margin-none"
          inputRef={imgref} 
          onChange={e => setImage(e.target.value)}
          className={classes.textField}
        />
        </div>
        <div>
        <TextField
          required
          variant="outlined"
          select
          label="Category"
          value={categoryInput}
          margin="normal"
          id="margin-none"
          onChange={handleChange}
         
          className={classes.textField}
        >
        {category.map((ca, index) => (
        <MenuItem  key={index} value={ca}>
            {ca}
        </MenuItem>
        ))}
        </TextField> 
        <TextField
        required
         variant="outlined"
          label="Product Name"
          margin="normal"
          inputRef={nameref} 
          onChange={e => setName(e.target.value)}
          className={classes.textField}
          
        />
        </div>
        <div>
        <TextField
        required
         variant="outlined"
          label="Brand"
          margin="normal"
          inputRef={brandref} 
          onChange={e => setBrand(e.target.value)}
          className={classes.textField}
          
        />
        
        <TextField
        required
         variant="outlined"
          label="Price"
          margin="normal"
          inputRef={priceref} 
          onChange={e => setPrice(e.target.value)}
          className={classes.textField}
          
        />
        </div>
        </div>
        <div>
        <Button   onClick={() => {AddProduct() }}variant="contained">
            Add
        </Button>
        </div>
        </Grid>
        <Grid item xs={6}>
          <h1>DELETE PRODUCT</h1>
          <div>
        <TextField
        required
         variant="outlined"
          label="Product ID"
          style={{ margin: 8 }}
          
          fullWidth
          margin="normal"
          
          inputRef={deleteProductref} 
          onChange={e => setDeleteProductID(e.target.value)}
          helperText="Please enter the id of product to be deleted"
          className={classes.textField}
        />
        </div>
        <div>
        <Button   onClick={() => {DeleteProduct() }}variant="contained">
            Delete
        </Button>
        </div>
        </Grid>
        </Grid>
    </form>
  );
}

export default withRouter(ProductManager);