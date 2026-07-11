import React from 'react'

const policies = [
  {
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99' />
      </svg>
    ),
    title: 'Easy Exchange',
    desc: 'Hassle-free size or style exchange within 7 days of delivery.'
  },
  {
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z' />
      </svg>
    ),
    title: '7-Day Returns',
    desc: 'Not completely happy? Return within 7 days, no questions asked.'
  },
  {
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Our team is always on hand to help with any questions you have.'
  }
];

const OurPolicy = () => {
  return (
    <section className='py-16 border-t border-zinc-100'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {policies.map((policy, index) => (
          <div key={index} className='flex flex-col gap-3'>
            <div className='text-zinc-500'>{policy.icon}</div>
            <p className='text-sm font-medium text-zinc-900'>{policy.title}</p>
            <p className='text-sm text-zinc-400 font-light leading-relaxed'>{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;