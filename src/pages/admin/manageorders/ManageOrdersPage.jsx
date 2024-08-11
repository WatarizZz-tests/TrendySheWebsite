import React from 'react';
import "./manageorders.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';
import Orders from '../../../admincomponents/orders/Orders';


const ManageOrdersPage = () => {
  return (
    <div className='manageorders-container'>
      <AdminTop/>
       <Orders/>
      <FooterAdmin/>
    </div>
  )
}

export default ManageOrdersPage
