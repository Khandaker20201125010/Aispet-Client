import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../comonents/Navbar/Navbar';
import Footer from '../comonents/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className=''>
           <Outlet></Outlet>
           </div>
           <div className='mt-20'>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Main;