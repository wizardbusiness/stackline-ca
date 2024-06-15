import _React from 'react';
import { Box, Divider, Chip, Skeleton, Stack, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Product } from '../types';
import { SerializedError } from '@reduxjs/toolkit';

type ProductCardProps = {
  product: Product | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};
const ProductCard = ({ product, error, isLoading }: ProductCardProps) => {
  return (
    <Box sx={{ height: 250, width: 250, backgroundColor: 'white' }}>
      {error ? (
        'Product Not Found'
      ) : isLoading ? (
        <Skeleton>...Loading</Skeleton>
      ) : product ? (
        <>
          <Stack sx={{ padding: '10%' }}>
            <Box>
              <img src={product.image}></img>
            </Box>
            <Box>
              <Typography variant="h6">{product.title}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: 'gray' }}>{product.subtitle}</Typography>
            </Box>
            <Box>
              {product.tags.map((tag) => (
                <Chip label={tag} />
              ))}
            </Box>
          </Stack>
          <Divider />
        </>
      ) : null}
    </Box>
  );
};

export default ProductCard;
