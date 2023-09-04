import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddresses: [],
    billingAddresses: [],
    selectedShippingAddress: null,
    selectedBillingAddress: null,
    selectedPaymentMethod: null,
    paymentTypes: []
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateShippingAddress: (state, action) => {
            state.selectedShippingAddress = action.payload
        },
        updateBillingAddress: (state, action) => {
            state.selectedBillingAddress = action.payload
        },
        updatePaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload
        },
        updateSA: (state, action) => {
            state.shippingAddresses = action.payload
        },
        updateBA: (state, action) => {
            state.billingAddresses = action.payload
        },
        updatePT: (state, action) => {
            state.paymentTypes = action.payload
        },
        resetAddress: () => initialState,
    },
})

export const { updateShippingAddress, updateBillingAddress, updatePaymentMethod, resetAddress, updateBA, updateSA, updatePT } = addressSlice.actions;
export default addressSlice.reducer;