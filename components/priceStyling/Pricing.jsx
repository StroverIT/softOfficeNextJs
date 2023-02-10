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
  xl: ["text-2xl", "text-xs", "mt-[4px]", "mt-[1px]", "mt-[9px]"],
  "2xl": ["text-3xl", "", "mt-[2px]", "", "mt-[11px]"],
  "3xl": ["text-4xl", "text-[18px]", "mt-[0px]", "mt-[2px]", "mt-[12px]"],
};
export default function Pricing({
  price,
  priceDec,
  size,
  isDDS = false,
  NoDDSText = false,
  padding = "py-3",
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${padding}`}>
      <div className={`flex`}>
        <div className={`font-semibold ${sizeDictionary[size][0]}`}>
          {price}
        </div>
        <div
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
      )}
    </div>
  );
}
