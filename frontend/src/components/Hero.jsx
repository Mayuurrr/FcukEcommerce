import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Hero = () => {
  return (
    <section className='flex flex-col sm:flex-row h-[480px] sm:h-[540px] -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] bg-zinc-50 border-b border-zinc-100 select-none'>
      {/* Text Side */}
      <div className='w-full sm:w-5/12 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-8 sm:py-0 bg-white order-2 sm:order-1 h-1/2 sm:h-full'>
        <div className='fade-up'>
          <p className='text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-semibold mb-4'>
            New Season — SS 2025
          </p>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 leading-[1.15] tracking-tight mb-4'>
            Crafted for the<br />
            <span className='font-semibold text-zinc-950'>Modern</span><br />
            Wardrobe.
          </h1>
          <p className='text-xs text-zinc-400 leading-relaxed mb-8 max-w-xs'>
            Premium essentials and seasonal capsule collections — quiet luxury, exceptional fit.
          </p>
          <Link
            to='/collection'
            className='inline-flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-zinc-950 hover:gap-5 transition-all duration-300 group'
          >
            Shop Collection
            <span className='w-8 h-[1px] bg-zinc-950 group-hover:w-12 transition-all duration-300' />
          </Link>
        </div>
      </div>

      {/* Image Side */}
      <div className='w-full sm:w-7/12 order-1 sm:order-2 overflow-hidden h-1/2 sm:h-full bg-zinc-50 relative'>
        <img
          className='w-full h-full object-cover object-center transition-transform duration-[1.5s] hover:scale-102'
          src={assets.hero_img}
          alt="New Season Collection"
          loading="eager"
        />
        {/* Seamless blend overlays */}
        <div className='absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent hidden sm:block pointer-events-none w-1/5' />
        <div className='absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent sm:hidden pointer-events-none h-1/5 bottom-0 top-auto' />
      </div>
    </section>
  );
};

export default Hero;