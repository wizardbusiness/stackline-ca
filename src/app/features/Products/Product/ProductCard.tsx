import _React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Product } from '../types';
import { SerializedError } from '@reduxjs/toolkit';
import { Box, Divider, Chip, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type ProductCardProps = {
  product: Product | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};
const ProductCard = ({ product, error, isLoading }: ProductCardProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        height: '100%',
        width: '17%',
        backgroundColor: 'white',
        boxShadow: '0px 5px 10px lightgray'
      }}
    >
      {error ? (
        'Product Not Found'
      ) : isLoading ? (
        <Skeleton>...Loading</Skeleton>
      ) : product ? (
        <>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '5%'
            }}
          >
            <Box>
              <img height={150} src={product.image}></img>
            </Box>
            <Typography color={'black'} variant="h6">
              {product.title}
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '75%',
                fontSize: '0.8rem',
                color: 'gray'
              }}
              variant="body1"
            >
              {product.subtitle}
            </Typography>
          </Stack>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              padding: '5%',
              flexWrap: 'wrap'
            }}
          >
            {product.tags.map((tag, index) => (
              <Chip
                sx={{
                  borderRadius: '5px',
                  color: grey[800],
                  borderColor: grey[200],
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  backgroundColor: grey[50]
                }}
                key={`tag${index}`}
                label={tag}
              />
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default ProductCard;
