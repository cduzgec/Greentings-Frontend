import React from "react";
import  {useRef,useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Grid, Card,CardActionArea,CardMedia,CardContent,Divider, Button} from "@material-ui/core";
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ManagerPage from "./SalesManager";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { DataGrid } from '@material-ui/data-grid';


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
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "500px",
      },
      
}));

function OrderInfoMANAGER({match}) {
  const [page, setPage] = React.useState(1);
    const classes = useStyles();
    const[items,setItems] = useState([]);
    const [description, setDesc] = useState("");
    const describeref = useRef('') 
    const [name, setName] = useState("");
    const nameref = useRef('') ;
    const[chosenIDs,setID]=useState([]);

    useEffect(() => {fetchItems();}, []);

    const [checkeds, setCheckeds] = React.useState([]);

    const handleChange2 = (event,index, id) => {
      let ids = [...chosenIDs];
      if(checkeds[index] === false) {
        ids.push(id);
      }
      else {
        delete ids[index];
        // ids.pop(id);
      }
      setID(ids);
      debugger;
      let checks = [...checkeds];
      checks[index] = !checkeds[index]
      setCheckeds(checks);
      
    };
   
    const fetchItems = async () => {          
  
        const data = await fetch("/product/");
  
        const items= await data.json();
        //console.log(items); 
        setItems(items);

        let checks = [];
        for (let item in items ) {
            checks.push(false);
        }
        setCheckeds(checks);
      }

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
        <form className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={7}>
        <TextField
        variant="outlined"
          id="standard-full-width"
          label="Campaign Name"
          style={{ margin: 8 }}
          
          fullWidth
          margin="normal"
          inputRef={nameref} 
          onChange={e => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
          <TextField
        variant="outlined"
          id="standard-full-width"
          label="Campaign Description"
          style={{ margin: 8 }}
          
          fullWidth
          margin="normal"
          inputRef={describeref} 
          onChange={e => setDesc(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        </Grid>
        </form>
              <Typography variant="h5" gutterBottom>
                Select Products for this Campaign {match.params.order_id}
              </Typography>
       
  
            {items.map ( (product, index) => (
              
              <div key={index}>
              {/* <DataGrid
                page={page}
                onPageChange={(params) => {
                  setPage(params.page);
                }}
                pageSize={5}
                pagination
                {...items}
              /> */}
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
            <Checkbox
              checked={checkeds[index]}
               onChange={(e) => {handleChange2(e,index,product.product_id)}}
                 inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            {/* <TextField
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
             </div>  */}
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
