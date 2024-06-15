import _React from 'react';
import { useGetProductByIdQuery } from '../services/productsApi';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import SalesChart from './SalesChart';
import { grey } from '@mui/material/colors';

const ProductPage = () => {
  const { data, error, isLoading } = useGetProductByIdQuery('B007TIE0GQ');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          height: '100vh',
          width: '100vw',
          padding: '1%',
          paddingTop: '4%',
          backgroundColor: grey[100]
        }}
      >
        <ProductCard product={data} error={error} isLoading={isLoading} />
        <SalesChart product={data} error={error} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default ProductPage;
