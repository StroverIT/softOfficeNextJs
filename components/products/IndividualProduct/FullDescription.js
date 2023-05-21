import React from 'react';

const FullDescription = ({product}) => {
    return (
        <section className="mt-16 mb-5 shadow-2xl p-7 ">
        <h3 className="py-2 ml-4 text-2xl font-semibold sm:ml-8 text-primary">
          Пълно описание
        </h3>
        <div className="container flex px-3 pb-6 ml-4 sm:ml-10">
          <ul className="mb-1 list-disc">
            {product?.article?.items[0].tipove.split(";").map((type) => {
              return <li key={type}>{type}</li>;
            })}
            {product?.article?.opisanie &&
              product?.article?.opisanie.split(";").map((description) => {
                return <li key={description}>{description}</li>;
              })}
          </ul>{" "}
        </div>
      </section>
    );
}

export default FullDescription;
