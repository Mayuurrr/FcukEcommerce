import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const response = await axios.post(`${backendURL}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendURL}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className='min-h-[calc(100vh-64px)] flex items-center justify-center py-20 fade-up'>
      <div className='w-full max-w-sm'>
        {/* Header */}
        <div className='mb-10'>
          <p className='text-xs tracking-widest uppercase text-zinc-400 font-medium mb-2'>
            {mode === 'login' ? 'Welcome back' : 'Join Aether'}
          </p>
          <h1 className='text-3xl font-light text-zinc-900 tracking-tight'>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {mode === 'signup' && (
            <div>
              <label className='text-[10px] tracking-widest uppercase text-zinc-400 font-medium block mb-1.5'>Name</label>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Your full name'
                required
                className='w-full border border-zinc-200 px-3.5 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-300'
              />
            </div>
          )}
          <div>
            <label className='text-[10px] tracking-widest uppercase text-zinc-400 font-medium block mb-1.5'>Email</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='your@email.com'
              required
              className='w-full border border-zinc-200 px-3.5 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-300'
            />
          </div>
          <div>
            <label className='text-[10px] tracking-widest uppercase text-zinc-400 font-medium block mb-1.5'>Password</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Min. 8 characters'
              required
              className='w-full border border-zinc-200 px-3.5 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder-zinc-300'
            />
          </div>

          <div className='flex items-center justify-between text-xs mt-1'>
            <button type='button' className='text-zinc-400 hover:text-zinc-900 transition-colors'>
              Forgot password?
            </button>
            <button
              type='button'
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className='text-zinc-900 font-medium hover:text-zinc-600 transition-colors'
            >
              {mode === 'login' ? 'Create account →' : 'Sign in instead →'}
            </button>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-3.5 bg-zinc-900 text-white text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
