import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoiceID: null,
};

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        updateInvoice: (state, action) => {
            state.invoiceID = action.payload;
        },
        resetInvoice: (state) => {
            state.invoiceID = null;
        },
    },
})

export const { updateInvoice, resetInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
