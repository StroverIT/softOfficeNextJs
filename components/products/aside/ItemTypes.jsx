import Checkbox from "../../base/Checkbox";
import AsideHeader from "./AsideHeader";

function ItemTypes({ type, allTypes, setFilters }) {
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
