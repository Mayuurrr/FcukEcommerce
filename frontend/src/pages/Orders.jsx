import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const STATUS_COLORS = {
  'Order Placed': 'bg-blue-100 text-blue-700',
  'Packing': 'bg-amber-100 text-amber-700',
  'Shipped': 'bg-purple-100 text-purple-700',
  'Out for delivery': 'bg-orange-100 text-orange-700',
  'Delivered': 'bg-green-100 text-green-700',
};

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    if (!token) { setLoading(false); return; }
    try {
      const response = await axios.post(backendURL + '/api/order/userOrders', {}, { headers: { token } });
      if (response.data.success) {
        const allItems = [];
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });
        setOrderData(allItems.reverse());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrderData(); }, [token]);

  return (
    <div className='pt-10 pb-20 fade-up'>
      <div className='mb-10'>
        <Title text1='My' text2='Orders' />
      </div>

      {loading ? (
        <div className='py-20 flex justify-center'>
          <div className='w-6 h-6 border border-zinc-200 border-t-zinc-900 rounded-full animate-spin' />
        </div>
      ) : orderData.length === 0 ? (
        <div className='py-20 text-center'>
          <p className='text-sm text-zinc-400 font-light'>No orders yet. Start shopping!</p>
        </div>
      ) : (
        <div className='flex flex-col gap-0'>
          {orderData.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row sm:items-center gap-5 py-5 border-b border-zinc-100'>
              {/* Image */}
              <div className='w-16 h-20 bg-zinc-50 flex-shrink-0 overflow-hidden'>
                <img className='w-full h-full object-cover' src={item.image[0]} alt={item.name} />
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-zinc-900 truncate mb-1'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-light'>
                  <span>{currency}{(item.price || 0).toLocaleString('en-IN')}</span>
                  <span className='w-1 h-1 bg-zinc-300 rounded-full' />
                  <span>Qty: {item.quantity}</span>
                  <span className='w-1 h-1 bg-zinc-300 rounded-full' />
                  <span>Size: {item.size}</span>
                </div>
                <div className='flex flex-wrap gap-3 mt-2 text-xs text-zinc-400 font-light'>
                  <span>Ordered {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className='w-1 h-1 bg-zinc-300 rounded-full self-center' />
                  <span>{item.paymentMethod}</span>
                  {item.payment && <span className='text-green-600'>• Paid</span>}
                </div>
              </div>

              {/* Status + Track */}
              <div className='flex items-center gap-4 sm:flex-col sm:items-end'>
                <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full tracking-wide ${STATUS_COLORS[item.status] || 'bg-zinc-100 text-zinc-600'}`}>
                  {item.status}
                </span>
                <button
                  onClick={loadOrderData}
                  className='text-xs text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-2'
                >
                  Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
