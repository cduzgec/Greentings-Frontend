import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const OurButton = withStyles({
    root: {
      textDecoration: "none",
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 30,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#45b245',
      borderColor: '#45b245',
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
        backgroundColor: '#45b245',
        borderColor: '#45b245',
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

  export default OurButton;