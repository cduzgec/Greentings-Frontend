import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import {useState,useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ShoppingCartTab from './shoppingCart';
import ShippingDetailsTap from './ShippingDetails';

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

const StepperCart = (props)=>{
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const[doesNotItemExist,setdoesNotItemExist] = useState(false);
  const history = useHistory();
  
  
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
  function CheckInput()
  { 
    if(activeStep === steps.length -1){
      if (localStorage.getItem("address_id")!==null){
        history.push('/payment');
        return true;
      }
      else {
        const re = /^[0-9\b]+$/; // num
        if (localStorage.getItem("postalCode")===null || (localStorage.getItem("postalCode")==="" || localStorage.getItem("postalCode").length >= 10 || !re.test(localStorage.getItem("postalCode")))){
          alert("Please check postal code. It should be max 10 digits number and not empty.");
          return false;
        }
        if(localStorage.getItem("phone_number")===null || localStorage.getItem("phone_number")==="" || localStorage.getItem("phone_number").length !== 11 || !re.test(localStorage.getItem("phone_number"))){
          alert("Please check phone number. It should be 11 digits number and not empty.");
          return false;
        }
        var re2= /^[A-Za-z]+$/; // strıng
        if(localStorage.getItem("firstName")===null|| localStorage.getItem("firstName")==="" || !re2.test(localStorage.getItem("firstName"))) {
          alert("Please check first name. It should be consisted of characters and not empty.");
          return false;
        }
        if(localStorage.getItem("lastName")===null || localStorage.getItem("lastName")==="" || !re2.test(localStorage.getItem("lastName"))) {
          alert("Please check last name. It should be consisted of characters and not empty.");
          return false;
        }
        if(localStorage.getItem("city")===null || localStorage.getItem("city")==="" || !re2.test(localStorage.getItem("city"))) {
          alert("Please check city name. It should be consisted of characters and not empty.");
          return false;
        }
        if(localStorage.getItem("country")===null|| localStorage.getItem("country")==="" || !re2.test(localStorage.getItem("country"))) {
          alert("Please check country name. It should be consisted of characters and not empty.");
          return false;
        }
        if(localStorage.getItem("addressLine")===null || localStorage.getItem("addressLine")===""){
          alert("Please check address line. It shouldn't be empty.");
          return false;
        }
        else
        {
          history.push('/payment');
          return true;
        } 
      } 
    }
    else{return false;}
  }

 
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
              
                  {activeStep === steps.length -1 ? 
                  <Button className={classes.link} variant="contained"  color="primary" onClick={CheckInput}>
                  Payment Page
                  </Button>
                   :  <Button variant="contained" disabled={ doesNotItemExist} color="primary" onClick={handleNext}>Next</Button>}
                
               
                
                
              </div>
            </div>
          )}
        </div>
      </div>
    )
}

export default StepperCart

