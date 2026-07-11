import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        item => item.category === category && item.subCategory === subCategory
      );
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <section className='py-16 border-t border-zinc-100'>
      <div className='mb-10'>
        <Title text1='You May Also Like' text2='Related Pieces' />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8'>
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
