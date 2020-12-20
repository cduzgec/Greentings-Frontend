import React, {useState} from "react";
import { withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UserComments from "./UserComments"
import ChangePassword from "./ChangePassword";
import ChangeInfo from "./ChangeInfo"; 
import EditIcon from '@material-ui/icons/Edit';
import UserInfo from "./UserInfo"; 
import Approval from "./commentApproval"; 
import AddProduct from "./addProduct"; 
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';
import UserOrders from "./UserOrders";
import EditProduct from "./editProduct"; 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "500px"
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "200px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  toolbar: {
    height: "20px"
  },
}));

function UserPage({ match }) {
  const classes = useStyles();
  const [page, setPage] = useState("")

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon><LocalShippingIcon/></ListItemIcon>
              <ListItemText primary="My Orders" onClick={() => {setPage("Orders");}}/>                    
            </ListItem>
            <ListItem button>
              <ListItemIcon><CommentIcon/></ListItemIcon>
              <ListItemText primary="My Comments" onClick={() => {setPage("Comments");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonIcon/></ListItemIcon>
              <ListItemText primary="My User Information" onClick={() => {setPage("UserInfo");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonAddIcon/></ListItemIcon>
              <ListItemText primary="Change My User Information" onClick={() => {setPage("ChangeInfo");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><LockIcon/></ListItemIcon>
              <ListItemText primary="Change My Password" onClick={() => {setPage("ChangePass");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><EditAttributesOutlinedIcon/></ListItemIcon>
              <ListItemText primary="Comment Approval" onClick={() => {setPage("Approve");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><AddBoxOutlinedIcon/></ListItemIcon>
              <ListItemText primary="Add/Delete Product" onClick={() => {setPage("AddProduct");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><EditIcon/></ListItemIcon>
              <ListItemText primary="Edit Product" onClick={() => {setPage("EditProduct");}}/>
            </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {page === 'Orders'? <UserOrders/>: null }
        {page === 'Comments'? <UserComments/>: null }
        {page === 'UserInfo'? <UserInfo/>: null }
        {page === 'ChangeInfo'? <ChangeInfo/>: null }
        {page === 'ChangePass'? <ChangePassword/>: null }
        {page === 'Approve'? <Approval/>: null }
        {page === 'AddProduct'? <AddProduct/>: null }
        {page === 'EditProduct'? <EditProduct/>: null }
       
      </main>
    </div>
  );
}

export default withRouter(UserPage);
