import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import { FixedSizeList } from 'react-window';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import { green } from '@material-ui/core/colors';


import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "200px"
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listitem: {
    width: '100%',
    maxWidth: 360,
    marginLeft: "1px",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  fixedlist: {
    height: 300,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  applybutton: {
    backgroundColor: "#17ba9c",
    fontSize: 18,
  },
  input:
  {
    alignContent: "center",
    width: "150px",
  },
  rootforcheck: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TextTypography = withStyles({
  root: {
    backgroundColor: "#17ba9c",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'capitalize',
    maxWidth: 200,
    height: 30,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 18,
    justifyContent: "center",
  }
}
)(Typography);


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



function Sidebar(props) {
  const classes = useStyles();

  const [message,setMessage] = useState("");
  const [minPrice,setminPrice] = useState("");
  const [maxPrice,setmaxPrice] = useState("");
  const [rating,setRating] = useState(0);
  const [checked, setChecked] = useState([]);                 // add checked brands to
  let brandsString = "";
  // fetch
  const [brands,setBrands] = useState([]);
  const[items,setItems] = useState([]);

  useEffect(() => {fetchBrands();}, []);

  useEffect(() => {checkInput();}, [minPrice]);
  useEffect(() => {checkInput();}, [maxPrice]);
  useEffect(() => {convertString();}, [checked]);

  //useEffect(() => {sendItemsToCategory();}, [items]);
 
  const fetchBrands = async () => {         
      const data = await fetch(`/categorynames/${props.categoryid}`);                         //    /category/${category.categories_id}

      const brands= await data.json();
      console.log("BRANDS");
      console.log(brands); 
      setBrands(brands);};         // name: 

  function checkInput(){ // okay cases:// min: number, max: number // min: empty, max: empty  --> rest is unacceptable
    var re = /^[0-9]*$/;

    if (minPrice === "" && maxPrice === "") {setminPrice("empty"); setmaxPrice("empty") } // both are null set them as empty for backend

    else if (minPrice === "" || minPrice === "empty" )
    {
      if (maxPrice === "empty") {setminPrice("empty")}
      else if (!re.test(maxPrice)) { alert("Please insert numbers to maximum price box"); return false;}
      else {setminPrice(0)}
    }

    else if (maxPrice === "" || maxPrice === "empty" )
    {
      if (minPrice === "empty") {setmaxPrice("empty")}
      else if (!re.test(minPrice)) { alert("Please insert numbers to minimum price box"); return false;}
      else {setmaxPrice(100000)}
    }

    else { // both have inputs
      if (minPrice !== "empty" && maxPrice !== "empty") 
      {
        if (!re.test(minPrice)) { alert("Please insert numbers to minimum price box"); return false;}
        if (!re.test(maxPrice)) { alert("Please insert numbers to maximum price box"); return false;}
      }    
  }
    console.log("New Filter with these values:") 
    console.log(minPrice,maxPrice)

  }
  
  async function sendFilter () {
    try {
        const response = await fetch (`/categoryitems/${props.categoryid}/`, {       
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
            "brand":checked,
            "rating": parseInt(rating),
            "price_upper": parseInt(minPrice),
            "price_lower": parseInt(maxPrice),
        })
        });
        console.log("Response Status: "+response.status)

        if (response.status === 202){
          response.json().then(data => setItems(data))
        }
        else {
          response.json().then(data => {setMessage(data.message)})
        }
    }
    catch (e)
    {
      console.log(e)
    } 
  }   









  const sendItemsToCategory = (index) => { // the callback. Use a better name
    console.log(index);
    setItems(index);
  };



  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);


    
  };

  function convertString() {
    brandsString = checked.join(", ");
    for (let i = 0; i < checked.length; i++) {
      brandsString = checked[i].name;
     }




    console.log(checked);
    console.log(brandsString);
    console.log(brandsString.length);
    brandsString = "";
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper, }} >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <TextTypography>Price</TextTypography>
        <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Minimum"            
            onChange={e => {setminPrice(e.target.value)}} 
          />
          <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Maximum"
            onChange={e => {setmaxPrice(e.target.value)}}
          />
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>

            <div key={"brand"} className={classes.fixedlist}>
              <TextTypography>Brand</TextTypography>


              
              {brands.map((index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                <List className={classes.rootforcheck}>
                  <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
                    <ListItemIcon>
                      <GreenCheckbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${index.name}`} />
                  </ListItem>
                  </List>
                );
              })}
            

            </div>
  
        <TextTypography>Rating</TextTypography>
        <Rating
            name="simple-controlled"
            defaultValue={null}
            onChange={e => {setRating(e.target.value);}}/>

            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
          
          <Button className={classes.applybutton} variant="contained" 
            onClick={fetchBrands}>Apply Filters</Button>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter in Related Category
              </ListSubheader>}
            className={classes.listitem}>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
            <ListItem><ListItemText primary="" /></ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
}


export default Sidebar;






