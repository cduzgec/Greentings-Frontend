import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const CartButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 30,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#008001',
    borderColor: '#008001',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#008001',
      borderColor: '#008001',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#008001',
      borderColor: '#008001',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

function Cart() {
  return (
    <div>
        <h1>Cart Page</h1>
        <CartButton href="/payment"> I want to pay </CartButton>
    </div>
  );
}

export default Cart;
