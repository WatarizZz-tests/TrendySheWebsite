import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './checkoutstyle.css';
import { useCart } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import axiosInstance from '../../contexts/axiosInstance';

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (isOrderPlaced) {
      setSelectedCoupon(null);
      setIsOrderPlaced(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/user');
        window.location.reload();
      }, 5000);
    }
  }, [isOrderPlaced, navigate]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = selectedCoupon ? totalPrice - selectedCoupon.discount : totalPrice;

  const updateProductQuantity = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  const incrementQuantity = (index) => {
    const item = cartItems[index];
    const availableQuantity = item.selectedColor.quantity || 0;
    if (item.quantity < availableQuantity) {
      updateProductQuantity(index, item.quantity + 1);
    } else {
      alert('Quantité demandée dépasse la quantité disponible.');
    }
  };

  const decrementQuantity = (index) => {
    const item = cartItems[index];
    if (item.quantity > 1) {
      updateProductQuantity(index, item.quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Vous devez être connecté afin de placer une commande.');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.selectedColor.color, // Access color from selectedColor
          image: item.images[0],
        })),
        totalCost: discountedPrice,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        couponCode: selectedCoupon ? selectedCoupon.code : null
      };

      const response = await axiosInstance.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders`, orderData);

      if (response.status === 201) {
        setCartItems([]);
        setIsOrderPlaced(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Erreur lors du placement de votre commande');
    }
  };

  return (
    <div className="checkoutbigcontainer">
      <div className="checkout-container">
        <h1 className="checkout-title">Panier</h1>
        {showSuccessMessage && (
          <div className="success-message-commande">
            <h3>Commande placée avec succès, Merci de votre visite.</h3>
            <p>Redirection vers la page utilisateur...</p>
          </div>
        )}
        <table className="checkout-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={`${item._id}-${item.selectedColor.color}-${item.quantity}`}>
                <td><img src={item.images[0]} alt={item.name} className="checkout-product-image" /></td>
                <td>
                  <div className="checkout-product-details">
                    <h2 className="checkout-product-name">{item.name}</h2>
                    <p className="checkout-product-color">{item.selectedColor.color}</p>
                    <p className="checkout-product-description">{item.description}</p>
                  </div>
                </td>
                <td>{item.price}DA</td>
                <td>
                  <div className="quantity-control">
                    <button className="quantity-button" onClick={() => decrementQuantity(index)}>-</button>
                    <span className="quantity-display">
                      {item.quantity} (Disponible: {item.selectedColor.quantity - item.quantity})
                    </span>
                    <button className="quantity-button" onClick={() => incrementQuantity(index)}>+</button>
                  </div>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)}DA</td>
              </tr>
            ))}
          </tbody>

        </table>
        <div className="checkout-total">
          <h3>Total: {totalPrice.toFixed(2)}DA</h3>
          {user && user.coupons && user.coupons.length > 0 && (
            <div className="coupon-section">
              <label htmlFor="coupon-select">Appliquer un coupon : </label>
              <select
                id="coupon-select"
                value={selectedCoupon ? selectedCoupon.code : ''}
                onChange={(e) => {
                  const couponCode = e.target.value;
                  const coupon = user.coupons ? user.coupons.find(c => c.code === couponCode) : null;
                  setSelectedCoupon(coupon);
                }}
              >
                <option value="">Choix du coupon</option>
                {user.coupons && user.coupons
                  .filter(coupon => !coupon.isUsed) // Filter out used coupons
                  .map(coupon => (
                    <option key={coupon.code} value={coupon.code}>
                      {coupon.code} - {coupon.discount}DA off
                    </option>
                  ))
                }
              </select>
            </div>
          )}
          {selectedCoupon && (
            <div className="discounted-total">
              <h3>Prix après le coupon : {discountedPrice.toFixed(2)}DA</h3>
            </div>
          )}
        </div>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-form-group">
            <label htmlFor="firstName">Nom</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="lastName">Prénom</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div className="checkout-form-group">
            <label htmlFor="address">Adresse</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="checkout-button">Confirmer la commande</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
