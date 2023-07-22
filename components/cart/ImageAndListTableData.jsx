import React from "react";
import Image from "next/image";
import Link from "next/link";
import TableData from "./TableData";

export default function ImageAndListTableData({
  imageUrl,
  cartName,
  route,
  moreInfo,
}) {
  return (
    <>
      <TableData>
        <div className="flex items-center justify-center lg:justify-start">
          <Link href={route}>
            <div className="relative w-full cursor-pointer h-28 sm:w-2/3 lg:h-32 lg:w-40 ">
              <Image
                layout="fill"
                src={
                  imageUrl.includes("https") ? imageUrl : `/uploads/${imageUrl}`
                }
                alt="just for testing"
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </TableData>
      <TableData classes="mt-3 text-center lg:text-left xl:pl-2">
        <Link href={route}>
          <h3 className="text-xl font-semibold cursor-pointer max-lg:mb-2">{cartName} </h3>
        </Link>
        <ul className="text-left max-lg:grid max-lg:grid-cols-2 gap-x-2 gap-y-2">
          {moreInfo?.tipove
            ?.split(";")
            .splice(0, 5)
            .map((type) => {
              return (
                <li key={type} className="text-xs">
                  {type}
                </li>
              );
            })}
        </ul>
        <div className="mt-1 text-xs text-left">Кат. номер: {moreInfo.katNomer}</div>
      </TableData>
    </>
  );
}
