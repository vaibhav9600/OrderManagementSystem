import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";
import { cartSlice } from "./cartSlice";
import {addressSlice} from "./addressSlice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        address: addressSlice.reducer,
    }
})