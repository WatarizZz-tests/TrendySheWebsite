import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orders.css';
import axiosInstance from '../../contexts/axiosInstance';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('Pending');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openOrder, setOpenOrder] = useState(null);

  const [fakeRefetch, setFakeRefetch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders`, {
          params: {
            status,
            page,
            limit: 10, 
          }
        });
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [status, page, fakeRefetch]);

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) {
      return;
    }
    try {
      await axiosInstance.patch(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders/${id}/status`, { status: newStatus });
      // Update orders list without changing status tab
      setOrders(orders.map(order =>
        order._id === id ? { ...order, status: newStatus } : order
      ));
      setFakeRefetch("Just Reload Already plz :v");
        setTimeout(() => {
            setFakeRefetch(""); 
        }, 1000);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }
    try {
      await axiosInstance.delete(`${process.env.REACT_APP_RENDER_SERVER_TRENDYSHE}/orders/${id}`);
      // Update orders list without changing status tab
      setOrders(orders.filter(order => order._id !== id));
      setFakeRefetch("Just Reload Already plz :v");
        setTimeout(() => {
            setFakeRefetch(""); 
        }, 2000);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const printOrder = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<h1>Order Details</h1>`);
    printWindow.document.write(`<p>Name: ${order.firstName} ${order.lastName}</p>`);
    printWindow.document.write(`<p>Address: ${order.address}</p>`);
    printWindow.document.write(`<p>Phone: ${order.phone}</p>`);
    printWindow.document.write(`<p>Total Cost: $${order.totalCost}</p>`);
    printWindow.document.write(`<p>Items:</p>`);
    printWindow.document.write(`<ul>${order.items.map(item => `<li>${item.name}: $${item.price} x ${item.quantity}</li>`).join('')}</ul>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const toggleOrderDetails = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  return (
    <div className="orders-page">
      <div className="left-bar">
        <button onClick={() => setStatus('Pending')} className={status === 'Pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setStatus('Processing')} className={status === 'Processing' ? 'active' : ''}>Processing</button>
        <button onClick={() => setStatus('Shipped')} className={status === 'Shipped' ? 'active' : ''}>Shipped</button>
        <button onClick={() => setStatus('Delivered')} className={status === 'Delivered' ? 'active' : ''}>Delivered</button>
      </div>
      <div className="orders-table">
        {loading ? <p>Loading...</p> : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Cost</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="4">No orders found.</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td>{order._id}</td>
                        <td>${order.totalCost}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => toggleOrderDetails(order._id)}>
                            {openOrder === order._id ? '▲' : '▼'}
                          </button>
                          {status === 'Pending' && (
                            <button onClick={() => handleUpdateStatus(order._id, 'Processing')}>Set as Processing</button>
                          )}
                          {status === 'Processing' && (
                            <>
                              <button onClick={() => handleUpdateStatus(order._id, 'Shipped')}>Set as Shipped</button>
                              <button onClick={() => printOrder(order)}>Print</button>
                            </>
                          )}
                          {status === 'Shipped' && (
                            <>
                              <button onClick={() => handleUpdateStatus(order._id, 'Delivered')}>Set as Delivered</button>
                              <button onClick={() => printOrder(order)}>Print</button>
                            </>
                          )}
                          {status !== 'Delivered' && (
                            <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                      {openOrder === order._id && (
                        <tr className="order-details">
                          <td colSpan="4">
                            <div>
                              <h3>Order Details</h3>
                              <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                              <p><strong>Address:</strong> {order.address}</p>
                              <p><strong>Phone:</strong> {order.phone}</p>
                              <p><strong>Total Cost:</strong> ${order.totalCost}</p>
                              <p><strong>Items:</strong></p>
                              <ul className='admin-orders-details-list'>
                                {order.items.map(item => (
                                  <li key={item.productId}>
                                    <img src={item.image} alt={item.name} className='admin-order-product-img' />
                                    {item.name}: ${item.price} x {item.quantity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
            <div className="pagination orders-admin-pagination">
              <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
