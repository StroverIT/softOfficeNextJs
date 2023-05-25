import React from 'react';


import SwiperPag from "../swiperJs/SwiperPag"

const swiperPag = [
    {
      src: "/carousel/!Image Volume.png",
  
      key: "image volume ",
      pageUrl: "products/hartiq/6374d3379f74a9b4f4eb61a2?itemId=6374d3379f74a9b4f4eb61a4",
    },
    {
      src: "/carousel/!Kasova kniga.png",
  
      key: "Kasova kniga",
      pageUrl:
        "/products/formylqri/621779090125b0cc2f1484a1?itemId=621779090125b0cc2f1484a9",
    },
    {
      src: "/carousel/!Papka klasior.png",
  
      key: "Papka klasior",
      pageUrl: "/products/klasiori/62015d6437d09b4aa956e968?itemId=62015d6437d09b4aa956e969",
    },
    {
      src: "/carousel/hero_slides_3.png",
  
      key: "Тонер Касета",
      pageUrl: "/products/skeneri",
    },
  
    {
      src: "/carousel/ferero.png",
  
      key: "test carousel for my monday version 6",
      pageUrl: "/",
    },
    {
      src: "/carousel/freedeliveryLego.png",
  
      key: "test carousel for my monday version 7",
      pageUrl: "/",
    },
  ];

const Carousel = () => {
    return (
        <section>
        <div className="shadow-md ">
          <section className="relative w-full ">
            <section className="relative flex items-center justify-center">
              <SwiperPag images={swiperPag} navSize="3xl" />
            </section>
          </section>
        </div>
      </section>
    );
}

export default Carousel;
