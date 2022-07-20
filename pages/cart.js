import { useRef, useState, useEffect } from "react";
// NextJs
import Head from "next/head";

// Components
import Price from "../components/priceStyling/Pricing";
import BtnOutlined from "../components/buttons/Outlined";

import Input from "../components/cart/Input";
import CartItem from "../components/cart/CartItem";
//Redux
import { connect } from "react-redux";
import { adjustQty, removeFromCart } from "../redux/actions/productActions";
function Cart({ cart, adjustQty, removeFromCart }) {
  const addInfo = useRef(null);
  const [isHidd, setHidd] = useState(true);
  const [hidText, setHidText] = useState("Добави адрес");
  let subtotal = cart
    .map((item) => {
      return item.item.price * item.qty;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2)
    .split(".");

  useEffect(() => {
    if (!isHidd) {
      setHidText("Отмяна");
    } else {
      setHidText("Добави адрес");
    }
  }, [isHidd]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
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
              <table className="w-full table-auto ">
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
                    <th colSpan={1} className="px-5 py-3 text-left">
                      Общо
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem) => {
                    return (
                      <CartItem
                        cartData={cartItem}
                        key={cartItem.item._id}
                        removeProduct={() => removeFromCart(cartItem.item._id)}
                        changeQty={adjustQty.bind({}, cartItem.item._id)}
                      />
                    );
                  })}
                </tbody>
              </table>

              <aside className="border-[10px] border-gray-100 p-5">
                <section className="flex items-center justify-between border-b b-[#e4e7e6] py-2">
                  <div className="font-semibold uppercase ">Междинна сума:</div>
                  <div>
                    <Price
                      size="2xl"
                      price={subtotal[0]}
                      priceDec={subtotal[1]}
                    />
                  </div>
                </section>
                <section className="border-b b-[#e4e7e6] py-5">
                  <section className="flex items-center justify-between ">
                    <div className="font-semibold uppercase ">Доставка:</div>
                    <button
                      type="button"
                      className="text-sm underline cursor-pointer text-gray-250"
                      onClick={() => setHidd(!isHidd)}
                    >
                      {hidText}
                    </button>
                  </section>
                  <section className={isHidd ? "hidden" : ""} ref={addInfo}>
                    <form action="">
                      <section className="container w-full mt-3">
                        <Input
                          id="name"
                          type="text"
                          text="Име"
                          holder="Иван Иванов"
                        />
                        <Input
                          id="telNumber"
                          type="number"
                          text="Телефон"
                          holder="087 123 4561"
                        />
                        <Input
                          id="city"
                          type="text"
                          text="Град"
                          holder="София"
                        />
                        <Input
                          id="poshtenskiKod"
                          type="text"
                          text="Пощенски код"
                          holder="1584"
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
                            id="address"
                            type="text"
                            text="Адрес"
                            placeholder="РУМ Дружба 2 срещу блок 205"
                            className="px-3 py-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
                            cols="22"
                            rows="2"
                          ></textarea>
                        </div>
                      </section>

                      <div className="mt-2 ">
                        <div className="mb-2">
                          <label
                            htmlFor="moreInfo"
                            className="font-medium text-dark-400"
                          >
                            Коментар
                          </label>
                        </div>
                        <textarea
                          name="moreInfo"
                          id="moreInfo"
                          cols="10"
                          rows="2"
                          className="w-full p-3 px-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline placeholder:text-gray-200"
                        ></textarea>
                      </div>
                      <div className="flex justify-center mt-2">
                        <button
                          type="button"
                          className="w-full py-2 text-sm font-medium text-white uppercase transition-colors duration-300 border px-14 bg-dark hover:bg-transparent hover:text-dark border-dark"
                        >
                          ОЦЕНКА НА ДОСТАВКАТА
                        </button>
                      </div>
                    </form>
                  </section>
                </section>
                <section className="flex items-center justify-between py-2 mb-2">
                  <div className="font-semibold uppercase ">Обща цена:</div>
                  <div>
                    <Price size="3xl" price={200} priceDec={20} />
                  </div>
                </section>
                <div className="flex justify-center">
                  <BtnOutlined type="button" text="завърши" />
                </div>
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
export default connect(
  (state) => ({
    cart: state.allProducts.cart,
  }),
  { adjustQty, removeFromCart }
)(Cart);
