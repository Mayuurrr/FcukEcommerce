import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const navItems = [
    { to: '/add', icon: assets.add_icon, label: 'Add Items' },
    { to: '/list', icon: assets.order_icon, label: 'List Items' },
    { to: '/orders', icon: assets.order_icon, label: 'Orders' },
  ]

  return (
    <div className='w-52 min-h-screen bg-white border-r border-zinc-100 pt-8 flex-shrink-0'>
      <nav className='flex flex-col gap-0.5'>
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-6 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'text-zinc-900 bg-zinc-50 border-l-2 border-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-l-2 border-transparent'
              }`
            }
          >
            <img className='w-4 h-4 opacity-60' src={icon} alt={label} />
            <span className='hidden md:block'>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar