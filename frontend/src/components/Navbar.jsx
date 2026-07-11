import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/collection', label: 'Collection' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <div className='sticky top-0 z-50 flex flex-col w-full'>
      {/* Premium Announcement Bar */}
      <div className='bg-zinc-950 text-white py-2 px-4 text-[9px] font-semibold tracking-[0.25em] text-center uppercase select-none'>
        Free Shipping on Orders Over ₹99 | Use Code <span className='underline underline-offset-2'>AETHER20</span> for 20% off
      </div>

      {/* Main Navigation Header */}
      <header className='bg-white/85 backdrop-blur-md border-b border-zinc-100/80 transition-all duration-200'>
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <div className='flex items-center justify-between h-16'>

            {/* Premium Minimal Brand Logo */}
            <Link to='/' onClick={() => handleNavLinkClick('/')} className='group select-none flex items-center gap-0.5'>
              <span className='text-xs sm:text-sm font-bold tracking-[0.45em] text-zinc-950 uppercase'>
                AETHER
              </span>
              <span className='text-[8px] font-semibold text-zinc-400 align-super -mt-1.5'>
                ®
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className='hidden sm:flex items-center gap-8'>
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavLinkClick(link.path)}
                  className={({ isActive }) =>
                    `text-xs tracking-widest uppercase font-semibold transition-all duration-200 relative py-1.5 ${
                      isActive ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-950'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span className='absolute bottom-0 left-0 right-0 h-[1.5px] bg-zinc-950 animate-[fadeUp_0.2s_ease]' />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </ul>

            {/* Right Side Controls */}
            <div className='flex items-center gap-5'>
              {/* Search Toggle */}
              <button
                onClick={() => { setShowSearch(true); navigate('/collection'); }}
                className='text-zinc-400 hover:text-zinc-950 transition-colors p-1'
                aria-label="Search Collection"
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                </svg>
              </button>

              {/* Account Dropdown */}
              <div className='relative group'>
                <button
                  onClick={() => !token && navigate('/login')}
                  className='text-zinc-400 hover:text-zinc-950 transition-colors p-1'
                  aria-label="Account Access"
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' />
                  </svg>
                </button>
                {token && (
                  <div className='hidden group-hover:block absolute right-0 top-full pt-2 select-none animate-[fadeUp_0.15s_ease]'>
                    <div className='bg-white border border-zinc-100 shadow-md w-44 py-1.5 rounded-sm'>
                      <button
                        onClick={() => navigate('/orders')}
                        className='w-full text-left px-4 py-2.5 text-xs text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors font-medium'
                      >
                        My Orders
                      </button>
                      <button
                        onClick={logout}
                        className='w-full text-left px-4 py-2.5 text-xs text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors font-medium border-t border-zinc-50'
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Toggle */}
              <Link to='/cart' className='relative p-1' aria-label="View Shopping Bag">
                <svg className='w-4 h-4 text-zinc-400 hover:text-zinc-950 transition-colors' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                </svg>
                {getCartCount() > 0 && (
                  <span className='absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-zinc-950 text-white text-[8px] font-bold rounded-full animate-pulse'>
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className='sm:hidden text-zinc-400 hover:text-zinc-950 transition-colors p-1'
                aria-label="Open Mobile Navigation Menu"
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 9h16.5m-16.5 6.75h16.5' />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <div className={`fixed inset-0 z-50 sm:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className='absolute inset-0 bg-black/35 backdrop-blur-sm' onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col`}>
          <div className='flex items-center justify-between px-6 h-16 border-b border-zinc-100'>
            <span className='text-[10px] tracking-widest uppercase text-zinc-400 font-semibold'>Navigation</span>
            <button
              onClick={() => setMobileOpen(false)}
              className='text-zinc-400 hover:text-zinc-950 p-1'
            >
              <svg className='w-4.5 h-4.5' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <nav className='flex flex-col px-6 pt-6 gap-2'>
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => handleNavLinkClick(link.path)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-zinc-50 transition-colors ${
                    isActive ? 'text-zinc-950 font-semibold pl-1' : 'text-zinc-500 hover:text-zinc-950'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {token && (
              <>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/orders'); }}
                  className='py-3 text-sm font-medium text-zinc-500 hover:text-zinc-950 border-b border-zinc-50 text-left transition-colors'
                >
                  My Orders
                </button>
                <button
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className='py-3 text-sm font-medium text-zinc-500 hover:text-zinc-950 text-left transition-colors'
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
