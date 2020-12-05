import React, { useEffect, useState, useRef } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Emoji"'
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: -100,
    flexGrow: 2,
    marginRight: 100,
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
    //marginLeft: 420,
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


const SearchBar = props => {
  const classes = useStyles();
  const searchRef = useRef('') 

  const [search, setSearch] = useState("");

  useEffect(() => {if (search) {console.log(search);}}, [search]);

  return (
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
        inputRef={searchRef}
        onChange={e => setSearch(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}


export default SearchBar