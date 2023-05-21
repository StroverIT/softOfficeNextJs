import React from 'react';
import Image from "next/image"
const IntroductionForUs = () => {
    return (
    
        <section className="my-16 bg-color">
          <div className="container">
            <section className="relative z-10 text-center index-title">
              <h3 className="inline px-4 mt-1 text-3xl font-medium bg-color">
                Онлайн магазин SoftOffice
              </h3>
            </section>
            <section className="items-center justify-center grid-cols-8 my-5 lg:grid">
              <div className="col-span-4 col-start-2 py-10 mt-5 text-center sm:mb-5 lg:text-left lg:my-0 lg:w-5/6">
                <span className="text-xl ">
                  Ние от Softoffice сме убедени, че Вие трябва да се чувствате
                  свободни при избора си, затова наш приоритет е предлагане на
                  услуги и комплексни решения от ново поколение, които да дават
                  възможност Вие да покриете изискванията си максимално и да сте
                  100% удовлетворени от партньорството с нас.
                </span>
              </div>

              <div className="relative flex items-center justify-center w-full h-28 lg:h-28 ">
                {/* Image  of the shop*/}

                <Image
                  src="/aboutSoftOffice.png"
                  alt="aboutSoftOffice"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </section>
          </div>
        </section>
    );
}

export default IntroductionForUs;
