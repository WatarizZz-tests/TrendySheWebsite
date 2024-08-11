import React, { useState, useContext } from 'react';
import "./admintopstyle.css";
import logoadmintop from '../../assets/trendyshe-logo-navbar.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminTop = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    return (
        <div className='admintop-container'>
            <div className="admintop-left">
                <span>{user && user.name}</span>
                <AdminPanelSettingsIcon />
            </div>
            <div className="admintop-middle">
                <img src={logoadmintop} alt="trendyshe" />
            </div>
            <div className="admintop-right">
                <LogoutIcon onClick={handleLogout} style={{ cursor: 'pointer' }} />
                <div className="menu-icon-container">
                    <MenuOpenIcon onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
                    {dropdownOpen && (
                        <div className="dropdown-menu-add-product">
                            <ul>
                                <li onClick={() => navigate('/admin')}>Page principale</li>
                                <li onClick={() => navigate('/admin/commandes')}>Commandes</li>
                                <li onClick={() => navigate('/admin/statistique')}>Statistiques</li>
                                <li onClick={() => navigate('/admin/liste-utilisateurs')}>Les utilisateurs</li>
                                <li onClick={() => navigate('/admin/addproduct')}>Ajouter un produit</li>
                                <li onClick={() => navigate('/admin/gestionstock')}>Gestion de stock</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTop;
