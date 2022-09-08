import React, { useState } from "react";
// Components
import Outlined from "../../../buttons/Outlined";
import Input from "../../../form/AccInput";
import PersonalPromoList from "./List";

const PersonalPromoMenu = ({
  products,
  generalPromo,
  setGeneralPromo,
  checkedProducts,
  setCheckedProducts,
  subMenu,
  setSubMenu,
}) => {
  const generalPromoHandler = (e) => {
    setGeneralPromo(e.target.value);
  };
  const checkAll = () => {
    const allChecked = checkedProducts.map((product) => {
      return { ...product, isSelected: true };
    });
    setCheckedProducts(allChecked);
  };
  const uncheckAll = () => {
    const allChecked = checkedProducts.map((product) => {
      return { ...product, isSelected: false };
    });
    setCheckedProducts(allChecked);
  };

  return (
    <section className="">
      {/* Buttons */}
      <section className="flex items-center justify-between ">
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

        <div className="">
          <Input
            placeholder="Обща промоция"
            id="section"
            type="text"
            isReq={false}
            value={generalPromo}
            onChange={generalPromoHandler}
          />
        </div>
      </section>
      <section className="z-10">
        <table className="w-full table-fixed">
          <thead>
            <th className="text-left">№</th>
            <th className="text-left">Добавено?</th>
            <th className="text-left">Промоция за секцията</th>
            <th className="text-left">Име на секцията</th>
          </thead>
          <tbody className="">
            {checkedProducts &&
              checkedProducts.map((product, index) => {
                return (
                  <PersonalPromoList
                    key={product._id}
                    product={product}
                    index={index}
                    checkedProducts={checkedProducts}
                    setCheckedProducts={setCheckedProducts}
                    subMenu={subMenu}
                    setSubMenu={setSubMenu}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default PersonalPromoMenu;
