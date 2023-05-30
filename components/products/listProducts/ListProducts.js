import React from 'react';
import Product from './Product';
import { addProduct } from '../../../utils/helper';

const ListProducts = ({articles, dispatch,products}) => {
    return (
        <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {articles &&
          articles.map((article) => {
            const route = `/products/${products.name}/${article._id}`;
            return (
              <Product
                key={article._id}
                section={{
                  name: `${products?.nameToDisplay  != "Обадете се" ? products?.nameToDisplay : ""} ${article?.nameToDisplay}`,
                  nameToDisplay: products?.nameToDisplay,
                  route,
                }}
                article={article}
                addProduct={addProduct}
                dispatch={dispatch}
              />
            );
          })}
      </section>
    );
}

export default ListProducts;
