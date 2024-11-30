import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {

      const response = await axios.post(backendURL + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-100 shadow-md rounded-lg p-4 flex justify-between items-start space-x-4"
            >
              {/* Parcel Icon */}
              <div>
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-12 h-12"
                />
              </div>

              {/* Order Details */}
              <div className="flex-1">
                <div className="text-sm text-gray-700 mb-2">
                  {order.items.map((item, index) => (
                    <span key={index} className="block">
                      {item.name} x {item.quantity} <span>({item.size})</span>
                      {index !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                <p className="font-bold text-gray-800">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="text-gray-600">{order.address.street}</p>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>

              {/* Order Summary */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Order Amount */}
              <div className="text-lg font-bold text-gray-800">
                {currency}
                {order.amount}
              </div>

              {/* Status Dropdown */}
              <div>
                <select onChange={(event) => statusHandler(event,order._id)} value={order.status} className="border border-gray-300 rounded-lg p-2 text-sm">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
