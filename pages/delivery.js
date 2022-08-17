import { useRef, useState, useEffect, Fragment } from "react";

// NextJs
import Head from "next/head";
import { getSession } from "next-auth/react";
// Components
import RadioButton from "../components/cart/RadioButton";
import DueAmount from "../components/delivery/sections/DueAmount";

// Utils
import { MAGAZINE, EKONT } from "../components/cart/cartCostants";
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

import { GoCreditCard } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import PopulatedPlace from "../components/delivery/sections/PopulatedPlace";
import MethodOfDeliv from "../components/delivery/sections/MethodOfDeliv";

// Inline constants
const CARD_PAYMENT = "cardPayment";
// Context
import { InputContext } from "../components/delivery/Context";

function Delivery({ cart, userData, cities }) {
  const [selected, setSelected] = useState(cities[21]);
  const [officeSelected, setOfficeSelected] = useState({
    name: "Избери офис",
  });
  const [quarterSelected, setQuarterSelected] = useState({
    name: "Избери квартал",
  });

  const [orderState, setTypeOfOrder] = useState(MAGAZINE);
  const [paymentState, setTypePayment] = useState("cashOnDelivery");
  const [priceState, setPriceState] = useState({
    subTotal: 0,
    totalPrice: 0,
    delivery: 0,
    dds: 0,
  });
  const [inputs, setInputs] = useState({
    email: userData.email,
    address: {},
    comment: "",
    typeOfDelivery: "",
    typeOfPayment: "",
  });

  const createDelivery = async () => {
    toastPromise("Изпраща се...");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        inputs,
        deliveryInfo: {
          city: selected,
          office: officeSelected,
          quarter: quarterSelected,
        },
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
  const changeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: val }));
  };
  const changePaymentHandler = (e) => {
    const name = e.target.name;
    setTypePayment(name);
  };
  const changeOrderHandler = (e) => {
    const name = e.target.name;
    setTypeOfOrder(name);
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
    if (selected.name == "София") {
      setPriceState(() => state);
      setTypeOfOrder(MAGAZINE);
    }
    if (selected.name != "София") {
      const delivery = 2.99;
      state.delivery = delivery;
      state.totalPrice = subTotal + dds + delivery;
      setPriceState(() => state);
      setTypeOfOrder(EKONT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <Head>
        <title>IvdaGeo</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>
      <main className="container mt-10 mb-16 ">
        <section className="lg:grid lg:grid-cols-[75%25%] xl:grid-cols-[80%20%] lg:space-x-3">
          <InputContext.Provider
            value={{
              inputs,
              setInputs,
              quarterSelected,
              setQuarterSelected,
            }}
          >
            <section className="">
              <section className="border shadow-md border-gray">
                <PopulatedPlace
                  selected={selected}
                  setSelected={setSelected}
                  cities={cities}
                />
                <MethodOfDeliv
                  selected={selected}
                  setSelected={setSelected}
                  orderState={orderState}
                  changeOrderHandler={changeOrderHandler}
                  priceState={priceState}
                  userData={userData}
                  officeSelected={officeSelected}
                  setOfficeSelected={setOfficeSelected}
                />
              </section>
              {/* Начин на плащане */}
              <section className="mt-4 border shadow border-gray">
                <div className="flex items-center py-4 pl-3 text-lg font-semibold bg-gray-300 border-b border-gray-150">
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
              <section className="mt-4 space-x-4 ">
                {/* Добави коментар */}
                <section className="flex flex-col border border-gray ">
                  <div className="flex items-center py-4 pl-3 text-lg font-semibold bg-gray-300 border-b border-gray-150">
                    <div>
                      <AiOutlineComment />
                    </div>
                    <h3 className="pl-1">Добави коментар</h3>
                  </div>
                  <section className="flex h-full">
                    <textarea
                      placeholder="Напиши коментар..."
                      name="comment"
                      className="w-full p-3 m-4 border border-gray-200 placeholder:text-gray-450 pb-14"
                      onChange={changeHandler}
                    ></textarea>
                  </section>
                </section>
                {/* Дължима сума */}
              </section>
            </section>
            <DueAmount
              priceState={priceState}
              createDelivery={createDelivery}
            />
          </InputContext.Provider>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  // Session
  const session = await getSession({ req: context.req });
  let data = {};
  // Must add if cart is empty and if is not logged in
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
