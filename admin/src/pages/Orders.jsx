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
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='p-8 fade-up'>
      {/* Page Title */}
      <h1 className='text-xl font-light text-zinc-900 mb-8'>Orders</h1>

      <div className='flex flex-col gap-3'>
        {orders.length === 0 ? (
          <p className='text-sm text-zinc-400 py-12 text-center border border-zinc-100'>
            No orders found.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className='border border-zinc-100 p-5 grid grid-cols-[auto_1fr_auto_auto] gap-6 items-start hover:bg-zinc-50 transition-colors duration-150'
            >
              {/* Parcel Icon */}
              <div className='pt-0.5'>
                <img
                  src={assets.parcel_icon}
                  alt='Parcel'
                  className='w-8 h-8 opacity-60'
                />
              </div>

              {/* Order Items + Address */}
              <div>
                <div className='mb-2'>
                  {order.items.map((item, index) => (
                    <p key={index} className='text-sm text-zinc-700 font-medium leading-relaxed'>
                      {item.name} × {item.quantity}
                      <span className='text-zinc-400 font-normal ml-1'>({item.size})</span>
                      {index !== order.items.length - 1 && (
                        <span className='text-zinc-300'>,</span>
                      )}
                    </p>
                  ))}
                </div>
                <div className='text-xs text-zinc-400 space-y-0.5 mt-1'>
                  <p className='font-medium text-zinc-500'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{' '}
                    {order.address.country} — {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Meta */}
              <div className='text-xs text-zinc-500 space-y-0.5 min-w-[120px]'>
                <p>Items: <span className='text-zinc-700'>{order.items.length}</span></p>
                <p>Method: <span className='text-zinc-700'>{order.paymentMethod}</span></p>
                <p>
                  Payment:{' '}
                  <span className={order.payment ? 'text-emerald-600' : 'text-amber-500'}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>
                <p>Date: <span className='text-zinc-700'>{new Date(order.date).toLocaleDateString()}</span></p>
                <p className='text-base font-medium text-zinc-900 mt-2'>
                  ₹{order.amount}
                </p>
              </div>

              {/* Status Select */}
              <div>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className='border border-zinc-200 px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:border-zinc-900 transition-colors duration-150 cursor-pointer'
                >
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivery'>Out for delivery</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
