import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProducts = products.filter((item) => item.bestSeller === true);
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <section className='py-14 border-t border-zinc-100'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10'>
        <Title text1='Customer Favourites' text2='Best Sellers' />
        <p className='text-sm text-zinc-400 font-light max-w-xs'>
          Our most-loved pieces — consistently top-rated by our community.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8'>
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
