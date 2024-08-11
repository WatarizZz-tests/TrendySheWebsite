import React from 'react';
import { useNavigate } from 'react-router-dom';
import './optionsmenustyle.css'; 

const OptionsMenu = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='optionsmenu-container'>
      <div className='optionsmenu-item' onClick={() => handleNavigate('/admin/statistique')}>
        Statistiques
      </div>
      <div className='optionsmenu-item' onClick={() => handleNavigate('/admin/liste-utilisateurs')}>
        Liste des Utilisateurs
      </div>
      <div className='optionsmenu-item' onClick={() => handleNavigate('/admin/commandes')}>
        Gestion des Commandes
      </div>
      <div className='optionsmenu-item' onClick={() => handleNavigate('/admin/addproduct')}>
        Ajouter un Produit
      </div>
      <div className='optionsmenu-item' onClick={() => handleNavigate('/admin/gestionstock')}>
        Gestion de stock
      </div>
    </div>
  );
};

export default OptionsMenu;
