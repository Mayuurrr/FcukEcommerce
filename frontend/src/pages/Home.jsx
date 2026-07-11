import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import { NewsLetterBox } from '../components/NewsLetterBox'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="fade-up">
      <Hero />
      
      {/* Brand Philosophy Section */}
      <section className="py-14 text-center max-w-2xl mx-auto px-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-semibold mb-4">Our Philosophy</p>
        <h2 className="text-lg sm:text-xl font-light text-zinc-900 leading-relaxed mb-5">
          "We construct garments of quiet utility. No excessive branding. Just exceptional materials, structured fits, and timeless everyday function."
        </h2>
        <div className="w-8 h-[1px] bg-zinc-950 mx-auto mb-6" />
        <Link 
          to="/about" 
          className="text-xs font-semibold tracking-widest uppercase text-zinc-950 hover:text-zinc-600 transition-colors underline underline-offset-4"
        >
          Read Our Story
        </Link>
      </section>

      {/* Featured Categories Grid Banner */}
      <section className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Men's Capsule",
            image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80",
            link: "/collection?category=Men"
          },
          {
            title: "Women's Essentials",
            image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
            link: "/collection?category=Women"
          },
          {
            title: "Kids Collection",
            image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
            link: "/collection?category=Kids"
          }
        ].map((item, index) => (
          <Link to={item.link} key={index} className="group relative block overflow-hidden bg-zinc-100 aspect-[4/5]">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-lg tracking-wide font-light mb-2">{item.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-white text-[10px] tracking-widest uppercase font-medium hover:underline">
                Explore Shop →
              </span>
            </div>
          </Link>
        ))}
      </section>

      <LatestCollection />
      <BestSeller />
      
      {/* Brand Values Marquee Banner */}
      <section className="my-10 bg-zinc-950 text-white py-6 px-4 flex flex-wrap justify-around items-center gap-8 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
        {[
          "100% ORGANIC FABRICS",
          "ETHICAL MANUFACTURING",
          "CARBON NEUTRAL DELIVERY",
          "7-DAY EASY RETURNS"
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
            <span className="text-[10px] font-semibold tracking-[0.2em]">{text}</span>
          </div>
        ))}
      </section>

      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home;