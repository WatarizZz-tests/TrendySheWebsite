import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './statisticpage.css';
import axiosInstance from '../../contexts/axiosInstance';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Orders Over Time',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    });
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [latestOrders, setLatestOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [period, setPeriod] = useState('days'); 

    useEffect(() => {

        const fetchData = async () => {
            try {


                const [statsRes, ordersRes] = await Promise.all([
                    axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/admin/stats`, {
                        params: { period } 
                    }),
                    axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/admin/orders`, {
                        params: { page }
                    })
                ]);

                const { data } = statsRes;
                setTotalSpent(data.totalSpent);
                setTotalOrders(data.totalOrders);



                setChartData({
                    labels: data.dates || [],
                    datasets: [{
                        label: 'Orders Over Time',
                        data: data.values || [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }]
                });

                setLatestOrders(ordersRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, period]);

    const handleNextPage = () => setPage(prevPage => prevPage + 1);
    const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));
    const handlePeriodChange = (newPeriod) => setPeriod(newPeriod); 

    return (
        <div className='statistics-container-component'>
            <div className='chart-container'>
                <div className='graph'>
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className='summary'>
                    <div className='summary-item'>
                        <h3>Cout total :</h3>
                        <p>{totalSpent.toFixed(2)}DA</p>
                    </div>
                    <div className='summary-item'>
                        <h3>Nombre total des commandes :</h3>
                        <p>{totalOrders}</p>
                    </div>
                </div>
            </div>
            <div className='chart-controls'>
                <button className='chart-controls-button' onClick={() => handlePeriodChange('days')}>Par jour</button>
                <button className='chart-controls-button' onClick={() => handlePeriodChange('months')}>Par mois</button>
            </div>
            <div className='latest-orders'>
                <h2>Dernieres commandes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>client</th>
                            <th>Cout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestOrders.length > 0 ? (
                            latestOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userId.name}</td>
                                    <td>{order.totalCost.toFixed(2)}DA</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Aucune commande disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='pagination'>
                    <button onClick={handlePreviousPage} disabled={page === 1}>Precedent</button>
                    <button onClick={handleNextPage}>Prochain</button>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
