import { configureStore } from '@reduxjs/toolkit';
import productInfoReducer from './features/ProductInfo/productInfoSlice';

export const store = configureStore({
  reducer: {
    productInfo: productInfoReducer
  }
});
