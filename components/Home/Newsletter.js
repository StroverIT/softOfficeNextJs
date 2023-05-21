import React from 'react';

import Icons from "../Icons/Icons"
import BtnOutlined from "../buttons/Outlined"

const Newsletter = () => {
    return (
        <section className="pb-2 bg-color">
          <div className="container relative z-20 h-full bg-white shadow-lg">
            <section className="py-5 border custom-border-container border-gray-bord border-l-primary">
              <section className="container grid-cols-2 lg:grid">
                <div className="">
                  <h2 className="mb-1 text-lg font-semibold">
                    SoftOffice бюлетин
                  </h2>
                  <p className="mb-3 text-sm text-dark-400 lg:max-w-lg">
                    Абонирайте се за нашият онлайн бюлетин, за да получавате
                    оферти от нашият онлайн магазин всеки месец!
                  </p>
                </div>
                <div className="relative flex items-center justify-center">
                  <form action="" className="lg:w-10/12">
                    <div className="flex flex-col items-center justify-center md:flex-row">
                      <div className="w-full mt-3 mb-2 lg:-mr-6">
                        <div className="relative mb-2 md:mb-0">
                          <div className="absolute left-0 lg:left-2 z-10 top-2.5 text-lg">
                            <Icons iconType="email" />
                          </div>
                          <input
                            className="w-full px-8 py-2 leading-tight placeholder-transparent border-b appearance-none lg:border peer focus:outline-none focus:shadow-outline border-gray text-dark"
                            id="email"
                            type="email"
                            placeholder="И-мейл за абонамент"
                            required={true}
                            name="email"
                          />
                          <label
                            className="absolute -top-3.5 lg:-top-5 left-0 block mb-2 text-sm  text-gray-darker peer-placeholder-shown:text-base peer-placeholder-shown:px-8  peer-placeholder-shown:top-1.5  transition-all duration-300"
                            htmlFor="email"
                          >
                            И-мейл за абонамент
                          </label>
                        </div>
                      </div>
                      <div className="text-sm md:mt-1 custom-border-input">
                        <BtnOutlined
                          text="изпрати"
                          type="submit"
                          custom="lg:hover:bg-primary-100 lg:hover:text-white"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </section>
    );
}

export default Newsletter;
