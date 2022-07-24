import React from "react";

function TableData({ children, classes }) {
  return (
    <td
      className={`w-full lg:w-auto ${classes ? classes : ""} lg:pt-10 lg:pb-5`}
    >
      {children}
    </td>
  );
}
export default TableData;
