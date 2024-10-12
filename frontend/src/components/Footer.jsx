import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className=''>
                    <img className='w-32 mb-5' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 '>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus debitis facilis impedit odit corrupti, vero assumenda quas et? Eaque quidem vel quos inventoreLorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse ut minus doloribus tenetur modi accusantium nobis exercitationem officia cum quia, soluta culpa.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91-901-923-8681</li>
                        <li>dontbeac4nt@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr/>
                <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer