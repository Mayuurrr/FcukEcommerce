import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { NewsLetterBox } from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className='pt-10 pb-0 fade-up'>
      <div className='mb-16'>
        <Title text1='Say Hello' text2='Contact Us' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-20'>
        <div className='bg-zinc-50 overflow-hidden' style={{ aspectRatio: '4/3' }}>
          <img className='w-full h-full object-cover' src={assets.contact_img} alt='Contact Aether' />
        </div>

        <div className='flex flex-col justify-center gap-8'>
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4'>Our Store</p>
            <p className='text-sm text-zinc-500 font-light leading-relaxed'>
              The Boys Street<br />
              Koramangala, Bangalore 560034<br />
              India
            </p>
          </div>
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4'>Get in Touch</p>
            <div className='flex flex-col gap-2'>
              <a href='tel:+919019238681' className='text-sm text-zinc-500 font-light hover:text-zinc-900 transition-colors'>
                +91-901-923-8681
              </a>
              <a href='mailto:dontbeac4nt@gmail.com' className='text-sm text-zinc-500 font-light hover:text-zinc-900 transition-colors'>
                dontbeac4nt@gmail.com
              </a>
            </div>
          </div>
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4'>Careers</p>
            <p className='text-sm text-zinc-500 font-light leading-relaxed mb-5'>
              We're always looking for passionate people to join our team. Explore open roles at Aether.
            </p>
            <button className='text-xs tracking-widest uppercase font-medium text-zinc-900 border border-zinc-900 px-8 py-3 hover:bg-zinc-900 hover:text-white transition-all duration-150'>
              View Openings
            </button>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;