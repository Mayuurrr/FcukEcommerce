import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Footer = () => {
  const triggerCompliment = () => {
    const compliments = [
      "Your taste in minimalist fashion is impeccable. 🖤",
      "You look absolutely stunning today. Keep shining! ✨",
      "That outfit you're thinking of buying? It's totally your style.",
      "You have a wonderful eye for detail. Have a beautiful day!",
    ];
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    toast.info(randomCompliment);
  };

  const triggerDiscount = () => {
    toast.success("Shh! Use code 'AETHER20' at checkout for 20% off your purchase. 🤫");
  };

  const triggerExistentialDread = () => {
    toast.error("Error 404: Meaning of life not found. Try shopping instead. 🪐");
  };

  const triggerAntiWrinkle = () => {
    toast.warning("Anti-Wrinkle Spray is currently out of stock. Please iron your clothes manually. 💨");
  };

  return (
    <footer className='border-t border-zinc-100 mt-10'>
      <div className='grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-12 py-16'>
        {/* Brand Column */}
        <div className='flex flex-col gap-4'>
          <Link to='/' className='text-xl font-light tracking-[0.3em] text-zinc-900 hover:opacity-85 transition-opacity'>
            AETHER
          </Link>
          <p className='text-sm text-zinc-400 font-light leading-relaxed max-w-xs'>
            Premium minimalist essentials for the modern wardrobe. Designed in Bangalore, shipped worldwide. Thoughtfully sourced, built for longevity.
          </p>
          <div className='flex gap-4 mt-2'>
            {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
              <a
                key={social}
                href='#'
                className='text-[10px] tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-colors font-medium'
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Directory Column */}
        <div>
          <p className='text-xs tracking-widest uppercase text-zinc-950 font-medium mb-5'>Directory</p>
          <ul className='flex flex-col gap-3'>
            <li>
              <Link to='/' className='text-sm text-zinc-500 hover:text-zinc-950 font-light transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/collection' className='text-sm text-zinc-500 hover:text-zinc-950 font-light transition-colors'>
                Shop Collection
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-sm text-zinc-500 hover:text-zinc-950 font-light transition-colors'>
                Our Philosophy
              </Link>
            </li>
            <li>
              <Link to='/contact' className='text-sm text-zinc-500 hover:text-zinc-950 font-light transition-colors'>
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Playful Links Column */}
        <div>
          <p className='text-xs tracking-widest uppercase text-zinc-950 font-medium mb-5'>Aether Labs</p>
          <ul className='flex flex-col gap-3'>
            <li>
              <button
                onClick={triggerAntiWrinkle}
                className='text-sm text-zinc-400 hover:text-zinc-950 font-light text-left transition-colors cursor-pointer'
              >
                Anti-Wrinkle Spray (Beta)
              </button>
            </li>
            <li>
              <button
                onClick={triggerExistentialDread}
                className='text-sm text-zinc-400 hover:text-zinc-950 font-light text-left transition-colors cursor-pointer'
              >
                Existential dread therapy
              </button>
            </li>
            <li>
              <button
                onClick={triggerCompliment}
                className='text-sm text-zinc-400 hover:text-zinc-950 font-light text-left transition-colors cursor-pointer'
              >
                Compliment generator (Free)
              </button>
            </li>
            <li>
              <button
                onClick={triggerDiscount}
                className='text-sm text-zinc-400 hover:text-zinc-950 font-light text-left transition-colors cursor-pointer'
              >
                Secret discount (Shh!)
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className='border-t border-zinc-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <p className='text-xs text-zinc-400'>
          © {new Date().getFullYear()} Aether Wardrobe. All rights reserved.
        </p>
        <div className='flex gap-6'>
          <a href='#' className='text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-light'>
            Privacy
          </a>
          <a href='#' className='text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-light'>
            Terms
          </a>
          <a href='#' className='text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-light'>
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;