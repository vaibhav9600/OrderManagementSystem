import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";
import { cartSlice } from "./cartSlice";
import { addressSlice } from "./addressSlice";
import { invoiceSlice } from "./invoiceSlice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        address: addressSlice.reducer,
        invoice: invoiceSlice.reducer,
    }
})