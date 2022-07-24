import React from "react";
import { useRouter } from "next/router";

export default function Main({ products }) {
  const router = useRouter();
  const changeTypeAction = (type) => {
    // Trigger fragment change to fetch the new data
    router.push(`/adminPanel/#prodykti#${type}`, undefined, { shallow: true });
  };
  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <button
          onClick={() => changeTypeAction("create")}
          className="px-5 text-sm border border-green text-green hover"
        >
          Създай продукт
        </button>
      </div>
      <section>
        {products.map((section) => {
          return (
            <div key={section._id}>
              <ul>
                <li>Секция: {section.sectionName}</li>
                {section.commonName && <li>Общо име: {section.commonName}</li>}
                <li>
                  Артикули:
                  {section.articles.map((article) => {
                    return (
                      <ul
                        key={article._id}
                        className="pl-2 mb-1 border-l-4 border-primary"
                      >
                        <li>Име: {article.articleName}</li>
                        <li>Описание: {article.description}</li>
                        <li>
                          Продукти:
                          {article.items.map((item) => {
                            return (
                              <ul
                                key={item._id}
                                className="pl-2 mb-2 border-l-2 border-primary"
                              >
                                <li>КатНомер: {item.katNomer}</li>
                                <li>Цена: {item.price}</li>
                                <li>Типове: {item.types}</li>
                                {item.colors && item.colors.length > 0 && (
                                  <li>Цветове: {item.colors}</li>
                                )}
                              </ul>
                            );
                          })}
                        </li>
                      </ul>
                    );
                  })}
                </li>
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}
