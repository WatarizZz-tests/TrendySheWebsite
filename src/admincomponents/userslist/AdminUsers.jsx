import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./adminusers.css";
import axiosInstance from '../../contexts/axiosInstance';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [products, setProducts] = useState({});
  const [userOrders, setUserOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/users`, {
          params: { page: currentPage, limit: usersPerPage }
        });
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (!Array.isArray(users)) return;
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleToggle = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      try {
        const user = users.find(user => user._id === userId);
        if (user && user.wishlist.length > 0) {
          const productIds = user.wishlist.map(id => id.toString());
          const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/products/products-by-ids?ids=${productIds.join(',')}`);
          const productsData = response.data.reduce((acc, product) => {
            acc[product._id] = product;
            return acc;
          }, {});
          setProducts(productsData);
        }
        const ordersResponse = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders/${userId}`);
        setUserOrders(ordersResponse.data.reduce((acc, order) => {
          acc[order._id] = order;
          return acc;
        }, {}));
        setExpandedUser(userId);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/admin/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
        setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handlePromote = async (userId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to promote this user?')) {
      try {
        await axios.patch(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/admin/${userId}/promote`, {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isWorker: true } : user
        ));
        setFilteredUsers(filteredUsers.map(user => 
          user._id === userId ? { ...user, isWorker: true } : user
        ));
      } catch (error) {
        console.error('Error promoting user:', error);
      }
    };
    }
    

  const handleDemote = async (userId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to demote this user?')) {
      try {
        await axios.patch(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/admin/${userId}/demote`, {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isWorker: false } : user
        ));
        setFilteredUsers(filteredUsers.map(user => 
          user._id === userId ? { ...user, isWorker: false } : user
        ));
      } catch (error) {
        console.error('Error demoting user:', error);
      }
    }
   
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="admin-users">
      <div className="search-bar-admin-users">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.totalSpent.toFixed(2)}DA</td>
                    <td className='admin-users-action-buttons'>
                      <button 
                        className="dropdown-btn"
                        onClick={() => handleToggle(user._id)}
                      >
                        {expandedUser === user._id ? '▲' : '▼'}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                      {user.isWorker ? (
                        <button 
                          className="promote-btn"
                          onClick={() => handleDemote(user._id)}
                        >
                          Demote
                        </button>
                      ) : (
                        <button 
                          className="demote-btn"
                          onClick={() => handlePromote(user._id)}
                        >
                          Promote
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedUser === user._id && (
                    <tr>
                      <td colSpan="4">
                        <div className="user-details">
                          <h3>Coupons</h3>
                          <table className="user-coupons-table">
                            <thead>
                              <tr>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Used</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.coupons.map(coupon => (
                                <tr key={coupon.code}>
                                  <td>{coupon.code}</td>
                                  <td>{coupon.discount}DA</td>
                                  <td>{coupon.isUsed ? 'Yes' : 'No'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <h3>Wishlist</h3>
                          <table className="user-wishlist-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.wishlist.map(productId => (
                                <tr key={productId}>
                                  <td>{products[productId]?.name || 'Loading...'}</td>
                                  <td>{products[productId]?.price || 'Loading...'}DA</td>
                                  <td>{products[productId]?.description || 'Loading...'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p> Argent depensé sur la boutique : {user.totalSpent} DA </p>
                          <h3>Orders</h3>
                          <table className="user-orders-table">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Order Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.values(userOrders).map(order => (
                                <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.totalCost.toFixed(2)}DA</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-admin-users">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            className={`pagination-btn-admin-users ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
