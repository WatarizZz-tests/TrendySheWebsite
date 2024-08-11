import React from 'react';
import "./footerstyle.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="upperdiv-footer">
                <div className="footer-upperdiv-pt1">
                    <p className='title-footer'>CONTACT</p>
                    <ul className='footer-list'>
                        <li>Sidi Mabrouk sup, en face de Opium</li>
                        <li>Constantine(DZ)</li>
                        <li>0772192811</li>
                    </ul>
                </div>
                <div className="footer-upperdiv-pt2">
                    <p className='title-footer'>PRODUITS</p>
                    <ul className='footer-list footer-center-list'>
                        <Link><li>Colliers</li></Link>
                        <Link><li>Bagues</li></Link>
                        <Link><li>Bracelets</li></Link>
                        <Link><li>Parrures</li></Link>
                        <Link><li>Foulards</li></Link>
                    </ul>
                </div>
                <div className="footer-upperdiv-pt3">
                    <p className='title-footer'>NOUS SUIVRE</p>
                    <ul className='footer-list footer-list-flex'>
                        <Link><li><FacebookIcon /></li></Link>
                        <Link><li><InstagramIcon /></li></Link>
                        <Link><li><XIcon /></li></Link>
                        <Link><li><YouTubeIcon /></li></Link>
                    </ul>
                </div>
            </div>
            <div className="lowerdiv-footer">
                <p className="footer-text-copyright">Trendyshe, Tous droits reservés 2024.</p>
            </div>
        </div>
    )
}

export default Footer
