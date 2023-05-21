import React from 'react';
import Link from "next/link"
import SwiperFreeMode from "../swiperJs/SwiperFreeMode"

const Promotions = ({promotions}) => {
    return (
        <>
            <section className="relative z-10 text-center index-title">
          <h3 className="inline px-4 text-3xl font-medium bg-color">
            Промоции
          </h3>
          <div className="text-xs uppercase cursor-pointer text-primary-100">
            <Link href="/promotions">виж всички</Link>
          </div>
        </section>

        <section className="container mt-10 mb-10">
          <SwiperFreeMode data={promotions} navSize="3xl" />
        </section>
        </>
    );
}

export default Promotions;
