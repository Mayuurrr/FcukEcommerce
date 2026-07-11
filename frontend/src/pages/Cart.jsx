import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import ProductItem from '../components/ProductItem';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [giftNote, setGiftNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const subtotal = getCartAmount();
  const freeShippingThreshold = 2500;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({ _id: itemId, size, quantity: cartItems[itemId][size] });
          }
        }
      }
      setCartData(tempData);

      // Select 4 random best sellers for recommendations
      const best = products.filter(p => p.bestSeller).slice(0, 4);
      setRecommendations(best);
    }
  }, [cartItems, products]);

  return (
    <div className='pt-10 pb-20 fade-up select-none'>
      <div className='mb-8 border-b border-zinc-100 pb-4'>
        <Title text1='Shopping' text2='Bag' />
      </div>

      {cartData.length === 0 ? (
        <div className='flex flex-col items-center py-20 text-center'>
          <p className='text-sm text-zinc-400 font-light mb-8'>Your bag is currently empty.</p>
          <button
            onClick={() => navigate('/collection')}
            className='text-xs tracking-widest uppercase font-medium text-zinc-950 border border-zinc-950 px-10 py-3.5 hover:bg-zinc-950 hover:text-white transition-all duration-150 rounded-[1px]'
          >
            Browse Collections
          </button>

          {/* Upsells when empty */}
          {recommendations.length > 0 && (
            <div className='w-full mt-24 border-t border-zinc-100 pt-16 text-left'>
              <div className='mb-8'>
                <Title text1='Trending' text2='Recommended Pieces' />
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {recommendations.map(item => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-16 items-start'>
          
          {/* Left Side: Cart Items & Progress Bar */}
          <div className='w-full flex flex-col gap-6'>
            {/* Free Shipping Progress Indicator */}
            <div className='bg-zinc-50 p-5 border border-zinc-100/80 rounded-[1px]'>
              <div className='flex justify-between items-center mb-2.5 text-xs font-medium'>
                {subtotal >= freeShippingThreshold ? (
                  <span className='text-zinc-950 flex items-center gap-1.5'>
                    <svg className='w-4 h-4 text-emerald-600' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z' />
                    </svg>
                    You have unlocked free standard shipping
                  </span>
                ) : (
                  <span className='text-zinc-500 font-light'>
                    Add <span className='font-medium text-zinc-950'>{currency}{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</span> more to qualify for free shipping
                  </span>
                )}
                <span className='text-[10px] text-zinc-400 font-semibold'>{Math.round(progressPercent)}%</span>
              </div>
              <div className='w-full h-[3px] bg-zinc-200 rounded-[1px] overflow-hidden'>
                <div 
                  className='h-full bg-zinc-950 transition-all duration-500 ease-out' 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* List of Cart Items */}
            <div className='flex flex-col border-t border-zinc-100'>
              {cartData.map((item) => {
                const productData = products.find(p => p._id === item._id);
                if (!productData) return null;

                return (
                  <div key={`${item._id}-${item.size}`} className='flex items-center gap-5 py-6 border-b border-zinc-100'>
                    {/* Item Image */}
                    <div 
                      className='w-20 h-26 bg-zinc-50 flex-shrink-0 overflow-hidden cursor-pointer'
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      <img className='w-full h-full object-cover' src={productData.image[0]} alt={productData.name} />
                    </div>

                    {/* Item Details */}
                    <div className='flex-1 min-w-0'>
                      <p 
                        className='text-xs font-semibold text-zinc-950 hover:text-zinc-600 transition-colors truncate cursor-pointer'
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {productData.name}
                      </p>
                      <div className='flex items-center gap-3 mt-2'>
                        <span className='text-xs text-zinc-500 font-light'>
                          {currency}{productData.price.toLocaleString('en-IN')}
                        </span>
                        <span className='text-[9px] border border-zinc-200 px-2 py-0.5 text-zinc-500 font-bold uppercase tracking-wider rounded-[1px]'>
                          {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className='flex items-center border border-zinc-200 rounded-[1px] bg-white'>
                      <button
                        onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                        className='w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-950 transition-colors text-sm font-semibold'
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className='w-7 text-center text-xs text-zinc-950 font-semibold'>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className='w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-950 transition-colors text-sm font-semibold'
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Trigger */}
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className='text-zinc-300 hover:text-red-500 transition-colors p-1.5'
                      aria-label="Remove item"
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Gift Wrap / Note Section */}
            <div className='border border-zinc-200/80 p-5 rounded-[1px] mt-4 bg-white'>
              <label className='flex items-center gap-3 cursor-pointer select-none'>
                <input
                  type='checkbox'
                  checked={giftNote}
                  onChange={(e) => setGiftNote(e.target.checked)}
                  className='w-3.5 h-3.5 accent-zinc-950 cursor-pointer rounded-none border-zinc-300'
                />
                <span className='text-xs font-semibold text-zinc-950 uppercase tracking-widest'>Add a gift receipt & personalized note</span>
              </label>
              {giftNote && (
                <div className='mt-4 animate-[fadeUp_0.2s_ease]'>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder='Write a note to recipient...'
                    className='w-full border border-zinc-200 px-3.5 py-3 text-xs focus:outline-none focus:border-zinc-950 transition-colors placeholder-zinc-300 h-20 resize-none font-light bg-zinc-50/50'
                    maxLength={200}
                  />
                  <div className='text-right text-[10px] text-zinc-400 mt-1 font-semibold'>
                    {noteText.length}/200 characters
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className='w-full bg-zinc-50 border border-zinc-100 p-6 rounded-[1px]'>
            <CartTotal />
            <button
              onClick={() => navigate('/place-order')}
              className='w-full mt-8 py-4 bg-zinc-950 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-zinc-800 transition-colors rounded-[1px] shadow-sm'
            >
              Checkout
            </button>
            <button
              onClick={() => navigate('/collection')}
              className='w-full mt-3 py-3 text-xs tracking-widest uppercase font-semibold text-zinc-400 hover:text-zinc-950 transition-colors'
            >
              Continue Shopping
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;