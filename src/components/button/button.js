import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, yellow,brown} from '@material-ui/core/colors';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 30,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '##008001',
    borderColor: '##008001',
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
      backgroundColor: '##008001',
      borderColor: '##008001',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '##008001',
      borderColor: '##008001',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

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
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: brown,
  },
});

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
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

);
}
