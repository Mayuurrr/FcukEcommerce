import React, { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // silent
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-zinc-50'>
      <div className='bg-white p-10 w-full max-w-sm border border-zinc-100'>
        {/* Header */}
        <h1 className='text-2xl font-light tracking-wide text-zinc-900 mb-1'>Admin</h1>
        <p className='text-sm text-zinc-400 mb-8'>Sign in to continue</p>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          {/* Email */}
          <div>
            <label className='text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='your@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-900 transition-colors duration-150'
            />
          </div>

          {/* Password */}
          <div>
            <label className='text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-900 transition-colors duration-150'
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-zinc-900 text-white py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors duration-150 mt-6'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
