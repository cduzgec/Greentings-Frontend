import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';

import {useState,useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ShoppingCartTab from './shoppingCart';
import ShippingDetailsTap from './ShippingDetails';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttonsContainer:{
        marginLeft: "50px",
        color: "#93b53f"
    },
    link: {
      color: theme.palette.common.white,
    }
  }));


  function getSteps() {
    return ['Shopping Cart', 'Shiping Details'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <ShoppingCartTab />
        );
      case 1:
        return (
            <ShippingDetailsTap />
        );
      // case 2:
      //   return (
      //       <PaymentOptionsTab />
      //   );
      default:
        return 'Unknown stepIndex';
    }
  }

const StepperCart = ()=>{
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const[doesNotItemExist,setdoesNotItemExist] = useState(false);
  
  
  useEffect(() => {itemExists();}, [])
 
  const itemExists = async () => {            

      const data = await fetch(`/basket/${localStorage.getItem("user_id")}/`);

      const products= await data.json();
      
      if(products.length === 0)
      {
        setdoesNotItemExist(true);
      }
      else{
        setdoesNotItemExist(false);
      } 
  } 
  // function CheckInput()
  // { 
    
  //   var re = /^[0-9]*/; // num
  //   if (localStorage.getItem("postalCode")===null || (localStorage.getItem("postalCode")==="" || localStorage.getItem("postalCode").length >= 10 || !re.test(localStorage.getItem("postalCode")))){
  //     alert("Please check postal code. It should be max 10 digits number and not empty.");
  //     return false;
  //   }
  //   if(localStorage.getItem("phone_number")==="" || localStorage.getItem("phone_number").length !== 11 || !re.test(localStorage.getItem("phone_number"))){
  //     alert("Please check phone number. It should be 11 digits number and not empty.");
  //     return false;
  //   }
  //   var re2= /^[A-Za-z]+$/; // strıng
  //   if(localStorage.getItem("firstName")==="" || !re2.test(localStorage.getItem("firstName"))) {
  //     alert("Please check first name. It should be consisted of characters and not empty.");
  //     return false;
  //   }
  //   if(localStorage.getItem("lastName")==="" || !re2.test(localStorage.getItem("lastName"))) {
  //     alert("Please check last name. It should be consisted of characters and not empty.");
  //     return false;
  //   }
  //   if(localStorage.getItem("city")==="" || !re2.test(localStorage.getItem("city"))) {
  //     alert("Please check city name. It should be consisted of characters and not empty.");
  //     return false;
  //   }
  //   if(localStorage.getItem("country")==="" || !re2.test(localStorage.getItem("country"))) {
  //     alert("Please check country name. It should be consisted of characters and not empty.");
  //     return false;
  //   }
  //   if(localStorage.getItem("addressLine")===""){
  //     alert("Please check country name. It shouldn't be empty.");
  //     return false;
  //   }
  //   else
  //   { return true;}  
  // }

 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
    return (

        <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div >
              {getStepContent(activeStep)}
              <div className={classes.buttonsContainer}>
              <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
              <Button variant="contained" disabled={doesNotItemExist} color="primary" onClick={handleNext}>
                  {activeStep === steps.length -1 ? 
                 <Link href='/payment' color="primary" className={classes.link}>
                  Payment Page
                  </Link>
                   : 'Next'}
                
                </Button>
                
                
              </div>
            </div>
          )}
        </div>
      </div>
    )
}

export default StepperCart

