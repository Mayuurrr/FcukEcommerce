import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Handle visibility based on the current route
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // Clear search input and close search bar
  const handleCloseSearch = () => {
    setSearch(''); // Clear search input
    setShowSearch(false); // Hide search bar
  };

  return showSearch && visible ? (
    <div className="text-center">
      {/* Search Input Wrapper */}
      <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-md">
        {/* Search Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
          type="text"
          placeholder="Search for products"
          aria-label="Search for products"
        />
        {/* Search Icon */}
        <img className="w-4 cursor-pointer" src={assets.search_icon} alt="Search" />
      </div>
      {/* Close Search Button */}
      <img
        onClick={handleCloseSearch}
        className="inline w-4 h-4 cursor-pointer ml-3"
        src={assets.cross_icon}
        alt="Close search"
        aria-label="Close search"
      />
    </div>
  ) : null;
};

export default SearchBar;
