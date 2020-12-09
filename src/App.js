import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
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
import Categories from "./components/Categories";
import SearchPage from "./components/SearchPage";
import Invoice from "./components/Invoice";

export default function App () {

  return (
  
    <BrowserRouter>
      <div className="App" >
      <Route component={Navbar}/>
        <Switch> 
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/forgotconfirmation' component={ForgotConfirmation} />
          <Route path='/changepassword' component={ChangePassword} />
          <Route path='/signup' component={Signup} />
          <Route path='/emailconfirmation/:user_id' component={EmailConfirmation} />
          <Route path='/payment' component={Payment} />
          <Route path='/cart' component={Cart} />
          <Route path='/myaccount/:user_id' component={UserPage} />
          <Route path='/product/:product_id' component={ProductDetail} />
          <Route path='/category/:categories_id' component={Categories} />
          <Route path='/search/:search' component={SearchPage} />
          <Route path='/invoice/:order_id' component={Invoice} />
          <Route path='*' component={() => <h1>ERROR 404: SORRY BUT WE DON'T HAVE THIS PAGE :( </h1> } />
        </Switch>
        <Footer />

      </div>
    </BrowserRouter>

  )
}
