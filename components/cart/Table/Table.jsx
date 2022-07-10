// NextJs
import Image from "next/image";
// Icons
import { HiX } from "react-icons/hi";
// Components
import QuanityInput from "../../base/QuanityInput";
import TableData from "./TableData";
import Price from "../../priceStyling/Pricing";

function Table() {
  return (
    <table className="w-full table-auto ">
      <thead className="bg-gray-100 text-gray-250">
        <tr className="hidden mb-1 lg:table-row ">
          <th colSpan={2} className="py-3 text-left ">
            Продукт
          </th>
          <th colSpan={1} className="px-5 py-3">
            Цена
          </th>
          <th colSpan={1} className="px-5 py-3">
            Количество
          </th>
          <th colSpan={1} className="px-5 py-3 text-left">
            Общо
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-[#e4e7e6] flex flex-wrap lg:table-row justify-between items-center pb-3 mb-3">
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
            <h3 className="">АКУМУЛАТОРЕН КОМПЛЕКТ EINHELL TE-TK 12 Li</h3>
            <ul className="mt-2 text-xs text-gray-250">
              <li className="pb-1">ИНСТРУМЕНТ 1 : АКУМУЛАТОРНА БОРМАШИНА</li>
              <li className="pb-1">
                ИНСТРУМЕНТ 2 : МУЛТИФУНКЦИОНАЛНО УСТРОЙСТВО
              </li>
              <li className="pb-1">
                ИНСТРУМЕНТ 3 : АКУМУЛАТОРЕН ФЕНЕР ТИП БАТЕРИЯ : Li-Ion
              </li>
              <li className="pb-1">НАПРЕЖЕНИЕ : 12.00 V</li>
            </ul>
          </TableData>

          {/* MObile version */}
          <td className="flex flex-col justify-center w-full mt-5 lg:hidden">
            <div className="flex items-center justify-center my-1 ">
              <div className="lg:px-3 flex flex-col sm:items-start sm:-mb-[3rem] sm:mx-auto sm:ml-2 w-full">
                <div className="text-sm text-center text-gray-250 ">
                  Ед. цена
                </div>
                <Price priceDec={20} price={100} size="2xl" />
              </div>

              <div className="lg:px-3 flex flex-col sm:items-end sm:-mb-[3rem] sm:mx-auto sm:mr-2 w-full">
                <div className="text-sm text-center text-gray-250 ">Общо</div>
                <Price priceDec={48} price={200} size="2xl" />
              </div>
            </div>
            <div>
              <QuanityInput contClass="w-1/2 mx-auto mt-2 lg:mt-10" />
              <div className="flex items-center justify-center mt-2 ">
                <button
                  type="button"
                  className="flex items-center justify-center cursor-pointer text-gray-darker"
                >
                  <div className="mt-[0.25px]">
                    <HiX />
                  </div>
                  <div>Премахни</div>
                </button>
              </div>
            </div>
          </td>

          {/* Large screen version */}
          <TableData classes="lg:px-3 hidden lg:table-cell">
            <Price priceDec={20} price={100} size="2xl" />
          </TableData>
          <TableData classes="hidden lg:table-cell">
            <QuanityInput contClass="w-1/2 mx-auto mt-2 lg:mt-10" />
            <div className="flex items-center justify-center mt-2">
              <button
                type="button"
                className="flex items-center justify-center cursor-pointer text-gray-darker"
              >
                <div className="mt-[0.25px]">
                  <HiX />
                </div>
                <div>Премахни</div>
              </button>
            </div>
          </TableData>
          <TableData classes=" lg:px-3 hidden lg:table-cell">
            <Price priceDec={48} price={200} size="2xl" />
          </TableData>
        </tr>
      </tbody>
    </table>
  );
}
export default Table;
