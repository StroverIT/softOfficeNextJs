import React from "react";
import Image from "next/image";
import Link from "next/link";
import TableData from "./TableData";

export default function ImageAndListTableData({
<<<<<<< HEAD
  imageUrl,
  cartName,
  route,
  moreInfo,
=======
  image,
  listData,
  cartName,
  route,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
}) {
  return (
    <>
      <TableData>
        <div className="flex items-center justify-center lg:justify-start">
          <Link href={route}>
<<<<<<< HEAD
            <div className="relative w-full cursor-pointer h-60 sm:w-2/3 sm:h-60 lg:h-32 lg:w-40 ">
              <Image
                layout="fill"
                src={`/uploads/${imageUrl}`}
=======
            <div className="relative w-full h-40 cursor-pointer sm:w-2/3 sm:h-60 lg:h-32 lg:w-40 ">
              <Image
                layout="fill"
                src="/images/testCarousel.jpg"
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                alt="just for testing"
              />
            </div>
          </Link>
        </div>
      </TableData>
      <TableData classes="mt-3 text-center lg:text-left xl:pl-2">
        <Link href={route}>
<<<<<<< HEAD
          <h3 className="cursor-pointer">{cartName} </h3>
        </Link>
        <ul>
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
        <div className="text-xs ">Катномер: {moreInfo.katNomer}</div>
=======
          <h3 className="cursor-pointer">{cartName}</h3>
        </Link>
        <ul className="mt-2 text-xs text-gray-250">
          {listData.slice(0, 5).map((list) => {
            return (
              <li className="pb-1" key={list}>
                {list}
              </li>
            );
          })}
        </ul>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </TableData>
    </>
  );
}
