import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbarstyle.css';
import logonavbar from '../../assets/trendyshe-logo-navbar.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Cart from '../cart/Cart';
import Badge from '@mui/material/Badge';
import { useCart } from '../../contexts/CartContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from '../popup/Login';
import { AuthContext } from '../../contexts/AuthContext';
import { useProduct } from '../../contexts/ProductContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const { fetchProducts } = useProduct();

  const categoryMap = {
    collier: 'necklaces',
    bagues: 'rings',
    bracelets: 'bracelets',
    parures: 'sets',
    foulards: 'scarves',
    sacs: 'bags',
    mules: 'mules',
    casquettes: 'caps',
    echarpes: 'scarves'
  };


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  const handleCategoryClick = async (category) => {
    const mappedCategory = categoryMap[category] || category;
    await fetchProducts(mappedCategory);
    navigate(`/products/${category}`);
    closeMenu();
  };

  const handleLoginClick = () => {
    if (user) {
      navigate('/user');
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <div className='navbar-container'>
      <div className="navbar-logo-left">
        <Link to="/">
          <img src={logonavbar} alt="trendyshe" />
        </Link>
      </div>
      <div className={`navbar-menu-middle ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-user-menu-right-sm smallscreen-nav-items">
          {user && <LogoutIcon className='icons-menu-smallscreen-a style-username-icon' onClick={handleLogout} />}
          <PermIdentityIcon className='icons-menu-smallscreen-a style-username-icon' onClick={handleLoginClick} />
          <Link className='icons-menu-smallscreen-a' to=""><LocationOnIcon /></Link>
          <Link className='icons-menu-smallscreen-a' to="/user/wishlist"><FavoriteBorderIcon /></Link>
        </div>
        <ul className="navbar-menu">
          <li onClick={() => handleCategoryClick('collier')}>COLLIERS</li>
          <li onClick={() => handleCategoryClick('bagues')}>BAGUES</li>
          <li onClick={() => handleCategoryClick('bracelets')}>BRACELETS</li>
          <li onClick={() => handleCategoryClick('parures')}>PARURES</li>
          <li className='smallscreen-nav-items' onClick={() => handleCategoryClick('foulards')}>Foulards</li>
          <li className='smallscreen-nav-items' onClick={() => handleCategoryClick('sacs')}>Sacs</li>
          <li className='smallscreen-nav-items' onClick={() => handleCategoryClick('mules')}>Mules</li>
          <li className='smallscreen-nav-items' onClick={() => handleCategoryClick('casquettes')}>Casquettes</li>
          <li className='smallscreen-nav-items' onClick={() => handleCategoryClick('echarpes')}>Echarpes</li>
          <li className="dropdown smmalscreen-hidden" onClick={toggleDropdown}>
            AUTRES
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleCategoryClick('foulards')}>Foulards</li>
                <li onClick={() => handleCategoryClick('sacs')}>Sacs</li>
                <li onClick={() => handleCategoryClick('mules')}>Mules</li>
                <li onClick={() => handleCategoryClick('casquettes')}>Casquettes</li>
                <li onClick={() => handleCategoryClick('echarpes')}>Echarpes</li>
              </ul>
            )}
          </li>
        </ul>
        <div className="close-menu-icon" onClick={closeMenu}>
          <CloseIcon />
        </div>
        <div className="navbar-topheadermodif">
          <a href="tel:0772192811" className='mini-nav-link'>
            <PhoneIcon />
            <span>Appeler</span>
          </a>
          <div className="topheaderright"><a href="mailto:trendysheconstantine@gmail.com" className="phone-link"><span>Email</span> <MailOutlineIcon /></a> </div>
        </div>
        <div className="mini-nav-announcement">
          <span>Livraison gratuite pour tout achat de 5000da ou plus !</span>
        </div>
      </div>
      <div className="navbar-user-menu-right">
        {user && <LogoutIcon className='icons-menu-smallscreen style-username-icon' onClick={handleLogout} />}
        <PermIdentityIcon className='icons-menu-smallscreen style-username-icon' onClick={handleLoginClick} />
        <Link className='icons-menu-smallscreen' to=""><LocationOnIcon /></Link>
        <Link className='icons-menu-smallscreen' to="/user/wishlist"><FavoriteBorderIcon /></Link>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon onClick={toggleCart} className='Cart-icon-navbar' />
        </Badge>
        <Cart isOpen={isCartOpen} onClose={toggleCart} />
        <div className="menu-icon" onClick={toggleMenu}>
          <MenuIcon />
        </div>
      </div>
      <Login isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
    </div>
  );
}

export default Navbar;
