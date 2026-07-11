import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { NewsLetterBox } from '../components/NewsLetterBox'

const values = [
  {
    title: 'Quality Assurance',
    desc: 'Every piece is rigorously tested for quality, durability, and finish before it reaches you. We accept nothing less than excellence.'
  },
  {
    title: 'Convenience First',
    desc: 'From seamless browsing to easy checkout and fast delivery — we have designed every touchpoint around your experience.'
  },
  {
    title: 'Exceptional Service',
    desc: 'A dedicated support team available around the clock, because your satisfaction is our highest priority.'
  }
];

const About = () => {
  return (
    <div className='pt-10 pb-0 fade-up'>
      {/* Hero */}
      <div className='mb-16'>
        <Title text1='Our Story' text2='About Us' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-20'>
        <div className='bg-zinc-50 overflow-hidden' style={{ aspectRatio: '4/3' }}>
          <img className='w-full h-full object-cover' src={assets.about_img} alt='About Aether' />
        </div>
        <div className='flex flex-col justify-center gap-6'>
          <p className='text-sm text-zinc-500 font-light leading-relaxed'>
            Aether was founded on a simple belief: that everyday clothing should be exceptional. We source the finest materials, partner with skilled artisans, and design pieces that outlast trends and outlive seasons.
          </p>
          <p className='text-sm text-zinc-500 font-light leading-relaxed'>
            From our first collection to today, we have remained committed to thoughtful design, sustainable practices, and making premium clothing accessible to everyone.
          </p>
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-3'>Our Mission</p>
            <p className='text-sm text-zinc-500 font-light leading-relaxed'>
              To create a wardrobe that works harder for you — versatile, timeless, and built to last. We believe in buying less and wearing more.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='border-t border-zinc-100 pt-16 mb-20'>
        <div className='mb-10'>
          <Title text1='Why Us' text2='Our Values' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-100'>
          {values.map((v, i) => (
            <div key={i} className='bg-white p-10'>
              <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4'>0{i + 1}</p>
              <p className='text-base font-medium text-zinc-900 mb-3'>{v.title}</p>
              <p className='text-sm text-zinc-400 font-light leading-relaxed'>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;