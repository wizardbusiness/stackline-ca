import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

import { Product, ProductsState } from '../types';

const localJSONQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  const filePath = typeof args === 'string' ? args : args.url;
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch JSON');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    let errorMessage = 'An unkown error occured while fetching product data';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: { status: 'CUSTOM_ERROR', error: errorMessage } };
  }
};

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: localJSONQuery,
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsState, void>({
      query: () => './stackline_frontend_assessment_data_2021.json'
    }),
    getProductById: builder.query<Product, string>({
      query: (_id) => ({
        url: './stackline_frontend_assessment_data_2021.json'
      }),
      transformResponse: (response: Product[], _meta, id) => {
        const product = response.find((product) => product.id === id);
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
        return product;
      }
    })
  })
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
export default productsApi;
