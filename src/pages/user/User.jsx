import React from 'react';
import "./userstyle.css";
import TopHeader from '../../components/header/TopHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import UserPage from '../../componentsuser/UserPage';

const User = () => {
  return (
    <div className='user-container'>
         <TopHeader/>
        <Navbar/>
        <UserPage/>
        <Footer/>
    </div>
  )
}

export default User
