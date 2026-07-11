import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendURL + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='p-8 fade-up'>
      {/* Page Title */}
      <h1 className='text-xl font-light text-zinc-900 mb-8'>Products</h1>

      <div className='w-full border border-zinc-100'>
        {/* Table Header */}
        <div className='grid grid-cols-[3rem_1fr_1fr_1fr_3rem] bg-zinc-50 border-b border-zinc-100'>
          <div className='py-3 px-4 text-xs uppercase tracking-widest text-zinc-400'>Img</div>
          <div className='py-3 px-4 text-xs uppercase tracking-widest text-zinc-400'>Name</div>
          <div className='py-3 px-4 text-xs uppercase tracking-widest text-zinc-400'>Category</div>
          <div className='py-3 px-4 text-xs uppercase tracking-widest text-zinc-400'>Price</div>
          <div className='py-3 px-4 text-xs uppercase tracking-widest text-zinc-400 text-center'>Del</div>
        </div>

        {/* Table Rows */}
        {list.length === 0 ? (
          <div className='py-12 text-center text-sm text-zinc-400'>No products found.</div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[3rem_1fr_1fr_1fr_3rem] items-center border-b border-zinc-50 hover:bg-zinc-50 transition-colors duration-150'
            >
              {/* Image */}
              <div className='py-3 px-4'>
                <img
                  className='w-12 h-12 object-cover'
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>

              {/* Name */}
              <div className='py-3 px-4 text-sm text-zinc-700 font-medium truncate'>
                {item.name}
              </div>

              {/* Category */}
              <div className='py-3 px-4 text-sm text-zinc-500'>
                {item.category}
              </div>

              {/* Price */}
              <div className='py-3 px-4 text-sm text-zinc-700'>
                ₹{item.price}
              </div>

              {/* Delete */}
              <div className='py-3 px-4 flex items-center justify-center'>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='text-zinc-400 hover:text-red-500 transition-colors duration-150 text-lg leading-none'
                  title='Delete product'
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
