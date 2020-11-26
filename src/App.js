import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import { useHistory } from "react-router-dom";

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

import { ConfetchContext } from 'react-confetch'

const globalFetchConfig = {timeoutDuration: 1000, }

function App(){
  return (
    <ConfetchContext.Provider value={globalFetchConfig}>
    <Router>
      <div className="App" >
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/login' exact component={Login} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/forgotconfirmation' component={ForgotConfirmation} />
          <Route path='/changepassword' component={ChangePassword} />
          <Route path='/signup' component={Signup} />
          <Route path='/emailconfirmation/:user_id' component={EmailConfirmation} />
          <Route path='/payment' component={Payment} />
          <Route path='/cart' component={Cart} />
          <Route path='/userpage/:user_id' component={UserPage} />
          <Route path='/product/:product_id' component={ProductDetail} />
          <Route path='/category/:categories_id' component={Categories} />
        </Switch>
        <Footer />

      </div>
    </Router>
    </ConfetchContext.Provider>
  )
}


export default App;
