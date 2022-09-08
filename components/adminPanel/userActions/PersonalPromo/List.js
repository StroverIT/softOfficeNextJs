import React, { useState, useEffect } from "react";
// Components
import Input from "../../../form/AccInput";
import CheckBox from "../../../base/CheckBoxBase";
import SubMenu from "./SubMenu";

// Icons
import { IoArrowUndo } from "react-icons/io5";
import Outlined from "../../../buttons/Outlined";

const PersonalPromoList = ({
  product,
  index,
  setCheckedProducts,
  checkedProducts,
  subMenu,
  setSubMenu,
}) => {
  const [innerSub, setInnerSub] = useState(false);
  const [itemsMenu, setItemsMenu] = useState(false);
  const promoHandler = (e) => {
    if (e.target.value.length > 2) return;
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        return { ...product, customPromo: e.target.value, isSelected: true };
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };

  const checkedHandler = (input, e) => {
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        return { ...product, isSelected: !product.isSelected };
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };
  const openSubMenu = () => {
    setInnerSub(true);

    setSubMenu(true);
  };

  const closeSubMenu = () => {
    setInnerSub(false);

    setSubMenu(false);
  };

  const checkAll = () => {
    const allChecked = checkedProducts.map((product, productLoopIdx) => {
      if (productLoopIdx == index) {
        product.subsection = product.subsection.map((sub) => {
          return { ...sub, isSelected: true };
        });
      }
      return product;
    });
    setCheckedProducts(allChecked);
  };
  const uncheckAll = () => {
    const allChecked = checkedProducts.map((product, productLoopIdx) => {
      if (productLoopIdx == index) {
        product.subsection = product.subsection.map((sub) => {
          return { ...sub, isSelected: false };
        });
      }
      return product;
    });
    setCheckedProducts(allChecked);
  };
  const subsectionGeneralPromo = (e) => {};
  return (
    <tr className="">
      <td className="">{index}</td>
      <td>
        <div className="ml-4">
          <CheckBox
            checked={product.isSelected}
            setChecked={checkedHandler}
            id={product._id}
            size="7"
          />
        </div>
      </td>
      <td className="relative ">
        <div className="w-[45px] text-center ml-10 ">
          <Input
            id="promo"
            type="text"
            isReq={false}
            value={product.customPromo}
            onChange={promoHandler}
          />
          <div className="absolute text-lg font-semibold left-24 top-2">%</div>
        </div>
      </td>
      <td className="">
        <div onClick={openSubMenu} className="cursor-pointer">
          {product.nameToDisplay}_{product.name}
        </div>
        {subMenu && innerSub && (
          <div
            className={`fixed z-10 w-full h-full overflow-auto -translate-x-1/2 -translate-y-1/2 bg-gray-100 top-1/2 left-1/2 ${
              itemsMenu && "overflow-hidden"
            }`}
          >
            <div
              className="sticky ml-2 text-3xl cursor-pointer top-16 text-secondary "
              onClick={closeSubMenu}
            >
              <IoArrowUndo />
            </div>
            <section className="mt-20 ml-10 ">
              <div className="flex gap-x-5 ">
                <div>
                  <Outlined
                    text="Избери всички"
                    type="button"
                    custom="text-sm"
                    onClick={checkAll}
                  />
                </div>
                <div>
                  <button
                    onClick={uncheckAll}
                    className="px-10 py-2 border border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white"
                  >
                    Отметни всички
                  </button>
                </div>
              </div>

              {product.subsection.map((subItem, subIdx) => {
                return (
                  <SubMenu
                    key={subItem._id}
                    subItem={subItem}
                    subIdx={subIdx}
                    product={product}
                    index={index}
                    setCheckedProducts={setCheckedProducts}
                    checkedProducts={checkedProducts}
                    subMenu={subMenu}
                    setSubMenu={setSubMenu}
                    itemsMenu={itemsMenu}
                    setItemsMenu={setItemsMenu}
                  />
                );
              })}
            </section>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PersonalPromoList;
