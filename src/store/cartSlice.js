import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    deliveryFees: 15,
    freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const { product, quantity } = action.payload;
            const cartItem = state.items.find((item) => item.product.id === product.id);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                state.items.push({ product: product, quantity: quantity });
            }
        },
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload;
            const cartItem = state.items.find(
                (item) => item.product.id == productId
            );
            if (cartItem) {
                cartItem.quantity += amount;
            }
            if (cartItem.quantity <= 0) {
                state.items = state.items.filter((item) => item != cartItem);
            }
        },
    },
});

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubtotals = (state) => state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0
);

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubtotals,
    (cart, subtotal) => {
        if (subtotal === 0) {
            return 0; // No delivery fees if subtotal is zero
        } else {
            return subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFees;
        }
    }
);

export const selectTotalPrice = createSelector(
    selectDeliveryPrice,
    selectSubtotals,
    (delivery, subtotal) => subtotal + delivery
);