import React, { useState, useEffect } from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import soldout from "../../assets/vector-sold-out.png";

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isSoldOut, setIsSoldOut] = useState(false); 
    const { addToCart } = useCart();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkWishlist = async () => {
            try {
                if (token) {
                    const response = await axios.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/wishlist` , {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const wishlistedProductIds = Array.isArray(response.data) ? response.data : [];
                    setIsWishlisted(wishlistedProductIds.includes(product._id.toString()));
                }
            } catch (error) {
                console.error('Error checking wishlist:', error);
            }
        };

        const checkStock = () => {

            const soldOut = product.colors.every(color => color.quantity === 0);
            setIsSoldOut(soldOut);
        };

        checkWishlist();
        checkStock();
    }, [product._id, token, product.colors]);

    const handleAddToCart = () => {
        const selectedColor = product.colors[0];
        addToCart({ ...product, selectedColor, quantity: 1 });
    };

    const handleWishlistToggle = async () => {
        try {
            const url = isWishlisted ? `${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/wishlist/remove` : `${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users/wishlist/add` ;
            const method = 'post';
            const data = { productId: product._id };

            await axios({ method, url, data, headers: { Authorization: `Bearer ${token}` } });

            setIsWishlisted(prev => !prev);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    const image = product.images[0];
    const productLink = `/products/${product.category}/${product.name.replace(/\s+/g, '-')}`;

    return (
        <div className='product-card'>
            {isSoldOut && (
                <div className='sold-out-overlay'>
                    <img src={soldout} alt='Sold Out' />
                </div>
            )}
            <button className='wishlist-button-card' onClick={handleWishlistToggle}>
                {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <Link to={productLink}>
                <img src={image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}DA</p>
            </Link>
            {!isSoldOut && (
                <button className='add-to-cart-button' onClick={handleAddToCart}>Ajouter au panier</button>
            )}
        </div>
    );
};

export default ProductCard;
