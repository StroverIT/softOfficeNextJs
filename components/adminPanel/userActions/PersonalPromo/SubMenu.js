import React, { useState } from "react";
// Components
import Checkbox from "../../../base/CheckBoxBase";
import Items from "./Items";
import Input from "../../../form/AccInput";

// Icons
import { IoArrowUndo } from "react-icons/io5";

const SubMenu = ({
  subItem,
  subIdx,
  product,
  index,
  setCheckedProducts,
  checkedProducts,
  subMenu,
  setSubMenu,
  itemsMenu,
  setItemsMenu,
}) => {
  const [innerItems, setInnerItems] = useState(false);

  const checkedHandler = () => {
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        product.subsection = product.subsection.map(
          (subsection, subsectionIdx) => {
            console.log(subsection);
            if (subIdx == subsectionIdx) {
              return { ...subsection, isSelected: !subsection.isSelected };
            }
            return subsection;
          }
        );
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };
  const openItemsMenu = () => {
    setItemsMenu(true);
    setInnerItems(true);
  };
  const closeItemsMenu = () => {
    setItemsMenu(false);
    setInnerItems(false);
  };
  const promoHandler = (e) => {
    if (e.target.value.length > 2) return;
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        product.subsection = product.subsection.map((sub, subLoopIdx) => {
          if (subLoopIdx == subIdx) {
            return { ...sub, customPromo: e.target.value, isSelected: true };
          }
          return sub;
        });
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };
  return (
    <div className="flex items-center gap-x-5">
      <Checkbox
        checked={subItem.isSelected}
        setChecked={checkedHandler}
        id={subItem._id}
        size="7"
      />

      <div className="flex items-center justify-center gap-x-2">
        <div className="mt-2">
          <Input
            id="promo"
            type="text"
            isReq={false}
            value={subItem.customPromo}
            onChange={promoHandler}
          />
        </div>
        %
      </div>

      <div onClick={openItemsMenu} className="cursor-pointer">
        {subItem.nameToDisplay}
      </div>
      {itemsMenu && innerItems && (
        <section className="fixed z-10 w-full h-full overflow-auto -translate-x-1/2 -translate-y-1/2 bg-gray-100 top-1/2 left-1/2">
          <div
            className="sticky ml-2 text-3xl cursor-pointer top-16 text-secondary "
            onClick={closeItemsMenu}
          >
            <IoArrowUndo />
          </div>
          <section className="mt-20 ml-10">
            {subItem.items.map((item, itemIdx) => {
              return (
                <Items
                  key={item._id}
                  item={item}
                  itemIdx={itemIdx}
                  index={index}
                  subIdx={subIdx}
                  setCheckedProducts={setCheckedProducts}
                  checkedProducts={checkedProducts}
                />
              );
            })}
          </section>
        </section>
      )}
    </div>
  );
};

export default SubMenu;
