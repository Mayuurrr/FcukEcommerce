import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();

  return (
    <div className='w-full'>
      <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-5'>Order Summary</p>
      <div className='flex flex-col gap-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-zinc-500 font-light'>Subtotal</span>
          <span className='text-zinc-900'>{currency}{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-zinc-500 font-light'>Delivery</span>
          <span className='text-zinc-900'>{currency}{deliveryFee}</span>
        </div>
        <div className='h-px bg-zinc-100 my-1' />
        <div className='flex justify-between'>
          <span className='text-zinc-900 font-medium'>Total</span>
          <span className='text-zinc-900 font-medium'>
            {currency}{(subtotal === 0 ? 0 : subtotal + deliveryFee).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;