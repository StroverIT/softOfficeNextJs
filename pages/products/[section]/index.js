import React, { useRef, useState, useEffect } from "react";
<<<<<<< HEAD
import { getSession } from "next-auth/react";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

// Icons
import { HiX } from "react-icons/hi";
import { IoIosFunnel } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

// Styles
import styles from "../../../styles/products/listProducts.module.css";

// Components
import Product from "./../../../components/products/listProducts/Product";
import Sorting from "./../../../components/products/filters/Sorting";
<<<<<<< HEAD
import AsideHeader from "../../../components/products/aside/AsideHeader";
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
// Dictionaries
// import sortByDictionary from "./allProductDicFilters.dic";
import sortByDictionary from "../../../dictonaries/allProductDicFilters";
// Services
import { getAllProducts } from "../../../services/productService";
// translation
<<<<<<< HEAD
import Checkbox from "../../../components/base/Checkbox";
=======
import { translationToDb } from "../../../utils/translationToRoute";
import ItemTypes from "../../../components/products/aside/ItemTypes";
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/productActions";
// Notifications
<<<<<<< HEAD
import { toastProduct } from "../../../components/notificataions/Toast";

export default function Section({ products, types, sectionRoute }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    const name = `${product.section.name} ${product.article.name}`;
    toastProduct(name);

=======
import { toastInformation } from "../../../components/notificataions/Toast";

export default function Section({ products, sectionName, types }) {
  const dispatch = useDispatch();

  const addProduct = (product, productName) => {
    toastInformation(`Добавихте ${productName} в количката`);
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    dispatch(addToCart(product));
  };

  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  //Product state
<<<<<<< HEAD
  const [articles, setArticles] = useState(null);

  // total filters
  // const [filters, setFilters] = useState([]);

  // useEffect(() => {
  //   const newProdArt = products?.articles?.slice();

  //   const filteredArticles = [];
  //   if (newProdArt) {
  //     for (let article of newProdArt) {
  //       const newArt = Object.assign({}, article);

  //       let items = [];
  //       for (let item of article.items) {
  //         const type = item.weight;
  //         let isFound = true;
  //         if (filters.length == 0) {
  //           items.push(item);
  //         } else {
  //           inner: for (let filter of filters) {
  //             if (!type.includes(filter)) {
  //               isFound = false;
  //               break inner;
  //             }
  //           }
  //           if (isFound) items.push(item);
  //         }
  //       }
  //       if (items.length > 0) {
  //         newArt.items = items;
  //         filteredArticles.push(newArt);
  //       }
  //     }
  //     setArticles(filteredArticles);
  //   }
  // }, [filters, products?.articles]);
=======
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
          const type = item.types[0].split("\n").join(" ");
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e

  useEffect(() => {
    if (filterMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [filterMenu]);
  const clearAllFiilters = () => {
<<<<<<< HEAD
    setFilters([]);
  };
  useEffect(() => {
    if (products?.subsection) {
      setArticles(products.subsection);
    }
  }, [products]);
  return (
    <main className="mb-auto">
      {articles && (
        <div className="container lg:space-x-10">
=======
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
                <div></div>
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
                  {/* <div>
=======
                  <div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                    <Sorting
                      title="Сортирай"
                      name="sortBy"
                      setFilters={setFilters}
                      data={sortByDictionary}
                    />
<<<<<<< HEAD
                  </div> */}
=======
                  </div>
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
                </div>
              </div>
            )}

<<<<<<< HEAD
            <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {articles &&
                articles.map((article) => {
                  return (
                    <Product
                      key={article._id}
                      section={{
                        name: products.nameToDisplay,
                        route: products.name,
                      }}
                      article={article}
                      addProduct={addProduct}
                    />
                  );
                })}
            </section>
=======
            {articles &&
              articles.map((article) => {
                return article?.items?.map((item) => {
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
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
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
<<<<<<< HEAD
  let { section } = context.params;
  const session = await getSession({ req: context.req });

  const products = await getAllProducts(section, session);

  // Must add total qty on every types how much is qty of the every filter
  // let typesObj = new Set();
  // products?.subsection?.forEach((article) => {
  //   article.items?.forEach((item) => {
  //     typesObj.add(item.weight);
  //   });
  // });
  // typesObj = Array.from(typesObj);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      sectionRoute: section,
      // types: typesObj,
=======
  const { section } = context.params;

  const products = await getAllProducts(translationToDb(section));

  let prices = products?.articles?.map((article) => {
    let price = 0;
    article?.items?.forEach((item) => {
      if (item.price > price) price = item.price;
    });
    return price;
  });

  let min = Math.floor(prices?.reduce((a, b) => Math.min(a, b), 10000000));
  let max = Math.ceil(prices?.reduce((a, b) => Math.max(a, b)));
  // Must add total qty on every types how much is qty of the every filter
  let typesObj = {};
  products?.articles?.forEach((article) => {
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

  for (let key in typesObj) {
    typesObj[key] = Array.from(typesObj[key]);
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      sectionName: section,
      types: typesObj,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    },
  };
}
