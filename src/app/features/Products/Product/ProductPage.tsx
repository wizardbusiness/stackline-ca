import React from 'react';
import { useGetProductByIdQuery } from '../services/productsApi';

const ProductsPage = () => {
  const { data, error, isLoading } = useGetProductByIdQuery('B007TIE0GQ');
  return <div>{data?.title}</div>;
};

export default ProductsPage;
