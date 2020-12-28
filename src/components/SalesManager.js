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
import UserInfo from "./UserInfo"; 
import ChangeOrderStatus from "./changeOrderStatus"
import UserOrders from "./UserOrders";
import ManageOrders from "./managerOrderEdit";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ShowChartIcon from '@material-ui/icons/ShowChart';
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
  toolbar: {
    height: "20px"
  },
}));

function SalesManager() {
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
              <ListItemIcon><AlarmOnIcon/></ListItemIcon>
              <ListItemText primary="Edit Order" onClick={() => {setPage("ManageOrders");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><FindInPageIcon/></ListItemIcon>
              <ListItemText primary="See Invoices" onClick={() => {setPage("ChangeOrderStatus");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><LoyaltyIcon/></ListItemIcon>
              <ListItemText primary="Campaigns" onClick={() => {setPage("ChangeOrderStatus");}}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><ShowChartIcon/></ListItemIcon>
              <ListItemText primary="Analyze Sales" onClick={() => {setPage("ChangeOrderStatus");}}/>
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
        {page === 'ChangeOrderStatus'? <ChangeOrderStatus/>: null }
        {page === 'ManageOrders'? <ManageOrders/>: null }
       
      </main>
    </div>
  );
}

export default withRouter(SalesManager);
