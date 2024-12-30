import React from 'react';
import Banner from '../comonents/Banner/Banner';
import Feature from '../comonents/Feature/Feature';
import Services from '../comonents/OurServices/Services';

const Home = () => {
    return (
        <div className=''>
           <Banner></Banner>
           <Feature></Feature>
           <Services></Services>
        </div>
    );
};

export default Home;