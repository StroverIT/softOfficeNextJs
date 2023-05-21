import React from 'react';
import Link from "next/link";
import Image from "next/image";

const MostBoughtSections = () => {
    return (
        <section className="container flex flex-wrap items-center justify-center gap-6 py-10 cursor-pointer mb-14">
        <Link href="/products/stolove">
          <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] shadow-lg border-gray-300 border">
            <Image
              src="/homeImages/chairForOffices.jpg"
              alt="ivan"
              layout="fill"
            />
            <div className="absolute px-5 py-1 text-white bottom-2 right-2 bg-primary-100">
              Виж повече
            </div>
          </div>
        </Link>
        <Link href="/products/skeneri">
          <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] cursor-pointer shadow-lg border-gray-300 border">
            <Image
              src="/homeImages/lazerenPrinter.jpg"
              alt="ivan"
              layout="fill"
            />
            <div className="absolute px-5 py-1 text-white bottom-2 right-2 bg-primary-100">
              Виж повече
            </div>
          </div>
        </Link>
        <Link href="/products/sofas">
          <div className="relative w-full sm:h-96 md:w-[600px] md:h-[300px] h-[200px] cursor-pointer shadow-lg border-gray-300 border">
            <Image src="/homeImages/office.jpg" alt="ivan" layout="fill" />
            <div className="h-full backdrop-blur-[2px]"></div>
            <div className="absolute w-3/4 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="w-full py-6 font-sans text-2xl font-semibold text-center border border-gray-150 bg-dark-transparent">
                Обзаведи своят офис
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
}

export default MostBoughtSections;
