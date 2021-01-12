import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

import ProtectedRoute from "./components/UserProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import SalesProtectedRoute from "./components/SalesProtectedRoute";
import ProductProtectedRoute from "./components/ProductProtectedRoute";

import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from "./components/ForgotPassword";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotConfirmation from "./components/ForgotConfirmation";

import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Invoice from "./components/Invoice";

import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import ProductDetail from "./components/ProductDetail";
import SearchPage from "./components/SearchPage";
import ML from './components/ML';

import Footer from "./components/footer";
import History from './components/footerHistory';
import Privacy from './components/footerPrivacy';
import Terms from './components/footerTerms';
import Team from './components/team';
import Contact from './components/footerContact';

import Edit from "./components/editProduct";

import UserPage from "./components/UserPage";
import UserOrders from './components/UserOrders';
import UserComments from './components/UserComments';
import UserInfo from './components/UserInfo';
import ChangeInfo from './components/ChangeInfo';
import ChangePassword from './components/ChangePassword';
import OrderInfo from './components/UserOrderInfo';
import UserManageAddress from './components/UserManageAddress';

import SalesManager from "./components/SalesManager";
import OrderEdit from './components/managerOrderEdit';
import OrderInfoForManager from './components/managerOrderDetail';
import AddressChange from './components/salesManagerAddressChange';
import Campaigns from './components/salesManagerCampaigns';
import SalesManagerInfoChange from './components/salesManagerChangeInfo';
import SalesManagerPasswordChange from './components/salesManagerChangePassword';
import SalesManagerOrders from './components/salesManagerMyOrders';
import SalesManagerComments from './components/salesManagerMyComments';
import SalesManagerInfo from './components/salesManagerMyInfo';
import AnalyseSales from './components/salesManagerCharts';
import SeeCampaigns from './components/salesManagerSeeCampaigns';
import CancelOrders from './components/salesManagerOrderCancellation';
import CampaignProducts from './components/campaignProducts';

import ProductManager from "./components/ProductManager";
import ProductManagerPasswordChange from './components/productManagerChangePassword';
import ProductManagerInfoChange from './components/productManagerChangeInfo';
import ProductManagerInfo from './components/productManagerMyInfo';
import ProductManagerComments from './components/productManagerMyComments';
import ProductManagerOrders from './components/productManagerMyOrders';
import ProductManagerCommentApproval from './components/productManagerCommentApproval';
import ProductManagerAddProduct from './components/productManagerAddProduct';
import ProductManagerEditProduct from './components/productManagerProducts';


export default function App () {

  function hasVisitedAlert(){
    if( localStorage.getItem("hasVisited") === null ){
      localStorage.setItem("hasVisited", true)
      localStorage.setItem("user_id", "0")
      alert("Hi welcome to our awesome website. We are using your localstorage for keeping your information. Dont worry. You are safe with us. Have fun!!"
      )
  }}

  useEffect(() => { hasVisitedAlert();}, []);

  return (

    <BrowserRouter>
      <div className="App" >
      <Route component={Navbar}/>
        <Switch> 
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/team' component={Team} />
          <Route path='/history' component={History} />
          <Route path='/privacypolicy' component={Privacy} />
          <Route path='/termsofuse' component={Terms} />
          <Route path='/contact' component={Contact} />

          <Route path='/payment' component={Payment} />
          <Route path='/cart' component={Cart} />
          <Route path='/product/:product_id' component={ProductDetail} />
          <Route path='/category/:categories_id' component={Categories} />
          <Route path='/search/:search' component={SearchPage} />
          <Route path='/invoice/:order_id' component={Invoice} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/forgotconfirmation/:user_id' component={ForgotConfirmation} />

          <ProtectedRoute path='/emailconfirmation/:user_id' component={EmailConfirmation} />
          <ProtectedRoute path='/foryou/:user_id' component={ML} />

          <UserProtectedRoute path='/myaccount/:user_id' component={UserPage} />
          <UserProtectedRoute path='/myorders/:user_id' component={UserOrders} />
          <UserProtectedRoute path='/mycomments/:user_id' component={UserComments} />
          <UserProtectedRoute path='/myinformation/:user_id' component={UserInfo} />
          <UserProtectedRoute path='/changeinformation/:user_id' component={ChangeInfo} />
          <UserProtectedRoute path='/changepassword/:user_id' component={ChangePassword} />
          <UserProtectedRoute path='/myaddresses/:user_id' component={UserManageAddress} />

          <Route path='/orderdetail/:order_id' component={OrderInfo} />
          <Route path='/editorder' component={OrderEdit} />
          <Route path='/addressChange' component={AddressChange} />
          <Route path='/adminOrderdetail/:order_id' component={OrderInfoForManager} />
          <Route path='/editCampaigns' component={Campaigns} />

          <SalesProtectedRoute path='/salesmanager/:user_id' component={SalesManager} />
          <Route path='/analyzeSales' component={AnalyseSales} />
          <Route path='/existingCampaigns' component={SeeCampaigns} />
          <Route path='/orderCancellation' component={CancelOrders} />
          <SalesProtectedRoute path='/SalesManagerChangeInfo/:user_id' component={SalesManagerInfoChange} />
          <SalesProtectedRoute path='/SalesManagerChangePassword/:user_id' component={SalesManagerPasswordChange} />
          <SalesProtectedRoute path='/SalesManagerMyOrders/:user_id' component={SalesManagerOrders} />
          <SalesProtectedRoute path='/SalesManagerMyComments/:user_id' component={SalesManagerComments} />
          <SalesProtectedRoute path='/SalesManagerMyInfo/:user_id' component={SalesManagerInfo} />
          <Route path='/campaignProducts/:campaign_id' component={CampaignProducts} />

          <ProductProtectedRoute path='/productmanager/:user_id' component={ProductManager} />
          <ProductProtectedRoute path='/ProductManagerChangePassword/:user_id' component={ProductManagerPasswordChange} />
          <ProductProtectedRoute path='/ProductManagerChangeInfo/:user_id' component={ProductManagerInfoChange} />
          <ProductProtectedRoute path='/ProductManagerMyInfo/:user_id' component={ProductManagerInfo} />
          <ProductProtectedRoute path='/ProductManagerMyComments/:user_id' component={ProductManagerComments} />
          <ProductProtectedRoute path='/ProductManagerMyOrders/:user_id' component={ProductManagerOrders} />
          <Route path='/commentApproval' component={ProductManagerCommentApproval} />
          <Route path='/addProduct' component={ProductManagerAddProduct} />
          <Route path='/editProducts' component={ProductManagerEditProduct} />


          <Route path='*' component={() => <h1>ERROR 404: SORRY BUT WE DON'T HAVE THIS PAGE </h1> } />
        </Switch>
        <Footer />

      </div>
    </BrowserRouter>
    
  )
}