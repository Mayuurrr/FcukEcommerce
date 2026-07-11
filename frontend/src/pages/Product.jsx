import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // Accordion drawer states
  const [openDrawer, setOpenDrawer] = useState('details'); // 'details' | 'fit' | 'shipping' | null

  const toggleDrawer = (drawerName) => {
    setOpenDrawer(openDrawer === drawerName ? null : drawerName);
  };

  useEffect(() => {
    if (products.length) {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
        setSize('');
      }
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center bg-white'>
        <div className='w-5 h-5 border-2 border-zinc-200 border-t-zinc-950 rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div className='pt-10 pb-20 fade-up select-none'>
      {/* Breadcrumbs */}
      <div className='flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-400 font-semibold mb-8 border-b border-zinc-100 pb-4'>
        <span>Home</span>
        <span>/</span>
        <span>{productData.category}</span>
        <span>/</span>
        <span className='text-zinc-950'>{productData.name}</span>
      </div>

      <div className='flex flex-col lg:flex-row gap-16 items-start'>

        {/* Left Side: Image Gallery */}
        <div className='w-full lg:w-[60%] flex flex-col-reverse sm:flex-row gap-4'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:w-20 scrollbar-none'>
            {productData.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setImage(img)}
                className={`flex-shrink-0 w-16 sm:w-full aspect-[3/4] overflow-hidden bg-zinc-50 border transition-all ${
                  image === img ? 'border-zinc-950' : 'border-zinc-100 hover:border-zinc-300'
                }`}
                aria-label={`Switch to image ${index + 1}`}
              >
                <img className='w-full h-full object-cover' src={img} alt={`Alternative view ${index + 1}`} />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className='flex-1 bg-zinc-50 border border-zinc-100 overflow-hidden aspect-[3/4]'>
            <img
              className='w-full h-full object-cover object-center transition-all duration-300'
              src={image}
              alt={productData.name}
            />
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className='w-full lg:w-[40%] flex flex-col'>
          <span className='text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-bold mb-2'>
            {productData.category} / {productData.subCategory}
          </span>
          <h1 className='text-xl sm:text-2xl font-light text-zinc-900 tracking-tight leading-snug mb-3'>
            {productData.name}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-1.5 mb-6'>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-[11px] ${i < 4 ? 'text-zinc-950' : 'text-zinc-200'}`}>★</span>
            ))}
            <span className='text-[10px] text-zinc-400 font-medium ml-1.5'>(122 Reviews)</span>
          </div>

          <p className='text-xl font-light text-zinc-950 mb-6'>
            {currency}{productData.price.toLocaleString('en-IN')}
          </p>

          <p className='text-xs text-zinc-500 font-light leading-relaxed mb-8 border-b border-zinc-100 pb-6'>
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-3.5'>
              <span className='text-[10px] tracking-widest uppercase text-zinc-400 font-bold'>Size</span>
              {size && <span className='text-[10px] font-semibold text-zinc-950 uppercase tracking-widest'>Selected: {size}</span>}
            </div>
            <div className='flex flex-wrap gap-2'>
              {productData.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 text-xs font-semibold border transition-all duration-150 rounded-[2px] ${
                    s === size
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className='w-full py-4 bg-zinc-950 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-zinc-800 transition-colors duration-150 mb-8 rounded-[1px] shadow-sm active:scale-[0.99]'
          >
            Add to Bag
          </button>

          {/* Collapsible Accordion Drawers */}
          <div className='border-t border-zinc-100'>
            {/* Drawer 1: Details */}
            <div className='border-b border-zinc-100'>
              <button
                onClick={() => toggleDrawer('details')}
                className='w-full py-4 flex items-center justify-between text-left'
              >
                <span className='text-[10px] tracking-widest uppercase text-zinc-900 font-semibold'>Product Details</span>
                <span className='text-xs font-light text-zinc-400'>{openDrawer === 'details' ? '−' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'details' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                <p className='text-xs text-zinc-500 leading-relaxed font-light'>
                  Crafted using premium organic fabrics. Featuring meticulous double-needle stitching, structured side seams, and a reinforced collar. Fits true to size. Designed for everyday layering.
                </p>
              </div>
            </div>

            {/* Drawer 2: Sizing & Fit */}
            <div className='border-b border-zinc-100'>
              <button
                onClick={() => toggleDrawer('fit')}
                className='w-full py-4 flex items-center justify-between text-left'
              >
                <span className='text-[10px] tracking-widest uppercase text-zinc-900 font-semibold'>Sizing & Fit</span>
                <span className='text-xs font-light text-zinc-400'>{openDrawer === 'fit' ? '−' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'fit' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                <p className='text-xs text-zinc-500 leading-relaxed font-light'>
                  Model is 6'1\" wearing size L (Men) / 5'9\" wearing size S (Women). Structured cut with a slightly relaxed shoulders line. Take your normal size for a classic drape.
                </p>
              </div>
            </div>

            {/* Drawer 3: Shipping & Returns */}
            <div className='border-b border-zinc-100'>
              <button
                onClick={() => toggleDrawer('shipping')}
                className='w-full py-4 flex items-center justify-between text-left'
              >
                <span className='text-[10px] tracking-widest uppercase text-zinc-900 font-semibold'>Delivery & Returns</span>
                <span className='text-xs font-light text-zinc-400'>{openDrawer === 'shipping' ? '−' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'shipping' ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                <p className='text-xs text-zinc-500 leading-relaxed font-light'>
                  Enjoy complimentary carbon-neutral shipping on orders over ₹99. Delivery times take 3-5 business days. Return or exchange within 7 days of delivery.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Items */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
