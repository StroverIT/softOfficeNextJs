import { useEffect, useState } from "react";
import Checkbox from "../../base/Checkbox";
import AsideHeader from "./AsideHeader";

function ItemTypes({ type, allTypes, setFilters, filters }) {
  return (
    <div>
      <AsideHeader text={type} />
      {allTypes &&
        allTypes.map((itemType, index) => {
          return (
            <Checkbox
              key={itemType + index}
              text={itemType}
              id={`${type}: ${itemType}`}
              // quantity={2}
              filters={filters}
              setFilters={setFilters}
            />
          );
        })}
    </div>
  );
}

export default ItemTypes;
