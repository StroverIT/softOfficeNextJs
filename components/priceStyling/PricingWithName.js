import React from 'react';
import Pricing from './Pricing';
import OldPrice from './OldPrice';

const PricingWithName = ({product, price, currQty}) => {

    const forItem = parseFloat(price.forItem * currQty)
    .toFixed(2)
    .split(".");
  const promoPrice = parseFloat(price.promoPrice * currQty)
    .toFixed(2)
    .split(".");


    return (
        !product.article.isCustomQty && (
            <section className="flex items-center justify-between border-b border-gray-bord ">
              {product.section.nameToDisplay != "Обадете се" && (
                <div className="text-lg font-bold">Цена:</div>
              )}
              {price?.forItem &&
                !price.promoPrice &&
                product.section.nameToDisplay != "Обадете се" && (
                  <Pricing price={forItem[0]} priceDec={forItem[1]} size="3xl" />
                )}
              {price?.promoPrice &&
                product.section.nameToDisplay != "Обадете се" && (
                  <div className="flex gap-x-5">
                    <div className="text-gray-200">
                      <OldPrice
                        price={forItem[0]}
                        priceDec={forItem[1]}
                        size="3xl"
                        NoDDSText={true}
                      />
                    </div>
                    <Pricing
                      price={promoPrice[0]}
                      priceDec={promoPrice[1]}
                      size="3xl"
                    />
                  </div>
                )}
              {/* If is on calling only */}
              {product.section.nameToDisplay == "Обадете се" && (
                <div className="flex flex-col items-center justify-center w-full py-4 text-xl font-bold">
                  <div className="font-normal text-[0.95rem]">
                    Обадете се за цена!
                  </div>
    
                  <div>088 888 4687</div>
                </div>
              )}
            </section>
          )
    );
}

export default PricingWithName;
