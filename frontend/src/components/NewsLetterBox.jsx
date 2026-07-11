import React from 'react'

export const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className='py-20 border-t border-zinc-100'>
      <div className='max-w-lg'>
        <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-3'>Stay in the loop</p>
        <h2 className='text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight mb-3'>
          Get 20% off your first order
        </h2>
        <p className='text-sm text-zinc-400 font-light leading-relaxed mb-8'>
          Subscribe for new arrivals, style edits, and exclusive early access to our seasonal collections.
        </p>
        <form onSubmit={onSubmitHandler} className='flex gap-0 max-w-sm'>
          <input
            className='flex-1 border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-300'
            type='email'
            placeholder='your@email.com'
            required
          />
          <button
            className='bg-zinc-900 text-white px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap'
            type='submit'
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetterBox;
