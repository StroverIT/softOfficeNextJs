// NextJS
import Head from "next/head";

// Components
import HomePage from "../components/Home"


import { connectMongo } from "../db/connectDb";
import Review from "../db/models/Review";

// Images


export default function Home({ promotions }) {
  return (
    <>
      <Head>
        <title>SoftOffice</title>
        <meta name="description" content="Онлайн магазин SoftOffice" />
      </Head>

     <HomePage promotions={promotions}/>
    </>
  );
}

export async function getServerSideProps(context) {
  let data = [];
  let reviewDataDb = [];
  try {
    const promotionsRes = await fetch(
      `${process.env.NEXTAUTH_URL}/api/promotions/getAll`
    );
    data = await promotionsRes.json();

    await connectMongo();

    const reviewRes = await Review.find({});
    reviewDataDb = reviewRes;
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      promotions: data,
      reviewDataDb: JSON.parse(JSON.stringify(reviewDataDb)),
    }, // will be passed to the page component as props
  };
}
