import React from 'react';


// Import Swiper React components

import Carousel from './Carousel';
import MostBoughtSections from './MostBoughtSections';
import Promotions from './Promotions';
import Icons from './Icons';
import Newsletter from './Newsletter';
import IntroductionForUs from './IntroductionForUs';


const Home = ({promotions}) => {
    return (
        <main className="pb-10 mb-auto bg-color">
        <Carousel/>
        <Icons/>
        <MostBoughtSections/>
        
        {/* Promotion header */}
        <Promotions promotions={promotions}/>
        <IntroductionForUs/>
        <Newsletter/>

        {/* <section className="py-5 bg-color">
          <h1 className="text-center">Тука ще има нашите партньори</h1>
        </section> */}
     
      </main>
    );
}

export default Home;
