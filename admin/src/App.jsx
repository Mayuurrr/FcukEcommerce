import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendURL = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-white min-h-screen'>
      <ToastContainer />
      {token === ''
        ? <Login setToken={setToken} />
        : (
          <>
            <Navbar setToken={setToken} />
            <div className='flex w-full min-h-[calc(100vh-49px)]'>
              <Sidebar />
              <div className='flex-1 overflow-auto'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default App;
