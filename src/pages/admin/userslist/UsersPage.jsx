import React from 'react';
import "./userspagestyle.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';
import AdminUsers from '../../../admincomponents/userslist/AdminUsers';

const UsersPage = () => {
  return (
    <div className='userspage-container'>
        <AdminTop/>
        <AdminUsers/>
        <FooterAdmin/>
      
    </div>
  )
}

export default UsersPage
