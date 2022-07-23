import { useEffect, useState } from "react";
import Checkbox from "../../base/Checkbox";
import AsideHeader from "./AsideHeader";

function ItemTypes({ type, allTypes, setFilters, filters }) {
  const [checked, setChecked] = useState(false);
  const changeHandler = (e) => {
    const isChecked = e.target.checked;
    const data = e.target.dataset.type;

    // If true add to filters
    if (isChecked) {
      setFilters((prevState) => ({
        ...prevState,
        types: [...prevState.types, data],
      }));
      // Else remove from filters
    } else {
      setFilters((prevState) => ({
        ...prevState,
        types: [...prevState.types.filter((type) => type != data)],
      }));
    }
  };
  useEffect(() => {
    if (filters.types.length <= 0) {
      setChecked(false);
    }
  }, [filters]);
  return (
    <div>
      <AsideHeader text={type} />
      {allTypes &&
        allTypes.map((itemType) => {
          return (
            <div onChange={changeHandler} key={itemType}>
              <Checkbox
                text={itemType}
                id={`${type}: ${itemType}`}
                checked={checked}
                setChecked={setChecked}
                quantity={2}
                onChange={changeHandler}
              />
            </div>
          );
        })}
    </div>
  );
}

export default ItemTypes;
