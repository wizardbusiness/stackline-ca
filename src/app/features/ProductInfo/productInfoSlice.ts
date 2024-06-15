import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const productInfoSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    }
  }
});

export const { setProducts } = productInfoSlice.actions;
export default productInfoSlice.reducer;
