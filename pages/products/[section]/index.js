import React, { useRef, useState, useEffect } from "react";

// Icons
import { HiX } from "react-icons/hi";
import { IoIosFunnel } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

// Styles
import styles from "../../../styles/products/listProducts.module.css";

// Components
import AsideHeader from "./../../../components/products/aside/AsideHeader";
import Product from "./../../../components/products/listProducts/Product";
import Sorting from "./../../../components/products/filters/Sorting";
import RangeSlider from "./../../../components/products/aside/RangeSlider";
// Dictionaries
import { sortByDictionary, pageDictionary } from "./allProductDicFilters";
// Services
import { getAllProducts } from "../../../services/productService";
// translation
import { translationToDb } from "../../../utils/translationToRoute";
import ItemTypes from "../../../components/products/aside/ItemTypes";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/productActions";

const totalPricesInitVal = {
  prices: [],
  min: 0,
  max: 0,
};
const filtersInitVal = {
  types: [],
  colors: [],
  prices: {},
  filterByNameOrPrice: "",
};
export default function Section({ products, sectionName }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addToCart(product));
  };

  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  //Product state
  const [articles, setArticles] = useState([]);
  //filters
  const [totalPrices, setTotalPrices] = useState(totalPricesInitVal);
  const [types, setTypes] = useState({});
  const [colors, setColors] = useState([]);
  // total filters
  const [filters, setFilters] = useState(filtersInitVal);

  useEffect(() => {
    setArticles(products?.articles);
  }, [products]);

  useEffect(() => {
    let prices = articles?.map((article) => {
      let price = 0;
      article.items?.forEach((item) => {
        if (item.price > price) price = item.price;
      });
      return price;
    });
    let typesObj = {};
    articles?.forEach((article) => {
      article.items?.forEach((item) => {
        item.types[0].split("\n").forEach((type) => {
          const typeOnly = type.split(":");
          if (!typesObj.hasOwnProperty(typeOnly[0])) {
            typesObj[typeOnly[0]] = new Set();
          }
          typesObj[typeOnly[0]].add(typeOnly[1].trim());
        });
      });
    });
    setTypes(typesObj);

    setTotalPrices({
      prices,
      min: Math.floor(prices?.reduce((a, b) => Math.min(a, b), 1000000)),
      max: Math.ceil(prices?.reduce((a, b) => Math.max(a, b), 0)),
    });
  }, [articles]);

  useEffect(() => {
    if (filters.types.length > 0) {
      let filteredArticles = [];
      articles.forEach((article) => {
        let artItems = [];
        article.items.forEach((item) => {
          let filter = filters;
          if (filter.length < 0) filter = [];

          const isFound = filters.types.every((filter) =>
            item.types[0].includes(filter)
          );
          if (isFound) {
            artItems.push(item);
          }
        });
        if (artItems.length > 0) {
          article.items = artItems;
          filteredArticles.push(article);
        }
      });
      setArticles(filteredArticles);
    } else if (filters.prices?.max > 0) {
      let filteredArticles = [];
      articles.forEach((article) => {
        let artItems = [];
        article.items.forEach((item) => {
          const isFound =
            item.price <= filters.prices.max &&
            item.price >= filters.prices.min;

          if (isFound) {
            artItems.push(item);
          }
        });
        if (artItems.length > 0) {
          article.items = artItems;
          filteredArticles.push(article);
        }
      });
      setArticles(filteredArticles);
    } else if (filters.filterByNameOrPrice.length > 0) {
      let filter = filters.filterByNameOrPrice;

      switch (filter) {
        case "nameAsc":
          filter = articles.sort((a, b) =>
            b.articleName.localeCompare(a.articleName)
          );

          break;
        case "nameDesc":
          filter = articles.sort((a, b) =>
            a.articleName.localeCompare(b.articleName)
          );
          break;
        case "priceAsc":

        case "priceDesc":
          break;
      }

      setArticles(filter);
    } else {
      setArticles(products?.articles);
    }
  }, [filters]);

  useEffect(() => {
    if (filterMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [filterMenu]);
  const clearAllFiilters = () => {
    setFilters(filtersInitVal);
  };
  return (
    <main className="mb-auto">
      {articles && (
        <div className="lg:grid grid-cols-[20%80%] lg:space-x-10 container">
          {products && (
            <aside
              className={` w-full h-full lg:block bg-[#f5f5f5] max-lg:overflow-auto pb-10 ${
                styles.asideContainer
              } lg:relative pt-4 px-5 ${
                filterMenu
                  ? "fixed top-0 z-20 left-0 bg-[#f5f5f5] pt-20"
                  : "hidden"
              }`}
            >
              <div className="">
                <div className="flex items-center justify-between">
                  <h3 className="mb-3 text-2xl text-bold">Филтри</h3>

                  <div
                    className={`text-lg cursor-pointer text-primary lg:hidden`}
                    onClick={() => setFilterMenu(false)}
                  >
                    <HiX />
                  </div>
                </div>
                {/* Button to clear all the filters */}
                <button
                  className="flex items-center px-6 py-1 mt-2 font-bold border rounded-full cursor-pointer text-primary border-primary"
                  onClick={clearAllFiilters}
                >
                  Изчисти
                </button>
                {/* <AsideHeader text="Цена" /> */}
                <div>
                  {/* {totalPrices && (
                    <RangeSlider
                      initialMin={totalPrices.min}
                      initialMax={totalPrices.max}
                      min={totalPrices.min}
                      max={totalPrices.max}
                      step={1}
                      priceGap={2}
                      setFilters={setFilters}
                    />
                  )} */}
                  {/* Pricing line to choose */}
                  {/* <div className="flex items-center mt-2 cursor-pointer">
                    <span className="text-primary">
                      <HiX />
                    </span>
                    <span className="pl-1 text-sm text-gray-darker">
                      Изчисти
                    </span>
                  </div> */}
                </div>
              </div>

              {types &&
                Object.entries(types).map((type) => {
                  return (
                    <ItemTypes
                      key={type[0]}
                      type={type[0]}
                      allTypes={Array.from(type[1])}
                      setFilters={setFilters}
                      filters={filters}
                    />
                  );
                })}
            </aside>
          )}
          <section className="mt-10">
            {/* Filters for mobile */}
            {products && (
              <div className="relative z-10 grid grid-cols-2 gap-2 mb-5 lg:mb-14 lg:grid-cols-1">
                {/* TODO: add icons */}
                <button
                  type="button"
                  className="flex items-center w-full h-full py-2 pl-4 text-left text-white bg-primary lg:hidden "
                  onClick={() => setFilterMenu(!filterMenu)}
                >
                  <span>
                    <IoIosFunnel />
                  </span>
                  <span className="pl-1">Филтри</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-between w-full h-full py-2 pl-4 text-left border border-gray lg:hidden"
                  onClick={() => setHidden(!isHidden)}
                >
                  <div>Сортирай по:</div>
                  <div className="mr-2 text-sm lg:text-3xl">
                    <MdKeyboardArrowDown />
                  </div>
                </button>

                <div
                  className={` w-full absolute lg:flex top-full bg-white z-10 lg:relative h-48 lg:h-auto shadow-2xl lg:shadow-none ${
                    isHidden ? "hidden" : ""
                  } `}
                  ref={sortingMenu}
                >
                  <div>
                    <Sorting
                      title="Сортирай"
                      name="sortBy"
                      setFilters={setFilters}
                      data={sortByDictionary}
                    />
                  </div>
                  {/* <div className="lg:ml-4">
                    <Sorting
                      title="Намерени"
                      qty={totalItemsState.length}
                      name="pages"
                      data={pageDictionary}
                    />
                  </div> */}
                </div>
              </div>
            )}

            {articles &&
              articles.map((article) => {
                return article.items?.map((item) => {
                  return (
                    <Product
                      article={article}
                      item={item}
                      key={item._id}
                      commonName={products.commonName}
                      sectionName={sectionName}
                      addProduct={addProduct}
                    />
                  );
                });
              })}

            {/* <Product section={section} /> */}
          </section>
        </div>
      )}
      {!articles && (
        <div className="flex justify-center items-center text-xl text-secondary  h-[40vh]">
          Няма намерени резултати
        </div>
      )}
    </main>
  );
}

// Getting all product.. if filtering Must be filtering somehow
export async function getServerSideProps(context) {
  const { section } = context.params;

  const products = await getAllProducts(translationToDb(section));
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      sectionName: section,
    },
  };
}
