import { useRef, useState, useEffect, Fragment } from "react";

// NextJs
import Head from "next/head";
import { getSession } from "next-auth/react";
// Headless ui
import { Tab } from "@headlessui/react";
// Components
import RadioButton from "../components/cart/RadioButton";
import Input from "../components/cart/Input";
import Price from "../components/priceStyling/Pricing";
import BtnOutlined from "../components/buttons/Outlined";
import MagazinePanel from "../components/delivery/MagazinePanel";
import DeliveryPanel from "../components/delivery/DeliveryPanel";
import ListBoxSearch from "../components/base/ListBoxSearch";

// Utils
import { DELIVERY, MAGAZINE, EKONT } from "../components/cart/cartCostants";
// Fetches Ekont
import getBgCities from "../utils/getBgCities";

// Notifications
import {
  toastHideAll,
  toastSuccess,
  toastError,
  toastPromise,
} from "../components/notificataions/Toast";
// Redux
import { connect } from "react-redux";
import { adjustQty, removeFromCart } from "../redux/actions/productActions";
import { getFullData } from "../services/userService";
// Icons

import { GrLocation } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineComment, AiOutlineCar } from "react-icons/ai";

// Inline constants
const CARD_PAYMENT = "cardPayment";

function Delivery({ cart, userData, cities }) {
  const [selected, setSelected] = useState(cities[21]);

  const [orderState, typeOfOrder] = useState(MAGAZINE);
  const [paymentState, setTypePayment] = useState("cashOnDelivery");
  const [priceState, setPriceState] = useState({
    subTotal: 0,
    totalPrice: 0,
    delivery: 0,
    dds: 0,
  });
  const [inputs, setInputs] = useState({
    name: "",
    telephone: "",
    city: "",
    zipCode: "",
    address: "",
    comment: "",
  });

  const createDelivery = async () => {
    if (!priceState) {
      priceState = {
        totalPrice: subtotal,
        deliveryFee: ["0", "00"],
      };
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        formData: inputs,
        totalPrice: priceState,
        typeOfDelivery: orderState,
      }),
    };
    const res = await fetch("/api/cart/createDelivery", options);
    const message = await res.json();
    //  Tostify while sending to show изпраща се. When is success to show the message otherwise to show the error message. And to clear the cart
    toastHideAll();
    if (message.error) {
      toastError(message.error);
    }
    if (message.message) {
      toastSuccess(message.message);
    }
  };

  const changePaymentHandler = (e) => {
    const name = e.target.name;
    setTypePayment(name);
  };
  const changeOrderHandler = (e) => {
    const name = e.target.name;
    typeOfOrder(name);
  };
  const changeInputHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    let subTotal = parseFloat(
      cart
        .map((item) => {
          return item.item.price * item.qty;
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
    );

    let dds = subTotal * 0.2;
    let state = {
      delivery: 0,
      totalPrice: subTotal + dds,
      dds,
      subTotal,
    };
    console.log(state);
    if (selected.cityName == "София") {
      setPriceState(() => state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  return (
    <>
      <Head>
        <title>IvdaGeo</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>
      <main className="mt-10 mb-16">
        <section className="container">
          <section className="border shadow-md border-gray">
            {/* Населено място */}
            <section>
              <div className="flex items-center py-2 pl-3 text-lg bg-gray-300 border-b border-gray-150">
                <div>
                  <GrLocation />
                </div>
                <h3 className="pl-1">Населено място</h3>
              </div>
              <section className="my-10">
                <ListBoxSearch
                  selected={selected}
                  setSelected={setSelected}
                  data={cities}
                />
              </section>
            </section>
            {/* Метод на доставка */}
            <section>
              <div className="flex items-center py-2 pl-3 text-lg bg-gray-300 border-y border-gray-150">
                <div>
                  <AiOutlineCar />
                </div>
                <h3 className="pl-1">Метод на доставка</h3>
              </div>
              <section className="lg:grid grid-cols-[23%72%]">
                <Tab.Group>
                  <Tab.List className="pt-4 pl-5 border-b smToLg:space-x-2 border-gray md:border-r md:border-b-0">
                    {selected.cityName == "София" && (
                      <Tab>
                        <RadioButton
                          radioState={orderState}
                          changeHandler={changeOrderHandler}
                          name={MAGAZINE}
                          id="fromMagazine"
                          text="Вземи от магазин"
                          icon="shop"
                        />
                      </Tab>
                    )}
                    {priceState.totalPrice >= 300 &&
                      selected.cityName == "София" && (
                        <Tab>
                          <RadioButton
                            radioState={orderState}
                            changeHandler={changeOrderHandler}
                            name={DELIVERY}
                            id="delivery"
                            text="Доставка до вкъщи"
                            icon="address"
                          />
                        </Tab>
                      )}
                    {(priceState.totalPrice < 300 ||
                      selected.cityName != "София") && (
                      <Tab>
                        <RadioButton
                          radioState={orderState}
                          changeHandler={changeOrderHandler}
                          name={EKONT}
                          id={EKONT}
                          text="Офис Еконт: 2.99 лв."
                          icon="shop"
                        />
                      </Tab>
                    )}
                  </Tab.List>
                  <Tab.Panels>
                    <div className="mt-6 ml-10">
                      <h3 className="text-sm uppercase font-roboto">
                        Ще доставим пратката ти до:
                      </h3>
                    </div>
                    <section className="px-4">
                      <Tab.Panel>
                        <MagazinePanel userData={userData} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <DeliveryPanel userData={userData} />
                      </Tab.Panel>
                      <Tab.Panel>Еконт</Tab.Panel>
                    </section>
                  </Tab.Panels>
                </Tab.Group>
              </section>
            </section>
          </section>
          {/* Начин на плащане */}
          <section className="mt-4 border shadow border-gray">
            <div className="flex items-center py-2 pl-3 text-lg bg-gray-300 border-b border-gray-150">
              <div>
                <GoCreditCard />
              </div>
              <h3 className="pl-1">Начин на плащане</h3>
            </div>
            <section>
              {paymentState == CARD_PAYMENT && (
                <div className="px-2 pt-6 font-semibold text-center text-secondary">
                  За момента не може да се плаща с карта. От IvdaGeo се
                  извиняваме за причиненото неудобство
                </div>
              )}
              <section className="py-4 pl-6">
                <RadioButton
                  radioState={paymentState}
                  changeHandler={changePaymentHandler}
                  name="cashOnDelivery"
                  id="cashOnDelivery"
                  text="Наложен платеж"
                />
                <RadioButton
                  radioState={paymentState}
                  changeHandler={changePaymentHandler}
                  name={CARD_PAYMENT}
                  id={CARD_PAYMENT}
                  text="Плащане с карта"
                  customLabelClass="line-through"
                />
              </section>
            </section>
          </section>
          {/* Total and comment if is needed */}
          <section className="lg:grid grid-cols-[75%25%] mt-4 space-x-4">
            {/* Добави коментар */}
            <section className="flex flex-col border border-gray ">
              <div className="flex items-center py-2 pl-3 text-lg bg-gray-300 border-b border-gray-150">
                <div>
                  <AiOutlineComment />
                </div>
                <h3 className="pl-1">Добави коментар</h3>
              </div>
              <section className="flex h-full">
                <textarea
                  placeholder="Напиши коментар..."
                  className="w-full p-3 m-4 border border-gray-200 placeholder:text-gray-450 pb-14"
                ></textarea>
              </section>
            </section>
            {/* Дължима сума */}
            <section className="flex flex-col justify-between font-semibold border border-gray">
              <section className="flex items-center py-2 pl-3 bg-gray-300 border-b border-gray-150">
                <div>
                  <FaRegMoneyBillAlt />
                </div>
                <h3 className="pl-2">Дължима сума</h3>
              </section>
              <section className="px-4 py-6">
                <section className="flex justify-between pb-1 text-sm">
                  <div className="font-light">Междинна сума</div>
                  <div>
                    {priceState.subTotal.toFixed(2)}{" "}
                    <span className="font-light">лв.</span>
                  </div>
                </section>
                <section className="flex justify-between pb-1 text-sm">
                  <div className="font-light">ДДС</div>

                  <div>
                    {priceState.dds.toFixed(2)}{" "}
                    <span className="font-light">лв.</span>
                  </div>
                </section>
                <section className="flex justify-between text-sm">
                  <div className="font-light">Доставка</div>
                  <div>
                    {priceState.delivery == 0 ? (
                      "Безплатна"
                    ) : (
                      <>
                        <span>priceState.delivery.toFixed(2)</span>
                        <span className="font-light">лв.</span>
                      </>
                    )}
                  </div>
                </section>
              </section>
              <section className="flex items-center justify-between px-3 py-2 bg-gray-300 border-b border-gray-150">
                <div>ОБЩО: </div>
                <div>{priceState.totalPrice.toFixed(2)} лв.</div>
              </section>
            </section>
          </section>
          {/* Submit button */}
          <section className="flex justify-end mt-2">
            <button
              type="button"
              className="w-full px-10 py-2 font-bold text-white transition-colors border bg-primary border-primary hover:text-primary hover:bg-transparent lg:w-64 xl:w-[19.3rem]"
            >
              Завърши поръчката
            </button>
          </section>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  // Session
  const session = await getSession({ req: context.req });
  let data = {};
  if (!session) {
    return {
      redirect: {
        destination: "/account/login?delivery",
        permanent: false,
      },
    };
  }
  // Mongodb
  if (session) {
    let res = await getFullData(session.user);

    res.addresses.push({ name: "Нов адрес" });
    data = res;
  }
  const getCities = await getBgCities();

  return {
    props: { userData: JSON.parse(JSON.stringify(data)), cities: getCities },
  };
}
export default connect(
  (state) => ({
    cart: state.allProducts.cart,
  }),
  { adjustQty, removeFromCart }
)(Delivery);
