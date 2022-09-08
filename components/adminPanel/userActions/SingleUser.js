import React, { useState } from "react";
import { HiX } from "react-icons/hi";

// Components
import Outlined from "../../buttons/Outlined";
import PersonalPromoMenu from "./PersonalPromo/Menu";
import BossMenu from "./bossMenu/Menu";
// Fetches
import PersonalPromotionFetch from "./PersonalPromo/Fetch";
import BossFetch from "./bossMenu/Fetch";

// Notifications
import {
  toastPromise,
  toastHideAll,
  toastSuccess,
  toastError,
} from "../../../components/notificataions/Toast";
const SingleUser = ({ data, products }) => {
  const [subMenu, setSubMenu] = useState(null);

  const verified = data.isVerified ? "Да" : "Не";
  const [generalPromo, setGeneralPromo] = useState("");
  const [checkedProducts, setCheckedProducts] = useState(products);

  const [menu, setMenu] = useState(false);

  const [menuType, setMenuType] = useState(null);
  const [workers, setWorkers] = useState([]);
  const addPromotionsHandler = async () => {
    toastPromise("Изпраща се...");
    let resData = {};
    if (menuType == "promo") {
      resData = await PersonalPromotionFetch(checkedProducts, generalPromo);
    }
    if (menuType == "boss") {
      resData = await BossFetch({ workers, bossId: data._id });
    }
    toastHideAll();
    if (resData?.error) toastError(resData.error);

    if (resData?.message) toastSuccess(resData.message);
  };

  const menuHandler = (e) => {
    const id = e.target.id;

    setMenuType(id);

    setMenu(!menu);
  };
  return (
    <>
      <section
        key={data._id}
        className="relative p-5 mb-5 border rounded-lg border-primary-100"
      >
        <div>
          Име : <span className="pl-1">{data.fullName}</span>{" "}
        </div>
        <div>
          И-мейл : <span className="pl-1">{data.email}</span>{" "}
        </div>
        <div>
          Телефон : <span className="pl-1">{data.phoneNumber}</span>{" "}
        </div>
        <div>
          Потвърден ли е ? <span className="pl-1">{verified}</span>{" "}
        </div>
        <div>
          Роля : <span className="pl-1">{data.role}</span>{" "}
        </div>
        <div>
          Създаден на : <span>{data.createdAt}</span>{" "}
        </div>
        <section className="flex items-center justify-end mt-4 text-xs gap-x-2">
          <div>
            <Outlined
              type="button"
              text="Добави Промоция"
              onClick={menuHandler}
              id="promo"
            />
          </div>
          {data.role != "admin" && (
            <div>
              <Outlined type="button" text="Направи админ" id="admin" />
            </div>
          )}
          {data.role != "boss" && (
            <div>
              <Outlined
                type="button"
                text="Направи Шеф"
                id="boss"
                onClick={menuHandler}
              />
            </div>
          )}
          {data.role == "admin" && (
            <div>
              <Outlined type="button" text="Направи user" />
            </div>
          )}
        </section>
      </section>
      {menu && (
        <section className="fixed top-0 left-0 z-20 w-screen h-screen ">
          <div className="relative">
            <div
              className="relative z-10 w-full h-screen cursor-pointer blury-noProps"
              onClick={menuHandler}
            ></div>
            <section
              className={`absolute z-20 w-full overflow-auto -translate-x-1/2 -translate-y-1/2 bg-gray-100 h-2/3 md:h-2/3 md:w-11/12 top-1/2 left-1/2 ${
                subMenu && "overflow-hidden"
              }`}
            >
              <div className="container ">
                <div className="sticky z-50 flex mb-10 top-5">
                  <div className="flex items-end justify-end w-full cursor-pointer">
                    <button
                      type="button"
                      className="flex px-10 py-1 text-lg text-white rounded-lg bg-green "
                      onClick={addPromotionsHandler}
                    >
                      Изпрати
                    </button>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-end h-full">
                      <div
                        className="flex items-center justify-center px-2 py-1 text-2xl text-white rounded-full cursor-pointer bg-primary-100"
                        onClick={menuHandler}
                      >
                        <HiX />
                      </div>
                    </div>
                  </div>
                </div>
                {menuType == "promo" && (
                  <PersonalPromoMenu
                    products={products}
                    generalPromo={generalPromo}
                    setGeneralPromo={setGeneralPromo}
                    checkedProducts={checkedProducts}
                    setCheckedProducts={setCheckedProducts}
                    subMenu={subMenu}
                    setSubMenu={setSubMenu}
                  />
                )}
                {menuType == "boss" && (
                  <BossMenu workers={workers} setWorkers={setWorkers} />
                )}
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleUser;
