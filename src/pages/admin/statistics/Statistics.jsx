import React from 'react';
import "./statisticstyle.css";
import AdminTop from '../../../admincomponents/headeradmin/AdminTop';
import FooterAdmin from '../../../admincomponents/footeradmin/FooterAdmin';
import StatisticsPage from '../../../admincomponents/statisticspage/StatisticsPage';

const Statistics = () => {
  return (
    <div className='statistics-container'>
        <AdminTop/>
        <StatisticsPage/>
        <FooterAdmin/>
      
    </div>
  )
}

export default Statistics
