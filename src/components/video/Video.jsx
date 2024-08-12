import React from 'react';
import './videostyle.css';
import videoSrc from '../../assets/videomainpage.mp4';
import fallback from '../../assets/videofallback.png';
const Video = () => {
  return (
    <div className='video-container'>
      <video src={videoSrc} autoPlay loop muted playsinline type="video/mp4" poster={fallback} className='background-video'></video>
      <div className='overlay'></div>
      <div className='content'>
        <h1>Crafted with Love, Worn with Confidence.</h1>
      </div>
    </div>
  );
}

export default Video;
