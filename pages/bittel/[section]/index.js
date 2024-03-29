import React, { useEffect, useState } from "react";
import ListItem from "../../../components/products/listProducts/ListItem";
import { formatter } from "../../../utils/Bittel";

import { useDispatch } from "react-redux";

import { addProduct } from "../../../utils/helper";
import obzavejdaneZaOfisArt from "../../../components/layouts/navComponents/navDictioinary/obzavejdaneZaOfisArt";

const Bittel = ({ products, section }) => {
  const dispatch = useDispatch();

  return (
    <section className="container grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-3">
      {products &&
        products.map((item) => {
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

export async function getStaticPaths(){

  const routeList = obzavejdaneZaOfisArt[0].subMenu.filter(e=> e.name.includes("bittel")).map(subMenu=>{
    return `/${subMenu.name}`
  })
  return{
paths: routeList,
    fallback: false
  }
}
export async function getStaticProps(context) {
  const {section} = context.params

  const res = await fetch(
    "https://dealers.bittel.bg/bg/api/json/341092012d162fa0d19e2ebad93fc708",
    {
      method: "GET",
    }
  );
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
