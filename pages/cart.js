import { useState } from "react";

// NextJs
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// Components
import Price from "../components/priceStyling/Pricing";
import BtnOutlined from "../components/buttons/Outlined";

import CartItem from "../components/cart/CartItem";
//Redux
import { connect } from "react-redux";
import { adjustQty, removeFromCart } from "../redux/actions/productActions";

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
      let cena = item.item.item.cena || 0;
      // Item Promo

      if (item.item.item.isOnPromotions) {
        totalPromotion +=
          (item.item.item.cena - item.item.item.promotionalPrice) * item.qty;
        cena = item.item.item.promotionalPrice;
      }

      return cena * item.qty;
    })
    .reduce((a, b) => a + b, 0);

  if (subtotal) {
    subtotal = parseFloat(subtotal).toFixed(2).split(".");
  }

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
                        key={cartItem?.item?.item?.route}
                        removeProduct={() =>
                          removeFromCart(cartItem.item.item.route)
                        }
                        changeQty={adjustQty.bind({}, cartItem.item.item.route)}
                      />
                    );
                  })}
                </tbody>
              </table>

              <aside className="border-[4px] border-gray-100 p-5 relative h-72 md:sticky sm:top-24">
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
    props: {
      userData: JSON.parse(JSON.stringify(data)),
    },
  };
}
export default connect(
  (state) => ({
    cart: state.allProducts.cart,
  }),
  { adjustQty, removeFromCart }
)(Cart);
