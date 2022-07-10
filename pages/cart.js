// NextJs
import Head from "next/head";
// Icons
// Components
import Table from "../components/cart/Table/Table";
import Aside from "../components/cart/Aside/Aside";

// import styles from '../styles/Home.module.css'
export default function Cart() {
  return (
    <>
      <Head>
        <title>IvdaGeo</title>
        <meta name="description" content="Онлайн магазин IvdaGeo" />
      </Head>

      <main className="mb-auto ">
        <div className="container mt-5">
          <h3 className="my-5 text-3xl font-semibold uppercase">
            Твоята количка
          </h3>

          <div className={`xl:grid grid-cols-[70%30%] xl:space-x-4`}>
            <Table />
            <Aside />
          </div>
        </div>
      </main>
    </>
  );
}
