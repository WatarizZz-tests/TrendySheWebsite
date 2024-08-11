import React from 'react';
import "./necklacestyle.css";
import TopHeader from '../../../components/header/TopHeader';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ProductsPage from '../../../componentsproducts/componentsallproducts/ProductsPage';
import ProductPresentation from '../../../componentsproducts/componentsallproducts/ProductPresentation';


const AllProducts = () => {
  return (
    <div className='necklace-container'>
      <TopHeader/>
      <Navbar/>
      <ProductsPage/>
      <ProductPresentation/> 
      <Footer/>
    </div>
  )
}

export default AllProducts
