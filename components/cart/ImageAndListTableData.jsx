import React from "react";
import Image from "next/image";

import TableData from "./TableData";

export default function ImageAndListTableData({ image, listData, cartName }) {
  return (
    <>
      <TableData>
        <div className="flex items-center justify-center lg:justify-start">
          <div className="relative w-full h-40 sm:w-2/3 sm:h-60 lg:h-32 lg:w-40 ">
            <Image
              layout="fill"
              src="/images/testCarousel.jpg"
              alt="just for testing"
            />
          </div>
        </div>
      </TableData>
      <TableData classes="mt-3 sm:text-center lg:text-left xl:pl-2">
        <h3 className="">{cartName}</h3>
        <ul className="mt-2 text-xs text-gray-250">
          {listData.slice(0, 5).map((list) => {
            return (
              <li className="pb-1" key={list}>
                {list}
              </li>
            );
          })}
        </ul>
      </TableData>
    </>
  );
}
