import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedShippingAddress: null,
    selectedBillingAddress: null,
    selectedPaymentMethod: null,
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
        }
    },
})

export const { updateShippingAddress, updateBillingAddress, updatePaymentMethod } = addressSlice.actions;
export default addressSlice.reducer;