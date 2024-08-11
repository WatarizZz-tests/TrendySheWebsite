import React from 'react';
import "./checkoutpage.css";
import TopHeader from '../../components/header/TopHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Checkout from '../../componentsproducts/componentscheckout/Checkout';


const CheckoutPage = () => {
  return (
    <div className='singleproductpage-container'>
        <TopHeader/>
        <Navbar/>
        <Checkout/>
        <Footer/>
      
    </div>
  )
}

export default CheckoutPage
