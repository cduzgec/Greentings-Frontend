import React from "react";
import  {useRef,useState, useEffect} from 'react';
import { Grid, Typography,Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {green} from '@material-ui/core/colors';

import { withRouter } from "react-router-dom";
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

function ProductManager({product_id, pbrand, pdescription, pstock, pprice, img, pname}) {

  useEffect(() => {fetchCategories();},[]);
    const [category, setCategory] =useState([]);
    const [constantCategory, setConstantCategory] =useState([]);
    const [categoryInput, setCategoryInput] =useState("");
    const priceref = useRef('') 
    const describeref = useRef('') 
    const imgref = useRef('') 
    const Productref = useRef(0) 
    const Productref2 = useRef(0) 
    const brandref = useRef('') 
    const nameref = useRef('') 
    const stockref = useRef(0) 
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDesc] = useState("");
    const [stock, setStock] = useState(0);
    const [ProductID, setProductID] = useState(0);
    const [ProductID2, setProductID2] = useState(product_id);
    
 

    const getCategories = async () => {             
    const data = await fetch(`/categorise/${ProductID2}`);
    // const category= await data.json().then(data => {
    //     setCategory(data.category_name)});
    // }
    const category= await data.json();
    setCategory(category);
    
    }

    async function AddProduct (){
        try {
      
          const res = await fetch(`/manage/${localStorage.getItem("user_id")}/`, {
            method: "put",
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
                "product_id": parseInt(ProductID),
                "product_name": name,
                "price": parseInt(price),
                "description": description,
                "stock": parseInt(stock),
                "img": image,
                "brand_name": brand,
              
              })
          });
          console.log("response:",res)
          alert("Product is edited");
          window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }

      async function deleteCategory(categ) {
        try {
     
          const res = await fetch (`/categorise/${ProductID2}/`, {
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

              "category_name": categ,
            
            })
          });
          console.log("response:",res)
          if(res.status===204)
          {alert("Category is deleted");}
          else if(res.status===406)
          {alert("Category cannot be deleted because a product must have at least one category");}
          let temp=category
          Object.keys(category).forEach(function(key) {
            if( category[key] === categ){
              delete temp[key];
            }
          })
          setCategory(temp);
          
          // window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }
      async function AddCategory() {
        try {
    
          const res = await fetch (`/categorise/${ProductID2}/`, {
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

              "category_name": categoryInput,
            
            })
          });
          console.log("response:",res)

          if(res.status===201)
          {alert("Category is added");}
          else if(res.status===406)
          {alert("Category cannot be added because this product has already that category");}
          // let temp=category
          // Object.keys(category).forEach(function(key) {
          //   if( category[key] === categ){
          //     delete temp[key];
          //   }
          // })
          // setCategory(temp);
          
          // window.location.reload();
        }
        catch (e)
        {
          console.log(e)
        }
      
      }
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
        setConstantCategory(tempArr);
                  
          setPrice(pprice);
          setBrand(pbrand);
          setName(pname);
          setImage(img);
          setDesc(pdescription);
          setStock(pstock);
          setProductID(product_id);
        }


const classes = useStyles();
  return (
    <form className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={6}>
        <div>
            <h1>EDIT THE PRODUCT</h1>
            <div>
        <TextField
        required
         variant="outlined"
          label="Product ID"
          margin="normal"
          defaultValue={product_id}
          fullWidth
          margin="normal"
          
          inputRef={Productref} 
          onChange={e => setProductID(e.target.value)}
          helperText="Please enter the id of product to be deleted"
          className={classes.textField}
        />

        <TextField
        required
         variant="outlined"
          label="Stock"
          defaultValue={pstock}
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
          defaultValue={img}
          id="margin-none"
          inputRef={imgref} 
          onChange={e => setImage(e.target.value)}
          className={classes.textField}
        />
        </div>
        <div>


        <TextField
        variant="outlined"
          id="standard-full-width"
          label="product description"
          style={{ margin: 8 }}
          defaultValue={pdescription}
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
          label="Product Name"
          margin="normal"
          defaultValue={pname}
          inputRef={nameref} 
          onChange={e => setName(e.target.value)}
          className={classes.textField}
          
        />

        <TextField
        required
         variant="outlined"
          label="Brand"
          defaultValue={pbrand}
          margin="normal"
          inputRef={brandref} 
          onChange={e => setBrand(e.target.value)}
          className={classes.textField}
          
        />
        
        <TextField
        required
         variant="outlined"
          label="Price"
          defaultValue={pprice}

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
          <h1>EDIT CATEGORY</h1>
          <div>
          <TextField
        required
         variant="outlined"
          label="Product ID"
          margin="normal"
          defaultValue={product_id}
          fullWidth
          margin="normal"
          
          inputRef={Productref2} 
          onChange={e => setProductID2(e.target.value)}
          helperText="Please enter the id of product to be deleted"
          className={classes.textField}
        />
        </div>
        <div>
        <Button   onClick={() => {getCategories() }}variant="contained">
            See the categories of this product

        </Button>
        </div>
        <div>
        <Typography variant="h7">
          Your product has these categories:
        </Typography>
        {category.map (ca => (
        <div>
          <Typography variant="h7">
            {ca.category_name}
          </Typography>
          <Button onClick={() => {deleteCategory(ca.category_name) }}>Delete</Button>
        </div>
        
        ))}
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
        {constantCategory.map((c, index) => (
        <MenuItem  key={index} value={c}>
            {c}
        </MenuItem>
        ))}
        </TextField>
        </div>
        <div>
        <Button onClick={() => {AddCategory() }}>add category</Button>
        </div>

        </Grid>
        </Grid>
    </form>
  );
}

export default withRouter(ProductManager);