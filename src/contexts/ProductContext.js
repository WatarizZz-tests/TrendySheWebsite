import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryMap = {
    collier: 'necklaces',
    bagues: 'rings',
    bracelets: 'bracelets',
    parures: 'sets',
    foulards: 'scarves',
    sacs: 'bags',
    mules: 'mules',
    casquettes: 'caps',
    echarpes: 'scarves'
  };

  const fetchProducts = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    const mappedCategory = categoryMap[category] || category;
    try {
      const response = await axios.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/${mappedCategory}` );
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductByName = useCallback(async (category, productName) => {
    setLoading(true);
    setError(null);
    const mappedCategory = categoryMap[category] || category;
    try {
        const response = await axios.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/${mappedCategory}/${productName}` );
        setProduct(response.data);
    } catch (err) {
        setError(err.message);
        setProduct(null); 
    } finally {
        setLoading(false);
    }
}, []);


  return (
    <ProductContext.Provider value={{ products, product, fetchProducts, fetchProductByName, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
