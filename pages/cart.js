<<<<<<< HEAD
import { useState } from "react";

// NextJs
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
=======
import { useRef, useState, useEffect } from "react";
// NextJs
import Head from "next/head";
import { getSession } from "next-auth/react";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

// Components
import Price from "../components/priceStyling/Pricing";
import BtnOutlined from "../components/buttons/Outlined";

<<<<<<< HEAD
=======
import Input from "../components/cart/Input";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
import CartItem from "../components/cart/CartItem";
//Redux
import { connect } from "react-redux";
import { adjustQty, removeFromCart } from "../redux/actions/productActions";
<<<<<<< HEAD

function Cart({ cart, adjustQty, removeFromCart, userData }) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const changeRoute = () => {
    setLoading(true);
    router.push("/delivery");
  };
  let totalPromotion = 0;
  let subtotal = cart
    .map((item) => {
      let cena = item.item.item.cena;

      // Item Promo

      if (item.item.item.isOnPromotions) {
        totalPromotion +=
          (item.item.item.cena - item.item.item.promotionalPrice) * item.qty;
        cena = item.item.item.promotionalPrice;
      }

      return cena * item.qty;
=======
// Utils
import isObjectEmpty from "../utils/isObjectEmpty";
import Link from "next/link";
// Notifications
import {
  toastHideAll,
  toastSuccess,
  toastError,
  toastPromise,
} from "../components/notificataions/Toast";

function Cart({ cart, adjustQty, removeFromCart, userData }) {
  const addInfo = useRef(null);
  let subtotal = cart
    .map((item) => {
      return item.item.price * item.qty;
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2)
    .split(".");
<<<<<<< HEAD
=======

  const [isHidd, setHidd] = useState({ state: true, text: "Добави адрес" });
  const [totalPrice, setTotalPrice] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    telephone: "",
    city: "",
    zipCode: "",
    address: "",
    comment: "",
  });
  const changeHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const deliveryCheckerHandler = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(subtotal.join(".")) }),
    };
    const res = await fetch("/api/cart/deliveryEstimate", options);
    const data = await res.json();
    setTotalPrice(data);
    setHidd({ state: true, text: "Промени адреса" });
  };
  const createDelivery = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, formData: inputs, totalPrice }),
    };
    const res = await fetch("/api/cart/createDelivery", options);
    const message = await res.json();
    console.log(message);
    //  Tostify while sending to show изпраща се. When is success to show the message otherwise to show the error message. And to clear the cart
    toastHideAll();
    if (message.error) {
      toastError(message.error);
    }
    if (message.message) {
      toastSuccess(message.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
    if (buttonName == "deliveryEstimate") {
      deliveryCheckerHandler();
    }
    if (buttonName == "submitDelivery") {
      createDelivery();
    }
  };

  useEffect(() => {
    setTotalPrice(null);
  }, [cart]);
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  return (
    <>
      <Head>
        <title>SoftOffice</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

      <main className="mb-auto ">
        <div className="container mt-5">
          <h3
            className={`my-5 text-3xl font-semibold uppercase ${
              cart.length <= 0 && "text-center"
            }`}
          >
            Твоята количка
          </h3>
          {cart.length > 0 && (
            <div className={`xl:grid grid-cols-[70%30%] xl:space-x-4 my-10`}>
              <table className="w-full table-fixed ">
                <thead className="bg-gray-100 text-gray-250">
                  <tr className="hidden mb-1 lg:table-row ">
                    <th colSpan={2} className="py-3 text-left ">
                      Продукт
                    </th>
                    <th colSpan={1} className="px-5 py-3">
                      Цена
                    </th>
                    <th colSpan={1} className="px-5 py-3">
                      Количество
                    </th>
                    <th colSpan={1} className="px-5 py-3 ">
                      Общо
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem) => {
                    return (
                      <CartItem
                        cartData={cartItem}
<<<<<<< HEAD
                        key={cartItem?.item?.item?.route}
                        removeProduct={() =>
                          removeFromCart(cartItem.item.item.route)
                        }
                        changeQty={adjustQty.bind({}, cartItem.item.item.route)}
=======
                        key={cartItem.item._id}
                        removeProduct={() => removeFromCart(cartItem.item._id)}
                        changeQty={adjustQty.bind({}, cartItem.item._id)}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                      />
                    );
                  })}
                </tbody>
              </table>

<<<<<<< HEAD
              <aside className="border-[4px] border-gray-100 p-5 relative h-72 md:sticky sm:top-24">
                <section className="flex items-center justify-between border-b b-[#e4e7e6] py-2">
                  <div className="font-semibold uppercase ">Междинна сума:</div>

=======
              <aside className="border-[10px] border-gray-100 p-5 relative">
                <section className="flex items-center justify-between border-b b-[#e4e7e6] py-2">
                  <div className="font-semibold uppercase ">Междинна сума:</div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                  <div>
                    <Price
                      size="2xl"
                      price={subtotal[0]}
                      priceDec={subtotal[1]}
                    />
                  </div>
                </section>
<<<<<<< HEAD
                {totalPromotion > 0 && (
                  <section className="flex items-center justify-between border-b b-[#e4e7e6] py-2">
                    <div className="font-semibold uppercase ">
                      Спестени пари:
                    </div>

                    <div>
                      <Price
                        size="2xl"
                        price={totalPromotion.toFixed(2).split(".")[0]}
                        priceDec={totalPromotion.toFixed(2).split(".")[1]}
                      />
                    </div>
                  </section>
                )}
                <section className="mt-2">
                  <BtnOutlined
                    isLoading={isLoading}
                    text="Към завършване"
                    onClick={changeRoute}
                  />
                </section>
=======
                <form action="" onSubmit={submitHandler}>
                  <section className="border-b b-[#e4e7e6] py-5">
                    <section className="flex items-center justify-between ">
                      <div className="font-semibold uppercase ">Доставка:</div>
                      <button
                        type="button"
                        className="text-sm underline cursor-pointer text-gray-250"
                        onClick={() =>
                          setHidd((prevState) => ({
                            state: !prevState.state,
                            text: !prevState.state ? "Добави адрес" : "Откажи",
                          }))
                        }
                      >
                        {isHidd.text}
                      </button>
                    </section>
                    {!isHidd.state && (
                      <section ref={addInfo}>
                        <section className="container w-full mt-3">
                          <Input
                            id="name"
                            type="text"
                            text="Име"
                            holder="Иван Иванов"
                            value={inputs.name}
                            handler={changeHandler}
                          />
                          <Input
                            id="telephone"
                            type="number"
                            text="Телефон"
                            holder="087 123 4561"
                            value={inputs.telephone}
                            handler={changeHandler}
                          />
                          <Input
                            id="city"
                            type="text"
                            text="Град"
                            holder="София"
                            value={inputs.city}
                            handler={changeHandler}
                          />
                          <Input
                            id="zipCode"
                            type="text"
                            text="Пощенски код"
                            holder="1584"
                            value={inputs.zipCode}
                            handler={changeHandler}
                          />
                          <div className="flex flex-col justify-between ">
                            <div className="flex items-center mb-1">
                              <label
                                htmlFor="address"
                                className="font-medium text-dark-400"
                              >
                                Адрес
                              </label>
                            </div>
                            <textarea
                              name="address"
                              id="address"
                              type="text"
                              text="Адрес"
                              placeholder="РУМ Дружба 2 срещу блок 205"
                              className="px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
                              cols="22"
                              rows="2"
                              value={inputs.address}
                              onChange={changeHandler}
                            ></textarea>
                          </div>
                        </section>

                        <div className="mt-2 ">
                          <div className="mb-2">
                            <label
                              htmlFor="comment"
                              className="font-medium text-dark-400"
                            >
                              Коментар
                            </label>
                          </div>
                          <textarea
                            name="comment"
                            id="comment"
                            cols="10"
                            rows="2"
                            value={inputs.comment}
                            onChange={changeHandler}
                            className="w-full p-3 px-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
                          ></textarea>
                        </div>
                        <div className="flex justify-center mt-2">
                          <button
                            type="submit"
                            name="deliveryEstimate"
                            className="w-full py-2 text-sm font-medium text-white uppercase transition-colors duration-300 border px-14 bg-dark hover:bg-transparent hover:text-dark border-dark"
                          >
                            ОЦЕНКА НА ДОСТАВКАТА
                          </button>
                        </div>
                      </section>
                    )}
                  </section>
                  {totalPrice && (
                    <>
                      <section className="flex items-center justify-between py-2 mt-1">
                        <div className="font-semibold uppercase ">
                          Доставка:
                        </div>
                        <div className="flex items-center justify-center">
                          {totalPrice.deliveryFee.join(".") > 0 ? (
                            <Price
                              size="xl"
                              price={totalPrice?.deliveryFee[0]}
                              priceDec={totalPrice?.deliveryFee[1]}
                              NoDDSText={true}
                            />
                          ) : (
                            <div>Безплатна</div>
                          )}
                        </div>
                      </section>
                      <section className="flex items-center justify-between mb-2">
                        <div className="font-semibold uppercase ">
                          Обща цена:
                        </div>
                        <div>
                          <Price
                            size="2xl"
                            price={totalPrice?.totalPrice[0]}
                            priceDec={totalPrice?.totalPrice[1]}
                            isDDS={true}
                          />
                        </div>
                      </section>

                      <div className="flex justify-center">
                        <BtnOutlined
                          type="submit"
                          text="завърши"
                          name="submitDelivery"
                          onClick={() => toastPromise("Изпраща се")}
                        />
                      </div>
                    </>
                  )}
                </form>
                {isObjectEmpty(userData) && (
                  <div className="absolute flex flex-col items-center justify-center w-full h-full text-white -translate-x-1/2 -translate-y-1/2 opacity-75 top-1/2 left-1/2 bg-dark">
                    <div className="text-lg text-primary-lighter">
                      Трябва да имате акаунт
                    </div>
                    <div className="flex">
                      <Link href="/account/register">
                        <a className="cursor-pointer hover:text-primary-lighter">
                          Регистрация
                        </a>
                      </Link>
                      <Link href="/account/login">
                        <a className="ml-1 cursor-pointer hover:text-primary-lighter">
                          Вход
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
              </aside>
            </div>
          )}
          {cart.length <= 0 && (
            <div className="text-lg text-center text-secondary">
              Нямате продукти в количката си
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  // Session
  const session = await getSession({ req: context.req });
  let data = {};
<<<<<<< HEAD

=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  // Mongodb
  if (session) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    data = await res.json();
  }

  return {
<<<<<<< HEAD
    props: {
      userData: JSON.parse(JSON.stringify(data)),
    },
=======
    props: { userData: JSON.parse(JSON.stringify(data)) },
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
  };
}
export default connect(
  (state) => ({
    cart: state.allProducts.cart,
  }),
  { adjustQty, removeFromCart }
)(Cart);
