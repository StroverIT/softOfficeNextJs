import React, { useRef, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

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
import { addToCart } from "../../../redux/actions/productActions";
// Notifications
import { toastProduct } from "../../../components/notificataions/Toast";

export default function Section({ products, types, sectionRoute }) {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    console.log(product);
    toastProduct(`Добавихте "${product.article.name}" в количката си`);

    dispatch(addToCart(product));
  };

  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  //Product state
  const [articles, setArticles] = useState(null);

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
      // setArticles(filteredArticles);
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
  useEffect(() => {
    if (products?.subsection) {
      setArticles(products.subsection);
    }
  }, [products]);
  const notInTesting = false;
  return (
    <main className="mb-auto">
      {articles && (
        <div className="container lg:space-x-10">
          <section className="mt-10">
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

            <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {articles &&
                articles.map((article) => {
                  return (
                    <Product
                      key={article._id}
                      section={{
                        name: `${products?.nameToDisplay} ${article?.nameToDisplay}`,
                        route: article?.name,
                      }}
                      article={article}
                      addProduct={addProduct}
                    />
                  );
                })}
            </section>
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
  const session = await getSession({ req: context.req });

  const products = await getAllProducts(section, session);
  console.log(products);
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
