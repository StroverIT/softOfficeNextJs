import React from "react";

// NextJs
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

// Components
import PricingPromo from "../components/priceStyling/PricingPromo";

const Promotions = ({ promotions }) => {
  const router = useRouter();

  return (
    <>
      <Head></Head>
      <main className="container my-10">
        <div className="grid space-x-4 space-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {promotions?.map((promo) => {
            const product = promo.product;
            const sum =
              (product.item.promotionalPrice / product.item.cena) * 100;
            const percentageRate = (100 - sum).toFixed(2).split(".");
            let pageUrl =
              product.itemLen > 1
                ? `${product.section.name}/${product.subsection._id}#${product.item._id}`
                : `${product.section.name}/${product.subsection._id}`;
            const name = `${product.section.nameToDisplay} ${product.subsection.nameToDisplay}`;
            return (
              <section
                className="relative flex flex-col my-2 bg-white shadow-lg cursor-pointer hover:shadow-xl "
                key={promo._id}
              >
                <div
                  onClick={() => router.push(`/products/${pageUrl}`)}
                  className="flex flex-col justify-between h-full "
                >
                  <div className="">
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="relative h-60 w-60 ">
                        <Image
                          src={`/uploads/${
                            product.subsection && product?.subsection?.imgUrl
                          }`}
                          layout="fill"
                          alt={product.subsection.imgUrl}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div
                      className={`container py-2 font-medium text-center border-t border-gray `}
                    >
                      <div className="text-xl">{name}</div>
                      {!promo.moreThanOne && (
                        <ul className="text-sm font-normal ">
                          {product.item.tipove
                            .split(";")
                            .splice(0, 5)
                            .map((type) => {
                              return <li key={type}>{type}</li>;
                            })}
                        </ul>
                      )}
                      {promo.moreThanOne && (
                        <div className="flex items-center justify-center mt-10 text-xl text-primary-100 ">
                          <div className="w-1/2">
                            Вижте всички промоционални продукти на тази серия
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!promo.moreThanOne && (
                    <PricingPromo
                      price={product.item.cena}
                      promoPrice={product.item.promotionalPrice}
                    />
                  )}
                </div>
                {!promo.moreThanOne && (
                  <div className="absolute z-50 p-2 text-sm text-white rounded-full -top-2 -right-2 bg-primary-100">
                    -{percentageRate[0]}%
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Promotions;

export async function getServerSideProps(context) {
  const promotionsRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/promotions/getAll`
  );
  const data = await promotionsRes.json();

  return {
    props: { promotions: data }, // will be passed to the page component as props
  };
}
