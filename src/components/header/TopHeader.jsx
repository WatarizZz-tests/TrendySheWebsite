import React from 'react';
import "./topheaderstyle.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
const TopHeader = () => {
    return (
        <div className='topheader-container'>
            <div className="topheaderleft">
                <a href="tel:0772192811" className="phone-link">
                    <PhoneIcon />
                    <span>0772192811</span>
                </a>
            </div>
            <div className="topheadermiddle">
                <span>Livraison gratuite pour tout achat de 5000da ou plus !</span>
            </div>
            <div className="topheaderright"><a href="mailto:trendysheconstantine@gmail.com" className="phone-link"><span>Nous envoyer un mail</span> <MailOutlineIcon /></a> </div>
        </div>
    )
}

export default TopHeader
