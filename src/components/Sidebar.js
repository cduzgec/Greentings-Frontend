import React, {useRef,useState, useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
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
}));

const TextTypography = withStyles({
  root: {
    backgroundColor:"#17ba9c",
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

  const [open, setOpen] = useState(true);

  const handleClick = () => setOpen(!open);


  function renderRow(props) {
    const { index, style } = props;
  
    return (     ////// liste içi
      <ListItem button style={style} key={index}>
        <Checkbox color="primary" />
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper, }} >
        <Toolbar/>
        <div className={classes.drawerContainer}>
          {['PRICE', 'BRAND', 'RATING', 'CATEGORY', 'STOCK'].map((text, index) => (    // #069974
                <div key={text} className={classes.fixedlist}>
                  <TextTypography>{text}</TextTypography>
                  <FixedSizeList height={200} width={200} itemSize={40} itemCount={10}>
                    {renderRow}
                  </FixedSizeList>
                </div>
          ))}
   
          <Divider />
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter in Related Category
              </ListSubheader>
            }
            className={classes.listitem}
          >
            <ListItem>

              <ListItemText primary="Sent mail" />
            </ListItem>
            <ListItem button>

              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button onClick={handleClick}>

              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
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






