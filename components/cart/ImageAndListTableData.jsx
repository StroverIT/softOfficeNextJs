import React from "react";
import Image from "next/image";
import Link from "next/link";
import TableData from "./TableData";

export default function ImageAndListTableData({ imageUrl, cartName, route }) {
  return (
    <>
      <TableData>
        <div className="flex items-center justify-center lg:justify-start">
          <Link href={route}>
            <div className="relative w-full h-60 cursor-pointer sm:w-2/3 sm:h-60 lg:h-32 lg:w-40 ">
              <Image
                layout="fill"
                src={`/uploads/${imageUrl}`}
                alt="just for testing"
              />
            </div>
          </Link>
        </div>
      </TableData>
      <TableData classes="mt-3 text-center lg:text-left xl:pl-2">
        <Link href={route}>
          <h3 className="cursor-pointer">{cartName}</h3>
        </Link>
      </TableData>
    </>
  );
}
