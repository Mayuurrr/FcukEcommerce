import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, category }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='group block select-none'>
      {/* Image container with consistent 3/4 aspect ratio */}
      <div className='relative overflow-hidden bg-zinc-50' style={{ aspectRatio: '3/4' }}>
        {/* Primary Image */}
        <img
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            image[1] ? 'group-hover:opacity-0' : 'group-hover:scale-105'
          }`}
          src={image[0]}
          alt={name}
          loading="lazy"
        />
        {/* Secondary Image - fades in on hover */}
        {image[1] && (
          <img
            className='absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105'
            src={image[1]}
            alt={`${name} alt view`}
            loading="lazy"
          />
        )}
      </div>
      
      {/* Product Information */}
      <div className='pt-4 pb-1'>
        {category && (
          <p className='text-[9px] tracking-[0.25em] uppercase text-zinc-400 font-semibold mb-1'>{category}</p>
        )}
        <p className='text-xs font-semibold text-zinc-900 leading-snug line-clamp-1 group-hover:text-zinc-600 transition-colors duration-200'>
          {name}
        </p>
        <p className='text-xs text-zinc-500 mt-1 font-light'>{currency}{price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
};

export default ProductItem;