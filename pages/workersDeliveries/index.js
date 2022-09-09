import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// DB
import { connectMongo } from "../../db/connectDb";
import User from "../../db/models/User";
// Components
import Product from "../../components/workDeliveries/Product";

// components
const workerDeliveries = async (userId) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  };
  const res = await fetch("/api/boss/deliveryGetAll", options);
  const data = await res.json();
  return data;
};

export default function Index({ user }) {
  const router = useRouter();
  const [delivery, setDelivery] = useState(null);
  useEffect(() => {
    const workerId = router.asPath.split("#")[1];
    (async function anyNameFunction() {
      const res = await workerDeliveries(workerId);
      if (res.data.length > 0) {
        setDelivery(res.data);
      } else {
        setDelivery(null);
      }
    })();
  }, [router.asPath]);
  return (
    <>
      <main className="mb-auto">
        <section className="md:grid grid-cols-[20%80%] container my-10">
          <section>
            {user.workers.length > 0 &&
              user.workers.map((worker) => {
                return (
                  <div
                    key={worker._id}
                    onClick={() =>
                      router.push(`/workersDeliveries#${worker._id}`)
                    }
                    className="cursor-pointer"
                  >
                    {worker.email} - {worker.fullName}
                  </div>
                );
              })}
          </section>
          {delivery &&
            delivery.map((delivery) => {
              return <Product delivery={delivery} key={delivery._id} />;
            })}
        </section>
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

  const user = await User.findOne({
    email: session.user.email,
    name: session.user.name,
  }).populate("workers");

  if (user.role != "boss") {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
