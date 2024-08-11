import React from 'react'
import TopHeader from '../../components/header/TopHeader';
import "./mainstyle.css";
import Navbar from '../../components/navbar/Navbar';
import Video from '../../components/video/Video';
import PresentationCards from '../../components/storepresentation/PresentationCards';
import Presentationsite from '../../components/presentationsite/Presentationsite';
import Footer from '../../components/footer/Footer';

const Main = () => {
  return (
    <div className='main-container'>
        <TopHeader/>
        <Navbar/>
        <Video/>
        <PresentationCards/>
        <Presentationsite/>
        <Footer/>
      
       
      
    </div>
  )
}

export default Main
