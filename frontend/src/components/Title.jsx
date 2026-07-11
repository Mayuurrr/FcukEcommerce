import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col gap-1 mb-2'>
      <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium'>{text1}</p>
      <h2 className='text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight'>{text2}</h2>
    </div>
  );
};

export default Title;