import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom'
import Logo from './images/Logo.png';
import SearchBar from './SearchBar'

const numberofcategories = 4;

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Emoji"'
    ].join(','),
  },
});

const buttonTheme = createMuiTheme({
  typography: {
    fontSize: 20,
    textDecoration: 'none'
  }
});

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
    fontFamily: ['Apple Color Emoji'],
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: 25,
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "transparent"
  },},
  image: {
    flex: 1,
    width: 500,
    height: 500,
    resizeMode: 'contain'
  },
  margin: {
    margin: theme.spacing(3),
  },
  paper: {
    width: 5,
    height: 5,
  },
  categorylink: {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: 20,
    marginLeft: "50px",
    width: 500,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginTop: "150px",
    justifyContent: "center",
  },
}));

const Navbar= () => {
  const classes = useStyles();
  const [categories, setCategory] = useState([]);
  
  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => {             /// try catchle
    const data = await fetch("/category/");

    const categories = await data.json();
    setCategory(categories);
  };
  //console.log(categories);    // {category_id: 1, category_name: "clothing"}
  //console.log(props);

  const [loginlogout, setLogin] = useState("Login");
  const [signup, setSignup] = useState("Signup");

  useEffect(() => { LoginFunc(); }, [localStorage.getItem("isLogged")]);
  const LoginFunc = () => {
    if (localStorage.getItem("isLogged") === "false")
      {setLogin("Login");
      setSignup("Signup")
    }
    else if (localStorage.getItem("isLogged") === "true")
      {setLogin("Logout");
      setSignup("My Account")}
  }

  return (
    <div className={classes.root}>
      <nav>
        <AppBar position="fixed" style={{ background: '#45b245', boxShadow: 'none', height: '150px' }}>
          <Toolbar style={{ paddingLeft: '1em', paddingRight: '2em', paddingBottom: '1em', paddingTop: '2em' }}>
            
            <ThemeProvider theme={theme}>
              <Typography className={classes.title} noWrap>
                <Link to='/'>
                  <img className={classes.image} alt={classes.image} className="logo" src={Logo} />
                </Link>
              </Typography>
            </ThemeProvider>

            <SearchBar/>

            <ThemeProvider theme={buttonTheme}>
              <Link className={classes.link} to='/about'>
                <Button className={classes.link} color="primary" >About</Button>
              </Link>
                <Button className={classes.link} color="primary"
                  onClick={() => {
                    if (localStorage.getItem("isLogged") === "false")
                      {window.location.replace(`/login`);}

                    else if (localStorage.getItem("isLogged") === "true")
                      {setLogin("Login");
                      console.log("NAVBAR 132")

                      localStorage.removeItem("isLogged")
                      localStorage.setItem("isLogged", false)

                      console.log(localStorage.getItem("user_id"))
                      localStorage.removeItem("user_id")
                      localStorage.setItem("user_id", null)
                      console.log(localStorage.getItem("user_id"))
                      

                      window.location.replace(`/`)
                      }
                    }}>
                  {loginlogout}
                </Button>
                
                <Button className={classes.link} color="primary"
                  onClick={() => {
                    if (localStorage.getItem("isLogged") === "false")
                      {window.location.replace(`/signup`);}

                    else if (localStorage.getItem("isLogged") === "true")
                    {window.location.replace(`/myaccount/${localStorage.getItem("user_id")}`);}}}>
                  {signup}
                </Button>

            </ThemeProvider>
            <Link className={classes.link} to='/cart'>
              <Button className={classes.link}> <ShoppingCartOutlinedIcon fontSize="large" /></Button>
            </Link>

          </Toolbar>
        </AppBar>

        <AppBar position="fixed" className={classes.appBar} style={{ background: '#069974', boxShadow: 'none', height: '50px' }}>
            <Toolbar style={{ paddingLeft: '5em', paddingRight: '5em', paddingBottom: '1em', paddingTop: '2em' }}>
            {categories.slice(0, numberofcategories).map(category => (
              <Button disableTouchRipple key= {category.category_id} className = {classes.link} color="primary" >
              <Link to={`/category/${category.category_id}`} variant="body2" className={classes.categorylink}>
                <p>{category.category_name}</p>
              </Link>
              </Button>
              ))}
            </Toolbar>
          </AppBar>

      </nav>
    </div>
  );
}


export default Navbar