import React from 'react';
import {useFetchProductsQuery, useUpdateCartMutation} from '../api/apiSlice';

const ProductsGrid = () => {
  const {data, error, isLoading} = useFetchProductsQuery({});
  const [updateCart] = useUpdateCartMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data.products?.map((product) => {
          return (
            <li key={product._id}>
              <p>{product.name + ' ' + product.price}</p>
              <button
                onClick={() =>
                  updateCart({productId: product._id, quantity: 1})
                }
              >
                AddToCart
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsGrid;
