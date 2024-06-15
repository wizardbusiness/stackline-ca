import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/Products/productsSlice';

export const store = configureStore({
  reducer: {
    productInfo: productsReducer
  }
});
