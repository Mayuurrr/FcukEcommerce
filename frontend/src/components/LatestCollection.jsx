import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className='py-14 border-t border-zinc-100'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10'>
        <Title text1='New In' text2='Latest Collection' />
        <p className='text-sm text-zinc-400 font-light max-w-xs'>
          Fresh arrivals curated for the modern wardrobe. Updated every season.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8'>
        {latestProducts.map((item) => (
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

export default LatestCollection;