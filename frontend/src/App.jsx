import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ChatBot from './components/ChatBot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

// Helper component to scroll window to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <ScrollToTop />
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          closeButton={false}
          toastClassName="!text-xs !font-medium"
        />
        <Navbar />
        <SearchBar />
        <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>
        </main>
      </div>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
};

export default App;