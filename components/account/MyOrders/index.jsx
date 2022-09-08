import React from "react";
// Icons
// Components
import { TableRow } from "./TableRow";

export default function MyOrders({ deliveriesData }) {
  return (
    <section className="">
      <h2 className="mt-5 mb-2 text-3xl font-semibold text-center">
        Направените от вас поръчки
      </h2>
      {/* If no orders */}
      {deliveriesData.length === 0 && (
        <div className="pb-10 text-center text-secondary">
          Нямате направени поръчки
        </div>
      )}
      {deliveriesData.length > 0 && (
        <table className="w-full h-full mt-10 table-auto my-table-spacing">
          <thead>
            <tr className="text-center text-white bg-primary">
              <th className="py-2">Поръчка</th>
              <th className="hidden sm:table-cell">Дата</th>
              <th className="hidden sm:table-cell">Общо</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center divide-y-2 divide-gray">
            {deliveriesData.map((delivery) => {
              return (
                <TableRow
                  key={delivery._id}
                  id={`#${delivery._id.substring(0, 10)}`}
                  date={delivery.createdAt}
                  total={delivery.totalPrice}
                  status={delivery.status}
                  fullData={delivery}
                />
              );
            })}
            {/* <TableRow
            id="#12312541"
            date="12.02.2022"
            total={12.22}
            status="progress"
            isOld={true}
          /> */}
            {/* <TableRow
            id="#12312541"
            date="12.02.2022"
            total={12.22}
            status="sent"
          />
          <TableRow
            id="#12312541"
            date="12.02.2022"
            total={12.22}
            status="returned"
          /> */}
          </tbody>
        </table>
      )}
    </section>
  );
}
