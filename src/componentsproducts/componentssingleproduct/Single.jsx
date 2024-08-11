import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import "./singlestyle.css";

const Single = () => {
  const imgRef = useRef(null);
  const { category, productName } = useParams();
  const { product, fetchProductByName, loading, error } = useProduct();
  const { cartItems, addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isCareOpen, setCareOpen] = useState(false);
  const [isShippingOpen, setShippingOpen] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const encodedProductName = encodeURIComponent(productName);
      await fetchProductByName(category, encodedProductName);
    };
    fetchProduct();
  }, [category, productName, fetchProductByName]);

  useEffect(() => {
    if (selectedColor && product) {
      const cartQuantity = cartItems
        .filter(item => item._id === product._id && item.selectedColor.color === selectedColor.color)
        .reduce((total, item) => total + item.quantity, 0);
      setRemainingQuantity(selectedColor.quantity - cartQuantity);
    }
  }, [selectedColor, cartItems, product]);

  const handleMouseMove = (e) => {
    if (imgRef.current) {
      const { left, top, width, height } = imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const handleAddToCart = () => {
    if (product && selectedColor) {
      addToCart({ ...product, selectedColor, quantity });
      setQuantity(1);  
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value === '' ? '' : Math.min(remainingQuantity, Math.max(1, Number(e.target.value)));
    setQuantity(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="singleproduct-leftdiv">
        <div className="bigimage-container">
          <img
            ref={imgRef}
            src={mainImage || product.images[0]}
            alt={product.name}
            className='singleproduct-bigimage'
            onMouseMove={handleMouseMove}
          />
        </div>
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="thumbnail"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="singleproduct-rightdiv">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className='price-bold'>Price: {product.price}$</p>

        <div className="color-selection">
          <p>Select Color:</p>
          {product.colors.map((color, index) => (
            <label key={index}>
              <input
                type="radio"
                value={color.color}
                checked={selectedColor === color}
                onChange={() => setSelectedColor(color)}
                aria-label={`Select color ${color.color}`}
              />
              {color.color}
            </label>
          ))}
        </div>

        <div className="quantity-selection">
          <p>Quantity:</p>
          <input
            type="number"
            min="1"
            max={remainingQuantity}
            value={quantity}
            onChange={handleQuantityChange}
            aria-label="Quantity"
          />
          <p>{remainingQuantity} pieces available</p>
        </div>

        <button 
          onClick={handleAddToCart} 
          disabled={selectedColor && remainingQuantity <= 0}
          aria-label="Add to cart"
        >
          Add to Cart
        </button>

        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setSizeGuideOpen(!isSizeGuideOpen)}>
            <span>Size Guide</span>
            <span>{isSizeGuideOpen ? '▲' : '▼'}</span>
          </div>
          {isSizeGuideOpen && (
            <div className="dropdown-content">
              <table>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: 'darkgrey', color: 'white' }}>Size</th>
                    <th style={{ backgroundColor: 'darkgrey', color: 'white' }}>Inches</th>
                    <th style={{ backgroundColor: 'darkgrey', color: 'white' }}>CM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>32-33</td>
                    <td>81-84</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>34-35</td>
                    <td>86-89</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>36-37</td>
                    <td>91-94</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>38.5-40</td>
                    <td>98-102</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>42-44</td>
                    <td>107-112</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setCareOpen(!isCareOpen)}>
            <span>Care Instructions</span>
            <span>{isCareOpen ? '▲' : '▼'}</span>
          </div>
          {isCareOpen && (
            <div className="dropdown-content">
              <ul>
                <li>Hand wash with cold water</li>
                <li>Do not bleach</li>
                <li>Iron at low temperature</li>
                <li>Do not dry clean</li>
              </ul>
            </div>
          )}
        </div>

        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setShippingOpen(!isShippingOpen)}>
            <span>Shipping Information</span>
            <span>{isShippingOpen ? '▲' : '▼'}</span>
          </div>
          {isShippingOpen && (
            <div className="dropdown-content">
              <ul>
                <li>Standard shipping: 3-5 business days</li>
                <li>Express shipping: 1-2 business days</li>
                <li>International shipping available</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
