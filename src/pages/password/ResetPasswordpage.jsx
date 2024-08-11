import React from 'react';
import "./resetstyle.css";
import TopHeader from '../../components/header/TopHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ResetPassword from '../../components/password/ResetPassword';

const ResetPasswordpage = () => {
  return (
    <div className='reset-passwordpage-container'>
      <TopHeader/>
      <Navbar/>
      <ResetPassword/>
      <Footer/>
    </div>
  )
}

export default ResetPasswordpage
