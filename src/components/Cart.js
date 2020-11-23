import React from 'react';
import '../App.css';
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
