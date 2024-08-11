import React from 'react';
import "./mainpageadminstyle.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';
import OptionsMenu from '../../../admincomponents/menuoptions/OptionsMenu';

const MainPageAdmin = () => {
  return (
    <div className='mainpageadmin-container'>
      <AdminTop/>
      <OptionsMenu/>
      <FooterAdmin/>
    </div>
  )
}

export default MainPageAdmin
