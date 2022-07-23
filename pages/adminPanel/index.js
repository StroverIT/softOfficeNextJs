import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import Navigation from "../../components/adminPanel/Navigation";
import Deliveries from "../../components/adminPanel/Deliveries";
import Products from "../../components/adminPanel/Products";
import Promotions from "../../components/adminPanel/Promotions";
import Users from "../../components/adminPanel/Users";

// Services
import { getAll } from "../../services/productService";
import { getAll as getAllDeliveries } from "../../services/deliveryService";

export default function Index({ userData, products, deliveries }) {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const categoryComp = {
      "#dostavki": [<Deliveries key="Deliveries" deliveries={deliveries} />],
      "#prodykti": [<Products key="MyOrders" products={products} />],
      "#promocii": [<Promotions key="MyFavourites" />],
      "#potrebiteli": [<Users key="Users" />],
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

  return {
    props: {
      userData: JSON.parse(JSON.stringify(data)),
      products: JSON.parse(JSON.stringify(products)),
      deliveries: JSON.parse(JSON.stringify(deliveries)),
    },
  };
}
