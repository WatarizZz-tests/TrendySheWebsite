import React, { useState, useEffect } from 'react';
import "./managestock.css";
import axios from 'axios';
import StockProductCard from '../stockproductcard/StockProductCard';
import axiosInstance from '../../contexts/axiosInstance';

const ManageStock = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/all`, {
                params: { 
                    page: currentPage, 
                    limit: 10,
                    search: searchTerm  
                }
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm]);  

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);  
    };

    return (
        <div className="manage-stock-container">
            <div className="manage-stock-search">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="manage-stock-list">
                {products.map((product) => (
                    <StockProductCard key={product._id} product={product} onUpdate={fetchProducts} />
                ))}
            </div>
            <div className="manage-stock-pagination">
                <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageStock;
