import React from "react";

// based on this dictionary fix:
/*
1. Margin on pricedec
2. text-{somethin} on price
3. text-{something} on priceDec

INDEXES:
0 - price SIZING
1 - price dec sizing
2 - decimal container spacing
3- first Dec spacing
4- leva spacing
*/

const sizeDictionary = {
  sm: ["text-xl", "text-[11px]", "mt-[4px]", "mt-[0.2px]", "mt-[8px] ml-[2px]"],
<<<<<<< HEAD
  xl: ["text-2xl", "text-xs", "mt-[4px]", "mt-[1px]", "mt-[9px]"],
  "2xl": ["text-3xl", "", "mt-[2px]", "", "mt-[11px]"],
  "3xl": ["text-4xl", "text-[18px]", "mt-[0px]", "mt-[2px]", "mt-[12px]"],
=======
  xl: ["text-2xl", "text-xs", "mt-[4px]", "mt-[1px]", "mt-[8px]"],
  "2xl": ["text-3xl", "text-sm", "mt-[5px]", "mt-[1px]", "mt-[9px]"],
  "3xl": ["text-4xl", "", "mt-[2px]", "mt-[3px]", "mt-[11px]"],
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
};
export default function Pricing({
  price,
  priceDec,
  size,
<<<<<<< HEAD

=======
  textColor,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  isDDS = false,
  NoDDSText = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-3">
      <div className={`flex`}>
        <div className={`font-semibold ${sizeDictionary[size][0]}`}>
          {price}
        </div>
        <div
<<<<<<< HEAD
          className={`relative flex flex-col items-center h-full font-semibold ${sizeDictionary[size][1]} ${sizeDictionary[size][2]} `}
        >
          <div className={`h-0 ${sizeDictionary[size][3]} `}>{priceDec}</div>
          <div className={`h-0 ml-1 ${sizeDictionary[size][4]}  `}>лв.</div>
        </div>
      </div>
      {!NoDDSText && (
        <div className="pb-1 text-xs text-gray-200">
          {isDDS ? "с включено" : "Без"} ДДС
        </div>
=======
          className={`relative flex flex-col items-center h-full ${sizeDictionary[size][1]} ${sizeDictionary[size][2]} `}
        >
          <div className={`h-0 ${sizeDictionary[size][3]} `}>{priceDec}</div>
          <div
            className={`h-0 ${sizeDictionary[size][4]} ${
              textColor ? textColor : "text-primary"
            } `}
          >
            лв.
          </div>
        </div>
      </div>
      {!NoDDSText && (
        <div className="pb-1 text-xs">{isDDS ? "с включено" : "Без"} ДДС</div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      )}
    </div>
  );
}
