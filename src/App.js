import React, { Component } from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from "./components/ForgotPassword";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import UserPage from "./components/UserPage";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotConfirmation from "./components/ForgotConfirmation";
import ChangePassword from "./components/ChangePassword";
import ProductDetail from "./components/ProductDetail";

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
    <Router>
      <div className="App" >
      <Navbar/>
      
        <Switch>
          <Route path='/' exact component ={Home}/>
          <Route path='/about' component ={About}/>
          <Route path='/login' exact component ={Login}/>
          <Route path='/forgotpassword'  component ={ForgotPassword}/>
          <Route path='/forgotconfirmation' component= {ForgotConfirmation}/>
          <Route path='/changepassword' component= {ChangePassword}/>
          <Route path='/signup'  component ={Signup}/>
          <Route path='/emailconfirmation' component= {EmailConfirmation}/>
          <Route path='/payment'  component ={Payment}/>
          <Route path='/cart' component= {Cart}/>
          <Route path='/userpage' component= {UserPage}/>
          <Route path='/product/:product_id'  component ={ProductDetail}/>
        </Switch>
        <Footer />

      </div>
    </Router>
    )
  }
}

export default App;
