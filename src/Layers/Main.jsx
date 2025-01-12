import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../comonents/Navbar/Navbar';
import Footer from '../comonents/Footer/Footer';

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp') 
    return (
        <div className='max-w-[1440px] mx-auto'>
           {noHeaderFooter || <Navbar></Navbar>}
           <div className='min-w-3/4'>
           <Outlet></Outlet>
           </div>
           <div className='mt-20'>
          {noHeaderFooter || <Footer></Footer>}
           </div>
        </div>
    );
};

export default Main;