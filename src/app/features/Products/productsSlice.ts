import { createSlice } from '@reduxjs/toolkit';

type Sales = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}[];

type Reviews = {
  customer: string;
  review: string;
  score: number;
}[];

type Product = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Reviews;
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sales;
};

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
