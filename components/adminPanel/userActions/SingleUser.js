import React, { useState } from "react";
import { HiX } from "react-icons/hi";

// Components
import Outlined from "../../buttons/Outlined";
import Input from "../../form/AccInput";

// Menu components
import PersonalPromoMenu from "./PersonalPromo/Menu";
import BossMenu from "./bossMenu/Menu";
import AddWorkersMenu from "./AddWorkersMenu/Menu";

// Fetches
import PersonalPromotionFetch from "./PersonalPromo/Fetch";
import { BossFetch, BossActions } from "./bossMenu/Fetch";

// Notifications
import {
  toastPromise,
  toastHideAll,
  toastSuccess,
  toastError,
} from "../../../components/notificataions/Toast";
const SingleUser = ({ data, products }) => {
  const [subMenu, setSubMenu] = useState(null);

  const [generalPromo, setGeneralPromo] = useState("");
  const [newBossEmail, setNewBossEmail] = useState("");

  const [userState, setUserState] = useState(data);
  const verified = userState.isVerified ? "Да" : "Не";

  const [checkedProducts, setCheckedProducts] = useState(products);

  const [menu, setMenu] = useState(false);

  const [menuType, setMenuType] = useState(null);
  const [workers, setWorkers] = useState([]);
  const addPromotionsHandler = async () => {
    if (menuType == "addWorkers") {
      await bossHandlerActions({
        target: {
          id: "addWorkers",
        },
      });
      return;
    }
    if (menuType == "removeWorkers") {
      await bossHandlerActions({
        target: {
          id: "removeWorkers",
        },
      });
      return;
    }
    toastPromise("Изпраща се...");

    let resData = {};
    if (menuType == "promo") {
      resData = await PersonalPromotionFetch(
        checkedProducts,
        generalPromo,
        data._id
      );
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
  const bossHandlerActions = async (e) => {
    if (userState) {
      toastPromise("Изпраща се...");

      const action = e.target.id;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      if (action == "remove") {
        options.body = JSON.stringify({
          workers: userState.workers,
          bossId: userState._id,

          action,
        });
        setUserState((prevState) => ({ ...prevState, role: "user" }));
      }
      if (action == "addWorkers") {
        options.body = JSON.stringify({
          workers,
          action,
          bossId: userState._id,
        });
      }
      if (action == "removeWorkers") {
        options.body = JSON.stringify({
          workers,
          action,
          bossId: userState._id,
        });
      }
      if (action == "changeBoss") {
        options.body = JSON.stringify({
          action,
          bossId: userState._id,
          newBossEmail: newBossEmail.trim(),
        });
      }
      const data = await BossActions(options);

      toastHideAll();
      if (data?.error) toastError(data.error);

      if (data?.message) toastSuccess(data.message);
    }
  };

  const toggleBossEmailHand = () => {
    console.log(newBossEmail);

    if (newBossEmail) setNewBossEmail("");
    else setNewBossEmail(" ");
  };
  return (
    <>
      <section
        key={data._id}
        className="relative p-5 mb-5 border rounded-lg border-primary-100"
      >
        <div>
          Име : <span className="pl-1">{userState.fullName}</span>{" "}
        </div>
        <div>
          И-мейл : <span className="pl-1">{userState.email}</span>{" "}
        </div>
        <div>
          Телефон : <span className="pl-1">{userState.phoneNumber}</span>{" "}
        </div>
        <div>
          Потвърден ли е ? <span className="pl-1">{verified}</span>{" "}
        </div>
        <div>
          Роля : <span className="pl-1">{userState.role}</span>{" "}
        </div>
        <div>
          Създаден на : <span>{userState.createdAt}</span>{" "}
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
          {userState.role != "admin" && (
            <div>
              <Outlined type="button" text="Направи админ" id="admin" />
            </div>
          )}
          {userState.role != "boss" && (
            <div>
              <Outlined
                type="button"
                text="Направи Шеф"
                id="boss"
                onClick={menuHandler}
              />
            </div>
          )}
          {userState.role == "boss" && (
            <div className="flex flex-col items-end">
              <div className="py-2">
                <button
                  className="px-10 py-2 text-sm text-white border shadow-lg bg-secondary border-secondary hover:bg-transparent hover:text-secondary "
                  onClick={bossHandlerActions}
                  id="remove"
                >
                  Премахни шеф
                </button>
              </div>

              <div className="py-2">
                <button
                  onClick={menuHandler}
                  id="addWorkers"
                  className="px-10 py-2 text-sm text-white border shadow-lg bg-green border-green hover:bg-transparent hover:text-green"
                >
                  Добави работници
                </button>
              </div>
              <div className="py-2">
                <button
                  onClick={menuHandler}
                  id="removeWorkers"
                  className="px-10 py-2 text-sm text-white border shadow-lg bg-secondary border-secondary hover:bg-transparent hover:text-secondary"
                >
                  Премахни работници
                </button>
              </div>
              <div className="py-2">
                {newBossEmail && (
                  <div className="flex items-center justify-center mb-2">
                    <div>
                      <Input
                        placeholder="Новият и-мейл на шефа"
                        value={newBossEmail}
                        onChange={(e) => setNewBossEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <button
                        className="px-10 py-1 text-sm text-white border shadow-lg bg-green border-green hover:bg-transparent hover:text-green"
                        id="changeBoss"
                        onClick={bossHandlerActions}
                      >
                        Изпрати
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="px-10 py-2 text-sm text-white border shadow-lg bg-orange border-orange hover:bg-transparent hover:text-orange"
                  onClick={toggleBossEmailHand}
                >
                  Смени шеф - имейла
                </button>
              </div>
            </div>
          )}
          {userState.role == "admin" && (
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
                {menuType == "addWorkers" ||
                  (menuType == "removeWorkers" && (
                    <AddWorkersMenu workers={workers} setWorkers={setWorkers} />
                  ))}
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
