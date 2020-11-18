import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import OurButton from "./button.js";

function Cart() {
  return (
    <div>
        <h1>Cart Page</h1>
        <OurButton href="/payment"> I want to pay </OurButton>
    </div>
  );
}

export default Cart;
