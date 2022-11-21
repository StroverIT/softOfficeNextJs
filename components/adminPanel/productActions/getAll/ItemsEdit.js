import React, { useState } from "react";

import Input from "./Input";

const ItemsEdit = ({ inputs, index, itemIdx, changeHandler }) => {
  const inputSakrateno = inputs.subsection[index].items[itemIdx];
  const [isPromo, setIsPromo] = useState(false);

  const promoHandler = () => {
    setIsPromo(!isPromo);

    changeHandler(
      {
        target: {
          name: "isOnPromotions",
          value: !isPromo,
        },
      },
      index,
      itemIdx
    );

    changeHandler(
      {
        target: {
          name: "promotionalPrice",
          value: "",
        },
      },
      index,
      itemIdx
    );
  };
  const apiPromoHandler = async (formData, indexes) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ data: formData, indexes }),
    };
    const res = await fetch(`/api/promotions/create`, options);
    const data = await res.json();
  };

  const subsec = inputs.subsection[index];
  const item = subsec.items[itemIdx];
  const imgUrl = subsec.img?.originalname || subsec.img[0]?.originalname;

  return (
    <section key={itemIdx} className="p-5 mb-2 border border-primary-500">
      <div className="flex justify-end ">
        <div className="flex flex-col justify-end">
          <button
            type="button "
            className="px-2 py-1 mb-2 text-white border border-primary bg-primary hover:bg-transparent hover:text-primary-100"
            onClick={promoHandler}
          >
            {isPromo ? "Откажи" : "Сложи в промоция"}
          </button>
          <div>
            {isPromo && (
              <div className="flex flex-col justify-end">
                <Input
                  id="promotionalPrice"
                  text="Нова цена"
                  holder="Нова цена"
                  value={inputSakrateno.promotionalPrice}
                  handler={(e) => changeHandler(e, index, itemIdx)}
                />
                <button
                  type="button "
                  className="w-20 px-2 py-1 mt-2 text-white border border-green bg-green hover:bg-transparent hover:text-green"
                  onClick={() => {
                    console.log(subsec.img);
                    apiPromoHandler(
                      {
                        itemLen: subsec.items.length,
                        section: {
                          name: inputs.name,
                          nameToDisplay: inputs.nameToDisplay,
                        },
                        subsection: {
                          _id: subsec._id,
                          tiput: subsec.tiput,
                          nameToDisplay: subsec.nameToDisplay,
                          opisanie: subsec.opisanie,
                          imgUrl,
                        },
                        item: {
                          _id: item._id,
                          katNomer: item.katNomer,
                          cena: item.cena,
                          promotionalPrice: item.promotionalPrice,
                          tipove: item.tipove,
                          isOnlyNumb: item.isOnlyNumb,
                        },
                      },
                      { subsecIdx: index, itemIdx }
                    );
                  }}
                >
                  Изпрати
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Input
        id="cena"
        text="Цена"
        holder="цена"
        value={inputSakrateno?.cena}
        handler={(e) => changeHandler(e, index, itemIdx)}
      />

      <Input
        id="katNomer"
        text="Кат. номер"
        holder="Кат. номер"
        value={inputSakrateno?.katNomer}
        handler={(e) => changeHandler(e, index, itemIdx)}
      />
      <Input
        id="isOnPromotions"
        text="На промоция ли е "
        holder="На промоция ли е"
        value={inputSakrateno?.isOnPromotions}
        handler={(e) => changeHandler(e, index, itemIdx)}
      />

      <label htmlFor="types">Типове</label>
      <textarea
        name="tipove"
        id="tipove"
        value={inputSakrateno?.tipove}
        className="w-full p-2 pl-5 text-lg font-semibold min-h-20 bg-primary-0 text-dark"
        onChange={(e) => changeHandler(e, index, itemIdx)}
      ></textarea>
    </section>
  );
};

export default ItemsEdit;
