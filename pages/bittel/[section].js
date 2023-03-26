import React, { useEffect, useState } from "react";
import ListItem from "../../components/products/listProducts/ListItem";
import { formatter } from "../../utils/Bittel";

import { useDispatch } from "react-redux";

import { addProduct } from "../../utils/helper";
const Bittel = ({ products, section }) => {
  const [articles, setArticles] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setArticles(products);
  }, [products]);
  return (
    <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 py-10 container">
      {articles &&
        articles.map((item) => {
          const route = `/bittel/${section}/${item.item._id}`;
          return (
            <ListItem
              key={item._id}
              item={item.item}
              articleData={item.article}
              route={route}
              section={item.section}
              imgUrl={item.article.imgUrl}
              addProduct={addProduct.bind({}, dispatch)}
            />
          );
        })}
    </section>
  );
};

export default Bittel;

export async function getServerSideProps(context) {
  const { section } = context.query;

  const res = await fetch(
    "https://dealers.bittel.bg/bg/api/json/341092012d162fa0d19e2ebad93fc708",
    {
      method: "GET",
    }
  );
  console.log(section);
  const data = await res.json();
  const products = formatter(data.products, section);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      section,
      // types: typesObj,
    },
  };
}
