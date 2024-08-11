import React from 'react';
import "./wishliststyle.css";
import TopHeader from '../../components/header/TopHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Wishlistitems from '../../wishlistcomponents/Wishlistitems';

const Wishlist = () => {
  return (
    <div className='wishlist-page-container'>
            <TopHeader/>
      <Navbar/>
      <Wishlistitems/>
      <Footer/>
    </div>
  )
}

export default Wishlist
