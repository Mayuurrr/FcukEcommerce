import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'stripe', label: 'Stripe', logo: true, logoSrc: 'stripe' },
  { id: 'razorpay', label: 'Razorpay', logo: true, logoSrc: 'razorpay' },
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const { navigate, backendURL, token, cartItems, setCartItems, getCartAmount, deliveryFee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  });

  const onChangeHandler = (e) => {
    setFormData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(p => p._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'stripe': {
          const responseStripe = await axios.post(backendURL + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        case 'razorpay': {
          const responseRazorpay = await axios.post(backendURL + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            const resScript = await loadRazorpayScript();
            if (!resScript) {
              toast.error("Razorpay SDK failed to load. Are you online?");
              break;
            }
            const { order } = responseRazorpay.data;
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: order.amount,
              currency: order.currency,
              name: 'AETHER Payment',
              description: 'Order Payment',
              order_id: order.id,
              handler: async (response) => {
                try {
                  const { data } = await axios.post(backendURL + '/api/order/verifyRazorpay', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  }, { headers: { token } });
                  if (data.success) {
                    setCartItems({});
                    navigate('/orders');
                  } else {
                    toast.error("Payment verification failed");
                  }
                } catch (err) {
                  toast.error(err.message);
                }
              },
              theme: { color: '#18181b' }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        }
        default: break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border border-zinc-200 px-3.5 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-300';
  const labelClass = 'text-[10px] tracking-widest uppercase text-zinc-400 font-medium block mb-1.5';

  return (
    <form onSubmit={onSubmitHandler} className='pt-10 pb-20 fade-up'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>

        {/* Delivery Information */}
        <div>
          <div className='mb-8'>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-1'>Step 1</p>
            <h2 className='text-2xl font-light text-zinc-900'>Delivery Information</h2>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className={labelClass}>First Name</label>
                <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} type='text' placeholder='John' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} type='text' placeholder='Doe' className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input required name='email' value={formData.email} onChange={onChangeHandler} type='email' placeholder='your@email.com' className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Street Address</label>
              <input required name='street' value={formData.street} onChange={onChangeHandler} type='text' placeholder='123 Main Street' className={inputClass} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className={labelClass}>City</label>
                <input required name='city' value={formData.city} onChange={onChangeHandler} type='text' placeholder='Bangalore' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input required name='state' value={formData.state} onChange={onChangeHandler} type='text' placeholder='Karnataka' className={inputClass} />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className={labelClass}>PIN Code</label>
                <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} type='text' placeholder='560034' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <input required name='country' value={formData.country} onChange={onChangeHandler} type='text' placeholder='India' className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input required name='phone' value={formData.phone} onChange={onChangeHandler} type='tel' placeholder='+91 98765 43210' className={inputClass} />
            </div>
          </div>
        </div>

        {/* Order Summary + Payment */}
        <div>
          <div className='mb-8'>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-1'>Step 2</p>
            <h2 className='text-2xl font-light text-zinc-900'>Order & Payment</h2>
          </div>

          <div className='bg-zinc-50 p-6 mb-6'>
            <CartTotal />
          </div>

          {/* Payment Methods */}
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4'>Payment Method</p>
            <div className='flex flex-col gap-2'>
              {PAYMENT_METHODS.map(pm => (
                <button
                  key={pm.id}
                  type='button'
                  onClick={() => setMethod(pm.id)}
                  className={`flex items-center gap-3 p-4 border transition-all text-left ${
                    method === pm.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${
                    method === pm.id ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'
                  }`} />
                  {pm.id === 'stripe' && assets.stripe_logo ? (
                    <img src={assets.stripe_logo} className='h-4' alt='Stripe' />
                  ) : pm.id === 'razorpay' && assets.razorpay_logo ? (
                    <img src={assets.razorpay_logo} className='h-4' alt='Razorpay' />
                  ) : (
                    <span className='text-sm text-zinc-700 font-medium'>{pm.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-8 py-4 bg-zinc-900 text-white text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;