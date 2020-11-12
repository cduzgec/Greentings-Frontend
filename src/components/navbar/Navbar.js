import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple, blue } from '@material-ui/core/colors';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from'react-router-dom'
import Logo from '../images/Logo.png';



const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Emoji"'
    ].join(','),
  },});
  const buttonTheme = createMuiTheme({
    typography: {
      fontSize: 18,
    },
  });

  const navStyle ={
    color: 'white',
    textDecoration: 'none'
  }


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    fontSize: 50,
    fontFamily:['Apple Color Emoji'],
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    //marginLeft: 20,
    flexGrow: 2,
    //marginRight: 20,
     //marginRight: theme.spacing(40),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //marginLeft: theme.spacing(20),
      //marginRight: theme.spacing(20),
      width: '5em',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },


  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '70ch',
      '&:focus': {
        width: '70ch',
      },
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav>
      <AppBar position="static" style={{ background: 'green', boxShadow: 'none', height: '100px'}}>
        <Toolbar style={{paddingLeft: '5em', paddingRight: '5em', paddingBottom: '1em', paddingTop: '1em'}}>
        <ThemeProvider theme={theme}>
          <Typography className={classes.title} noWrap>
          <Link to='/'>
            <img className="logo" src={Logo} />
          </Link>
          </Typography>
          </ThemeProvider>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for the product, brand or category..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          
            <ThemeProvider theme={buttonTheme}>
            <Link style= {navStyle} to='/about'>
              <Button style= {navStyle}>About</Button>
            </Link>
            <Link style= {navStyle} to='/login'>
              <Button color="inherit">Login</Button>
            </Link>
            <Link style= {navStyle} to='/signup'>
              <Button color="inherit">Sign-Up</Button>
            </Link>
            </ThemeProvider>
            <Link to='/cart'>
              <Button> <ShoppingCartOutlinedIcon fontSize="large" /></Button>
            </Link>
            
          
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
}
