import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between px-6 py-3 bg-white border-b border-zinc-100'>
      {/* Brand */}
      <div className='flex items-center gap-0.5 select-none'>
        <span className='text-xs font-bold tracking-[0.45em] text-zinc-950 uppercase'>AETHER</span>
        <span className='text-[8px] font-semibold text-zinc-400 align-super -mt-1.5 mr-2'>
          ®
        </span>
        <span className='text-[9px] font-medium tracking-widest text-zinc-400 uppercase hidden sm:block border-l border-zinc-200 pl-3'>
          Admin Panel
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={() => setToken('')}
        className='text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors duration-150 font-medium'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar