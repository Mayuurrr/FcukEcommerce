import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className='bg-zinc-50/50 border-b border-zinc-100 py-5 flex justify-center items-center px-4 fade-up'>
      <div className='flex items-center gap-3 w-full max-w-md bg-white border border-zinc-200 px-4 py-2.5 rounded-full shadow-sm focus-within:border-zinc-950 focus-within:shadow-md focus-within:ring-1 focus-within:ring-zinc-950/10 transition-all duration-200'>
        <svg className='w-4 h-4 text-zinc-400 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none bg-transparent'
          type='text'
          placeholder='Search AETHER collection...'
          aria-label='Search for products'
          autoFocus
        />
        <button
          onClick={() => { setSearch(''); setShowSearch(false); }}
          className='text-zinc-400 hover:text-zinc-950 transition-colors flex-shrink-0 p-0.5'
          aria-label='Close search'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
