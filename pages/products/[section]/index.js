import React, { useRef, useState, useEffect } from "react";

// Icons
import { HiX } from "react-icons/hi";
import { IoIosFunnel } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

// Styles
import styles from "../../../styles/products/listProducts.module.css";

// Components
import Product from "./../../../components/products/listProducts/Product";
import Sorting from "./../../../components/products/filters/Sorting";
import AsideHeader from "../../../components/products/aside/AsideHeader";
// Dictionaries
// import sortByDictionary from "./allProductDicFilters.dic";
import sortByDictionary from "../../../dictonaries/allProductDicFilters";
// Services
import { getAllProducts } from "../../../services/productService";
// translation
import { translationToDb } from "../../../utils/translationToRoute";
import Checkbox from "../../../components/base/Checkbox";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/productActions";
// Notifications
import { toastInformation } from "../../../components/notificataions/Toast";

export default function Section({ products, types, sectionRoute }) {
  const dispatch = useDispatch();

  const addProduct = (product, productName) => {
    toastInformation(`Добавихте ${productName} в количката`);
    dispatch(addToCart(product));
  };

  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  //Product state
  const [articles, setArticles] = useState(products?.articles);

  // total filters
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const newProdArt = products?.articles?.slice();

    const filteredArticles = [];
    if (newProdArt) {
      for (let article of newProdArt) {
        const newArt = Object.assign({}, article);

        let items = [];
        for (let item of article.items) {
          const type = item.weight;
          let isFound = true;
          if (filters.length == 0) {
            items.push(item);
          } else {
            inner: for (let filter of filters) {
              if (!type.includes(filter)) {
                isFound = false;
                break inner;
              }
            }
            if (isFound) items.push(item);
          }
        }
        if (items.length > 0) {
          newArt.items = items;
          filteredArticles.push(newArt);
        }
      }
      setArticles(filteredArticles);
    }
  }, [filters, products?.articles]);

  useEffect(() => {
    if (filterMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [filterMenu]);
  const clearAllFiilters = () => {
    setFilters([]);
  };
  return (
    <main className="mb-auto">
      {articles && (
        <div className="lg:grid grid-cols-[20%80%] lg:space-x-10 container">
          {products && (
            <aside
              className={` w-full h-full lg:block  max-lg:overflow-auto pb-10 ${
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
                <div></div>
              </div>
              <AsideHeader text="Количество" />
              {types &&
                types.map((type, index) => {
                  return (
                    <Checkbox
                      key={type}
                      text={type}
                      id={`${type}`}
                      // quantity={2}
                      filters={filters}
                      setFilters={setFilters}
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
                  {/* <div>
                    <Sorting
                      title="Сортирай"
                      name="sortBy"
                      setFilters={setFilters}
                      data={sortByDictionary}
                    />
                  </div> */}
                </div>
              </div>
            )}

            {articles &&
              articles.map((article) => {
                return article?.items?.map((item) => {
                  return (
                    <Product
                      article={article}
                      item={item}
                      key={item._id}
                      imageUrl={products.imageUrl}
                      sectionName={products.sectionName}
                      sectionRoute={sectionRoute}
                      description={products.description}
                      addProduct={addProduct}
                    />
                  );
                });
              })}
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
  let { section } = context.params;
  const products = await getAllProducts(section.split("-").join(" "));

  // Must add total qty on every types how much is qty of the every filter
  let typesObj = new Set();
  products?.articles?.forEach((article) => {
    article.items?.forEach((item) => {
      typesObj.add(item.weight);
    });
  });
  typesObj = Array.from(typesObj);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      sectionRoute: section,
      types: typesObj,
    },
  };
}
