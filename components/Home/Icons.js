import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { TiStopwatch } from 'react-icons/ti';

const Icons = () => {
    return (
        <section className="container items-center justify-center my-10 text-5xl sm:flex sm:gap-x-5">
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-0">
          <FaShieldAlt />
          <div className="text-sm font-semibold uppercase">ценова защита</div>
        </div>
        <div className="hidden gray-line sm:block"></div>
        <div className="flex flex-col items-center justify-center">
          <TiStopwatch />
          <div className="text-sm font-semibold uppercase">
            експресна доставка
          </div>
        </div>
      </section>
    );
}

export default Icons;
