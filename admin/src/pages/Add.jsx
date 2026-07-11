// Import dependencies
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendURL } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ token }) => {
  // State management
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller ? 'true' : 'false');
      console.log(bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendURL}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubCategory('Topwear');
        setBestseller(false);
        setSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleImageChange = (index, file) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const inputClass =
    'border border-zinc-200 px-3 py-2.5 text-sm w-full focus:outline-none focus:border-zinc-900 transition-colors duration-150';
  const labelClass = 'text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block';

  return (
    <div className='p-8 max-w-2xl fade-up'>
      {/* Page Title */}
      <h1 className='text-xl font-light text-zinc-900 mb-8'>Add Product</h1>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>

        {/* Image Upload */}
        <div>
          <p className={labelClass}>Product Images</p>
          <div className='flex gap-3'>
            {images.map((img, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className='w-24 h-24 border border-dashed border-zinc-200 flex items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors duration-150 overflow-hidden'
              >
                {img ? (
                  <img
                    className='w-full h-full object-cover'
                    src={URL.createObjectURL(img)}
                    alt='upload preview'
                  />
                ) : (
                  <img
                    className='w-8 h-8 opacity-30'
                    src={assets.upload_area}
                    alt='upload'
                  />
                )}
                <input
                  type='file'
                  id={`image${index + 1}`}
                  hidden
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className={labelClass}>Product Name</label>
          <input
            className={inputClass}
            type='text'
            placeholder='e.g. Classic White Shirt'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className={labelClass}>Product Description</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            placeholder='Describe the product...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Category / Sub-Category / Price */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className={labelClass}>Sub Category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className={inputClass}
            >
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>
          </div>

          <div className='w-full sm:w-32'>
            <label className={labelClass}>Price (₹)</label>
            <input
              className={inputClass}
              type='number'
              placeholder='999'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className={labelClass}>Sizes</label>
          <div className='flex gap-2'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 text-sm border cursor-pointer transition-colors duration-150 ${
                  sizes.includes(size)
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-900'
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='bestseller'
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
            className='w-4 h-4 accent-zinc-900 cursor-pointer'
          />
          <label className='text-sm text-zinc-600 cursor-pointer' htmlFor='bestseller'>
            Mark as Bestseller
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            type='submit'
            className='px-8 py-2.5 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors duration-150 mt-6'
          >
            Add Product
          </button>
        </div>

      </form>

      <ToastContainer position='top-right' autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Add;
