import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productspagestyle.css';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { useProduct } from '../../contexts/ProductContext';
import axiosInstance from '../../contexts/axiosInstance';


const ProductsPage = () => {
  const { category } = useParams();
  const { products, fetchProducts, loading, error } = useProduct();
  const [sortOption, setSortOption] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts]);

  const handleFilter = (products) => {
    let filtered = products;
    if (priceFilter.min) {
      filtered = filtered.filter(product => product.price >= priceFilter.min);
    }
    if (priceFilter.max) {
      filtered = filtered.filter(product => product.price <= priceFilter.max);
    }
    return filtered;
  };

  const handleSort = (products) => {
    let sorted = [...products];
    if (sortOption === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const filteredProducts = handleFilter(products);
  const sortedProducts = handleSort(filteredProducts);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleProductClick = (product) => {
    const productName = product.name.toLowerCase().replace(/ /g, '-');
    navigate(`/products/${category}/${productName}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products for {category}</h1>
        <div className="sort-filter">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <div className="price-filter">
            <input
              type="number"
              placeholder="Min price"
              value={priceFilter.min}
              onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max price"
              value={priceFilter.max}
              onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isWishlisted={wishlistedProducts.includes(product._id)}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedProducts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;
