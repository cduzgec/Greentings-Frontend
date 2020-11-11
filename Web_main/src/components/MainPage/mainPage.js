import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react'
import Box from "@material-ui/core/Box";

import Buttonx from '../button/button';
import Footer from '../footer/footer';
import CopyRight from '../copyRights/copyRight';

import Navbar from '../navbar/Navbar';
import Text from '../Text/text';
import Products from '../productsOnMainPage/products'

import About from '../About';
import Login from '../Login';
import Signup from '../Signup';
import ForgotPassword from "../ForgotPassword";
import Payment from "../Payment";
import Cart from "../Cart";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class mainPage extends Component {

    render() {
        const { classes } = this.props;
        return (
        <Router>
          <div>
            <Navbar/>
            <Switch>
              <Route path='/' exact component ={Home}/>
              <Route path='/about' component ={About}/>
              <Route path='/login' exact component ={Login}/>
              <Route path='/signup'  component ={Signup}/>
              <Route path='/forgotpassword'  component ={ForgotPassword}/>
              <Route path='/payment'  component ={Payment}/>
              <Route path='/cart' component= {Cart}/>
            </Switch>

            <Footer />

          </div>
        </Router>
        )
    }
}


const Home =() => (
  <div>

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxHeight="4vh">
    
    </Box>
    <Buttonx />
    <Products />
    <Text />
    
  </div>
)

export default mainPage;
