import React, { Component } from 'react'
import './App.css';
import { Divider } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import logo from './logo.svg';


import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from "./components/ForgotPassword";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import MainPage from './components/MainPage/mainPage';

class App extends Component {
  render() {
    return (
       <div className='App'>
         <MainPage/>
      </div>
    )
  }
}

export default App;
