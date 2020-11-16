import React from 'react'
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import {brown} from '@material-ui/core/colors';
import {withStyles, makeStyles} from '@material-ui/core/styles';

import Text from './text';
import Products from './products'


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(brown[500]),
    fontSize: 18,
    fontFamily: ['-apple-system'],
    backgroundColor: brown[500],
    minWidth: '200px',
    '&:hover': {
      backgroundColor: brown[700],
    },
    margin: theme.spacing(8),
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));


function Home(){
  const classes = useStyles();
  
  return (
    <div className='App'>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxHeight="4vh">
      
      </Box>

      <div>
        <ColorButton variant="contained" color="primary" className={classes.margin}>
          Clothing
        </ColorButton>
        <ColorButton variant="contained" color="primary" className={classes.margin}> 
            Home
        </ColorButton>
        <ColorButton variant="contained" color="primary" disableRipple className={classes.margin}>
          Health and Beauty
        </ColorButton>
        <ColorButton variant="contained" color="primary" disableRipple className={classes.margin}>
          Furniture
        </ColorButton>
      </div>

      <Products />
      <Text/>

    </div>
  )
}

export default Home;
