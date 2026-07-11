import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const CATEGORIES = ['Men', 'Women', 'Kids'];
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear'];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  
  // React Router search params hook
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');

  // Synchronize state filters from URL query parameters on mount or URL updates
  useEffect(() => {
    const urlCat = searchParams.get('category');
    const urlSub = searchParams.get('subCategory');

    if (urlCat) {
      setCategory(urlCat.split(','));
    } else {
      setCategory([]);
    }

    if (urlSub) {
      setSubCategory(urlSub.split(','));
    } else {
      setSubCategory([]);
    }
  }, [searchParams]);

  // Update query params in URL whenever filter selection occurs
  const handleFilterToggle = (value, type) => {
    let current = type === 'category' ? [...category] : [...subCategory];
    
    if (current.includes(value)) {
      current = current.filter(item => item !== value);
    } else {
      current.push(value);
    }

    const newParams = new URLSearchParams(searchParams);
    
    if (type === 'category') {
      setCategory(current);
      if (current.length > 0) {
        newParams.set('category', current.join(','));
      } else {
        newParams.delete('category');
      }
    } else {
      setSubCategory(current);
      if (current.length > 0) {
        newParams.set('subCategory', current.join(','));
      } else {
        newParams.delete('subCategory');
      }
    }

    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    newParams.delete('subCategory');
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (showSearch && search) {
      list = list.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      list = list.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      list = list.filter(item => subCategory.includes(item.subCategory));
    }
    if (sortOption === 'low-high') list.sort((a, b) => a.price - b.price);
    if (sortOption === 'high-low') list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, category, subCategory, sortOption, search, showSearch]);

  const activeFilters = category.length + subCategory.length;

  return (
    <div className='pt-10 pb-20 fade-up select-none'>
      <div className='flex flex-col sm:flex-row gap-10 items-start'>

        {/* Filter Sidebar */}
        <aside className='w-full sm:w-56 flex-shrink-0'>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='sm:hidden flex items-center justify-between w-full py-3 border-b border-zinc-100 mb-6'
          >
            <span className='text-xs tracking-widest uppercase font-medium text-zinc-900'>
              Filters {activeFilters > 0 && `(${activeFilters})`}
            </span>
            <svg
              className={`w-4 h-4 text-zinc-400 transition-transform ${showFilter ? 'rotate-180' : ''}`}
              fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </button>

          <div className={`flex flex-col gap-8 ${showFilter ? 'block' : 'hidden'} sm:block bg-zinc-50/50 p-6 border border-zinc-100`}>
            {/* Category Filter */}
            <div className='border-b border-zinc-200/60 pb-6'>
              <p className='text-[10px] tracking-widest uppercase text-zinc-400 font-semibold mb-4 text-left'>Category</p>
              <div className='flex flex-col gap-3 items-start'>
                {CATEGORIES.map(cat => (
                  <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                    <input
                      type='checkbox'
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={() => handleFilterToggle(cat, 'category')}
                      className='w-3.5 h-3.5 accent-zinc-900 cursor-pointer rounded-none border-zinc-300'
                    />
                    <span className='text-xs text-zinc-500 group-hover:text-zinc-950 transition-colors font-light'>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className='pb-2'>
              <p className='text-[10px] tracking-widest uppercase text-zinc-400 font-semibold mb-4 text-left'>Type</p>
              <div className='flex flex-col gap-3 items-start'>
                {SUB_CATEGORIES.map(sub => (
                  <label key={sub} className='flex items-center gap-3 cursor-pointer group'>
                    <input
                      type='checkbox'
                      value={sub}
                      checked={subCategory.includes(sub)}
                      onChange={() => handleFilterToggle(sub, 'subCategory')}
                      className='w-3.5 h-3.5 accent-zinc-900 cursor-pointer rounded-none border-zinc-300'
                    />
                    <span className='text-xs text-zinc-500 group-hover:text-zinc-950 transition-colors font-light'>
                      {sub.replace('wear', ' wear')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {activeFilters > 0 && (
              <button
                onClick={clearAllFilters}
                className='text-[11px] font-medium text-zinc-900 hover:text-zinc-600 transition-colors underline underline-offset-4 text-left pt-2'
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className='flex-1 w-full'>
          <div className='flex items-center justify-between mb-8 w-full border-b border-zinc-100 pb-4'>
            <Title text1='Shop' text2='All Collections' />
            <select
              className='border border-zinc-200 px-3 py-2 text-xs text-zinc-600 focus:outline-none focus:border-zinc-950 transition-colors cursor-pointer bg-white'
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value='relevance'>Sort: Relevance</option>
              <option value='low-high'>Price: Low to High</option>
              <option value='high-low'>Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <p className='text-[10px] tracking-widest uppercase text-zinc-400 font-medium mb-6'>{filteredProducts.length} items</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10'>
                {filteredProducts.map(item => (
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
            </>
          ) : (
            <div className='py-20 text-center border border-dashed border-zinc-200/80 bg-zinc-50/20'>
              <p className='text-sm text-zinc-400 font-light'>No products match your selection.</p>
              <button
                onClick={clearAllFilters}
                className='mt-4 text-xs tracking-widest uppercase font-medium text-zinc-900 border border-zinc-900 px-6 py-2.5 hover:bg-zinc-900 hover:text-white transition-all duration-150'
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
