import React, { useRef, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
import Checkbox from "../../../components/base/Checkbox";
// Redux
import { useDispatch } from "react-redux";
// Notifications
import NotFound from "../../../components/products/listProducts/NotFound";
import ListProducts from "../../../components/products/listProducts/ListProducts";

export default function Section({ products }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  //Product state
  const [articles, setArticles] = useState(null);

  // total filters
  const [filters, setFilters] = useState([]);

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
  useEffect(() => {
    let subsections = products?.subsection?.slice();
    let newSub = [];

    if (router.query?.onlyPromo) {
      subsections.forEach((sub) => {
        const items = [];

        sub.items.forEach((item) => {
          if (item.isOnPromotions) {
            items.push(item);
          }
        });
        if (items.length > 0) newSub.push(sub);
      });
    }

    if (newSub.length > 0) setArticles(newSub);
    else setArticles(subsections);
  }, [products]);
  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    let prevPath = storage.getItem("prevPath");
    if (prevPath) {
      prevPath = prevPath.split("=")[1];

      const test = document.getElementById(prevPath);

      if (test) {
        test.scrollIntoView();
      }
    }
  }, [articles, router]);
  const notInTesting = false;
  return (
    <main className="mb-auto">
      {articles && (
        <div className="container lg:space-x-10">
          <section className="mt-10 mb-10">
            {/* Filters for mobile */}
            {products && notInTesting && (
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
                </div>
              </div>
            )}

            <ListProducts
              articles={articles}
              products={products}
              dispatch={dispatch}
            />
          </section>
          {router.query?.onlyPromo && (
            <section className="fixed bottom-0 right-0 lg:top-56">
              <div
                className="p-4 text-center text-white cursor-pointer max-lg:w-screen lg:rounded-full bg-primary-500"
                onClick={() =>
                  router.push({ pathname: `/products/${products.name}` }, undefined, {scroll:false})
                }
              >
                Покажи всички продукти
              </div>
            </section>
          )}
        </div>
      )}
      {!articles && <NotFound />}
    </main>
  );
}

// Getting all product.. if filtering Must be filtering somehow
export async function getServerSideProps(context) {
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
    },
  };
}

// This is used when filters are up!!!

// useEffect(() => {
//   const newProdArt = products?.subsection?.slice();

//   if(router.query?.onlyPromo){
//     console.log(products);
//   }

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
//     // setArticles(filteredArticles);
//   }
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [filters, products?.subsection, router]);
