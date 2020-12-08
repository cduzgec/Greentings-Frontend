import React, {useRef,useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Checkbox from '@material-ui/core/Checkbox';
import { FixedSizeList } from 'react-window';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '@material-ui/core';


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
  }
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

function Sidebar() {
  const classes = useStyles();

  const [minPrice,setminPrice] = useState("");
  const [maxPrice,setmaxPrice] = useState("");
  const [minRating,setminRating] = useState("");
  const [maxRating,setmaxRating] = useState("");

  function renderRow(props) {
    const { index, style } = props;

    return (    
      <ListItem button style={style}>
        <FormControlLabel
          control={<Checkbox value="filter" color="primary" />}
          label="Item"
        />
      </ListItem>
    );
  }

  function checkInput(){
    var re = /^[0-9]*$/;

    if (minPrice === "" || minPrice === "empty") {setminPrice("empty") }
    else if(!re.test(minPrice)) { alert("Please insert numbers to minimum price box"); return false;}

    if (maxPrice === ""|| maxPrice === "empty") {setmaxPrice("empty") }
    else if(!re.test(maxPrice)) { alert("Please insert numbers to maximum price box"); return false;}

    if (minRating === ""|| minRating === "empty") {setminRating("empty") }
    else if(!re.test(minRating)) { alert("Please insert numbers to minimum rating box"); return false;}

    if (maxRating === ""|| maxRating === "empty") {setmaxRating("empty") }
    else if(!re.test(maxRating)) { alert("Please insert numbers to maximum rating box"); return false;}
  }

  function sendFilter(){
    console.log("Send Filter with these values:") 
    checkInput()
    console.log(minPrice,maxPrice,minRating,maxRating)

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
            onChange={e => {setminPrice(e.target.value); console.log(minPrice);}} 
          />
          <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Maximum"
            onChange={e => setmaxPrice(e.target.value)} 
          />
          {['BRAND'].map((text, index) => (    // #069974
            <div key={text} className={classes.fixedlist}>
              <TextTypography>{text}</TextTypography>
              <FixedSizeList height={200} width={200} itemSize={40} itemCount={10}>
                {renderRow}
              </FixedSizeList>
            </div>

          ))}

        <TextTypography>Rating</TextTypography>
        <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Minimum"            
            onChange={e => setminRating(e.target.value)} 
          />
          <TextField className={classes.input}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Maximum"
            onChange={e => setmaxRating(e.target.value)} 
          />

          <Button className={classes.applybutton} variant="contained" 
            onClick={sendFilter}>Apply Filters</Button>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter in Related Category
              </ListSubheader>}
            className={classes.listitem}>
            <ListItem>
            <ListItemText primary="" />
            </ListItem>
            <ListItem>
            <ListItemText primary="" />
            </ListItem>
            <ListItem>
            <ListItemText primary="" />
            </ListItem><ListItem>
            <ListItemText primary="" />
            </ListItem>
            <ListItem>
            <ListItemText primary="" />
            </ListItem><ListItem>
            <ListItemText primary="" />
            </ListItem><ListItem>
            <ListItemText primary="" />
            </ListItem>
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






