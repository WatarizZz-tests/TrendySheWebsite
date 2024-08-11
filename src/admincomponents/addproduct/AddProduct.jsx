import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import "./addproductstyle.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebaseConfig';
import axiosInstance from '../../contexts/axiosInstance';


const generateUniqueFileName = (fileName) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); 
  return `${timestamp}-${fileName}`;
};

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const categories = [
    'necklaces', 'rings', 'bracelets', 'sets', 'bags', 'mules', 'caps', 'scarves'
  ];

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    colors: [],
    description: '',
    images: [],
    category: ''
  });
  const [newColor, setNewColor] = useState('');
  const [newColorQuantity, setNewColorQuantity] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddColor = () => {
    if (newColor && newColorQuantity) {
      setProductData({ 
        ...productData, 
        colors: [...productData.colors, { color: newColor, quantity: newColorQuantity }]
      });
      setNewColor('');
      setNewColorQuantity('');
    }
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newImagePreviews]);
    setProductData({ ...productData, images: [...productData.images, ...files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const uploadImage = async (file) => {
        const uniqueFileName = generateUniqueFileName(file.name); 
        const storageRef = ref(storage, `images/${uniqueFileName}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };
  
      const imageUrls = await Promise.all(productData.images.map(image => uploadImage(image)));

  
      const formData = {
        ...productData,
        images: imageUrls,
        colors: productData.colors
      };
  
      const response = await axiosInstance.post(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products`, formData);
  
      console.log(response.data);
  
      setSuccessMessage('Product added successfully');
      setTimeout(() => {
        setSuccessMessage('');
        setProductData({
          name: '',
          price: '',
          colors: [],
          description: '',
          images: [],
          category: ''
        });
        setImagePreviews([]);
      }, 5000);
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      setErrorMessage('Error adding product. Please try again.');
    }
  };
  

  return (
    <div className="add-product-container">
      <h1>Ajouter un article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Couleurs:</label>
          <div className="color-container">
            <input type="text" placeholder="Color" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
            <input type="number" placeholder="Quantity" value={newColorQuantity} onChange={(e) => setNewColorQuantity(e.target.value)} />
            <button className='addproduct-button' type="button" onClick={handleAddColor}>Ajouter une couleur</button>
          </div>
          <div className="colors-list">
            {productData.colors.map((variant, index) => (
              <span key={index}>{variant.color} (Qty: {variant.quantity})</span>
            ))}
          </div>
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={productData.description} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Categorie:</label>
          <select name="category" value={productData.category} onChange={handleInputChange} required>
            <option value="">Selectionnez une categorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleAddImages} />
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`preview ${index}`} />
            ))}
          </div>
        </div>
        <button type="submit">Ajouter</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
