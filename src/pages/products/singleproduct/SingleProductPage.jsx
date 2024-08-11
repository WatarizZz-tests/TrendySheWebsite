import React from 'react';
import "./singleproductpagestyle.css";
import TopHeader from '../../../components/header/TopHeader';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import Single from '../../../componentsproducts/componentssingleproduct/Single';

const SingleProductPage = () => {
  return (
    <div className='singleproductpage-container'>
        <TopHeader/>
        <Navbar/>
        <Single/>
        <Footer/>
      
    </div>
  )
}

export default SingleProductPage
