import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    // The shorthand of the Fragment is just simply <>
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>
            {title}
            <div className="products-container">
              {categoriesMap[title].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </h2>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;
