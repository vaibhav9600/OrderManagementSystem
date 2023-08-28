import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState = {
    products: [],
    selectedProduct: null,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload
        },
        setSelectedProducts: (state, action) => {
            const productId = action.payload;
            state.selectedProduct = state.products.find((p) => p.id == productId);
        }
    },
})

export const { updateProducts, setSelectedProducts } = productSlice.actions;
export default productSlice.reducer;