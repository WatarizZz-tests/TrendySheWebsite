import React, { useState } from 'react';
import axiosInstance from '../../contexts/axiosInstance';

const StockProductCard = ({ product, onUpdate }) => {
  const [price, setPrice] = useState(product.price);
  const [newColor, setNewColor] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const handlePriceChange = async () => {
    try {

      await axiosInstance.put(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/product/${product._id}`, 
        { price }
      );
      onUpdate();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handleAddColor = async () => {
    const confirm = window.confirm('Are you sure you want to add this color and quantity?');

    if (confirm) {
      try {

        await axiosInstance.put(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/product/${product._id}`, 
          { colors: [...product.colors, { color: newColor, quantity: Number(newQuantity) }] }
        );
        setNewColor('');
        setNewQuantity('');
        onUpdate();
      } catch (error) {
        console.error('Error adding color:', error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');

    if (confirm) {
      try {

        await axiosInstance.delete(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/product/${product._id}`
        );
        onUpdate();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="stock-product-card">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: {price}DA</p>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onBlur={handlePriceChange}
      />
      <div className="stock-product-card-colors">
        {product.colors.map((color, index) => (
          <div key={index} className="stock-product-card-color">
            <span>{color.color}: {color.quantity}</span>
            <input
              className='stock-current-quantity'
              type="number"
              defaultValue={color.quantity}
              onBlur={async (e) => {
                try {
                  await axiosInstance.put(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/product/${product._id}`, 
                    { colors: product.colors.map(c => c.color === color.color ? { ...c, quantity: e.target.value } : c) }
                  );
                  onUpdate();
                } catch (error) {
                  console.error('Error updating quantity:', error);
                }
              }}
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="New color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />
        <button onClick={handleAddColor}>Actualiser</button>
        <button onClick={handleDeleteProduct} className='stock-management-delete-product-btn'>Delete Product</button>
      </div>
    </div>
  );
};

export default StockProductCard;
