import React, {useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import {brown} from '@material-ui/core/colors';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Text from './text';
import Products from './MainPageItems'
import {Link} from "react-router-dom"


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
    margin: theme.spacing(3),
  },
  paper: {
    width: 5,
    height: 5,
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff'
  },
}));

function Home(){
  const classes = useStyles();

  useEffect(() => {fetchItems();}, []);

  const[categories,setCategory] = useState([]);
 
  const fetchItems = async () => {             /// try catchle
      const data = await fetch("/category/");

      const categories= await data.json();
      setCategory(categories);};
      console.log(categories);

  const numberofcategories= 4;

  return (
    <div>
      <div >
        {categories.slice(0,numberofcategories).map(category => (
        <ColorButton variant="contained" key= {category.category_id} color="primary" disableRipple className={classes.margin}>
          <Link to = {`/${category.categories_name}`} variant="body2" className={classes.link}>
            <p>{category.category_name}</p>
          </Link>
        </ColorButton>
        ))}
        <Products />
        <Text/>
      </div>

    </div>
  )
}

export default Home;
