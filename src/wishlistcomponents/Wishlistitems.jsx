import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './wishlistitemsstyle.css'; 
import ProductCard from '../componentsproducts/componentsallproducts/ProductCard';
import axiosInstance from '../contexts/axiosInstance';

const Wishlistitems = () => {
    const [wishlistedProducts, setWishlistedProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (token) {
                    const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/wishlist`);

                    // Fetch product details for wishlisted items
                    const wishlistedProductIds = response.data;
                    if (wishlistedProductIds.length > 0) {
                        const productResponses = await Promise.all(
                            wishlistedProductIds.map(id =>
                                axios.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/product/${id}`)
                            )
                        );
                        // Check if all products have the required fields
                        const products = productResponses.map(res => res.data);
                        setWishlistedProducts(products.filter(product => product._id && product.name && product.images));
                    } else {
                        setWishlistedProducts([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching wishlist products:', error);
            }
        };

        fetchWishlist();
    }, [token]);

    return (
        <div className="wishlist-page">
            <h1>Your Wishlist</h1>
            <div className="wishlist-products">
                {wishlistedProducts.length > 0 ? (
                    wishlistedProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};


export default Wishlistitems;

