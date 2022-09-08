import React from "react";
// Components
import Checkbox from "../../../base/CheckBoxBase";
import Input from "../../../form/AccInput";

const Items = ({
  item,
  itemIdx,
  index,
  subIdx,
  setCheckedProducts,
  checkedProducts,
}) => {
  const checkedHandler = () => {
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        product.subsection = product.subsection.map(
          (subsection, subsectionIdx) => {
            if (subIdx == subsectionIdx) {
              subsection.items = subsection.items.map((item, itemLoopIdx) => {
                if (itemIdx == itemLoopIdx) {
                  return { ...item, isSelected: !item.isSelected };
                }
                return item;
              });
            }
            return subsection;
          }
        );
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };
  const promoHandler = (e) => {
    if (e.target.value.length > 2) return;
    const changedChacked = checkedProducts.map((product, productIdx) => {
      if (productIdx == index) {
        product.subsection = product.subsection.map((sub, subLoopIdx) => {
          if (subLoopIdx == subIdx) {
            sub.items = sub.items.map((itm, itmIdx) => {
              if (itmIdx == itemIdx) {
                return {
                  ...itm,
                  customPromo: e.target.value,
                  isSelected: true,
                };
              }
              return itm;
            });
          }
          return sub;
        });
      }
      return product;
    });
    setCheckedProducts(changedChacked);
  };
  return (
    <section className="flex items-center justify-center mb-2 gap-x-6 gap-y-6">
      <div>
        <Checkbox
          checked={item.isSelected}
          setChecked={checkedHandler}
          id={item._id}
          size="7"
        />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <div className="mt-2">
          <Input
            id="promo"
            type="text"
            isReq={false}
            value={item.customPromo}
            onChange={promoHandler}
          />
        </div>
        %
      </div>
      <div>{item.katNomer}</div>
      <div>{item.tipove}</div>
    </section>
  );
};

export default Items;
