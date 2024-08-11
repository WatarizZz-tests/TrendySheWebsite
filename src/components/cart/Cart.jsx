import React from 'react';
import './cartstyle.css';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const Checkout = () => {
    navigate("/validation-commande");
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className={`cart-container ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Panier</h2>
        <button onClick={onClose} className="cart-close-button">X</button>
      </div>
      <div className="cart-body">
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id + item.selectedColor.color} className="cart-item">
                <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className='cart-nameandcolor'>
                    <span>{item.name}</span>
                    <span className="cart-item-color">{item.selectedColor.color}</span>
                    </div>
                  <div><span>{item.price}DA</span></div>
                  <div><span>Quantité: {item.quantity}</span></div>
                  <div><button onClick={() => removeFromCart(item._id, item.selectedColor.color)} className="cart-remove-button">X</button></div>
                  
                  
                  
                  
                  
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: {totalPrice.toFixed(2)} DA</h3>
            </div>
            <button onClick={clearCart} className="clear-cart-button">Vider le panier</button>
            <button className="checkout-button" onClick={() => Checkout()}>Finaliser la commande</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
