import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import { NewsLetterBox } from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]'src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores minus molestiae, ullam quod qui provident magnam possimus aspernatur sequi voluptate voluptatesctetur voluptate perspiciatis asperiores? In debitis quo soluta ea porro reiciendis eius atque velit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quibusdam pariatur nesciunt tenetur animi iste? Aliquam reprehenderit nulla alias, quo pariatur similique error laudantium qui, nihil ab facilis quasi cumque quibusdam aliquid ad temporibus impedit ipsam. Fugiat laborum offi</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolorem ullam sapiente facere? Voluptates fuga enim repudiandae eum qui hic necessitatibus eligendi dolorum veniam quas. A obcaecati dolorem, optio, exercitationem, facere maxime nulla ipsa eius minima veniam nesciunt inventore.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, facere voluptate. Natus?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, facere voluptate. Natus?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Serveice:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, facere voluptate. Natus?</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About