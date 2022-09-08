import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// DB
import { connectMongo } from "../../db/connectDb";
import User from "../../db/models/User";

// components
import Navigation from "../../components/adminPanel/Navigation";
import Deliveries from "../../components/adminPanel/Deliveries";
import Products from "../../components/adminPanel/Products";
import Promotions from "../../components/adminPanel/Promotions";
import Users from "../../components/adminPanel/Users";

// Services
import { getAll } from "../../services/productService";
import { getAll as getAllDeliveries } from "../../services/deliveryService";

export default function Index({
  userData,
  products,
  forDelivery,
  forMagazine,
  promotions,
  allUsers,
}) {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState(null);
  const filteredProducts = products.map((product) => {
    return {
      _id: product._id,
      name: product.name,
      nameToDisplay: product.nameToDisplay,
      isSelected: false,
      customPromo: "",
      subsection: product.subsection.map((subsection) => {
        console.log(subsection);
        return {
          _id: subsection._id,
          tiput: subsection.tiput,
          nameToDisplay: subsection.nameToDisplay,
          isSelected: false,
          customPromo: "",
          items:
            subsection.items &&
            subsection?.items?.map((item) => {
              return {
                _id: item?._id,
                katNomer: item?.katNomer,
                tipove: item?.tipove,
                cena: item?.cena,
                isSelected: false,
                customPromo: "",
              };
            }),
        };
      }),
    };
  });
  console.log(filteredProducts);
  useEffect(() => {
    const categoryComp = {
      "#dostavki": [
        <Deliveries
          key="Deliveries"
          forHome={forDelivery}
          forMagazine={forMagazine}
        />,
      ],
      "#prodykti": [<Products key="MyOrders" products={products} />],
      "#promocii": [<Promotions key="MyFavourites" promotions={promotions} />],
      "#potrebiteli": [
        <Users key="Users" usersData={allUsers} products={filteredProducts} />,
      ],
    };
    const hash = window.location.hash?.split("#");
    const someData = categoryComp[`#${hash[1]}`] ?? categoryComp["#prodykti"]; // Retrieve data based on URL fragment
    setCategoryData(someData[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userData]);
  return (
    <>
      <main className="mb-auto">
        <Navigation />
        <div className="container">{categoryData}</div>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  // Session
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  // Mongodb
  await connectMongo();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: session.user.email,
      name: session.user.name,
    }),
  });
  const data = await res.json();

  if (data.role != "admin") {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const products = await getAll();
  const deliveries = await getAllDeliveries();
  const forDelivery = deliveries.filter((type) => {
    return type.typeOfDelivery != "delivery";
  });
  const forMagazine = deliveries.filter((type) => {
    return type.typeOfDelivery != "magazine";
  });

  const promotionsRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/promotions/getAll`
  );
  const promoData = await promotionsRes.json();

  const users = await User.find({});

  return {
    props: {
      userData: JSON.parse(JSON.stringify(data)),
      products: JSON.parse(JSON.stringify(products)),
      forDelivery: JSON.parse(JSON.stringify(forDelivery)),
      forMagazine: JSON.parse(JSON.stringify(forMagazine)),
      promotions: promoData,
      allUsers: JSON.parse(JSON.stringify(users)),
    },
  };
}
