import React from 'react';
import "./adminproductsstyle.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import AddProduct from '../../../admincomponents/addproduct/AddProduct';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';

const AdminProducts = () => {
  return (
    <div className='Admin-products-container'>
        <AdminTop/>
        <AddProduct/>
        <FooterAdmin/>

      
    </div>
  )
}

export default AdminProducts
