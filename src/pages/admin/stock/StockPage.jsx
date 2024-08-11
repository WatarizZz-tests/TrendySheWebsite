import React from 'react';
import "./stockpage.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';
import ManageStock from '../../../admincomponents/managestocks/ManageStock';

const StockPage = () => {
  return (
    <div className='stockpage-container'>
      <AdminTop/>
      <ManageStock/>
      <FooterAdmin/>
    </div>
  )
}

export default StockPage
