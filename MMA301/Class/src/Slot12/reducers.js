import { createReducer } from "@reduxjs/toolkit";
import { addItem, removeItem } from "./actions";
const initialState = { items: [] }; // array of states
const cartReducer = createReducer(initialState, builder => {
    builder
        .addCase(addItem, (state, action) => { // define addItem function
            // get id of product in cart 
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            // if existed product 
            if (existingItemIndex !== -1) {
                // numbers of product increment 1
                state.items[existingItemIndex].quantity++;
            } else { // if product not exist in cart
                // add product in cart and set quantity is 1
                state.items.push({ ...action.payload, quantity: 1 });

            }
        })

        .addCase(removeItem, (state, action) => { // define the function to remove product
            // get id of product in cart 
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            // if existed product 
            if (existingItemIndex !== -1) {
                // numbers of product descrement 1
                state.items[existingItemIndex].quantity--;
            }
            // if number = 0 -> remove product
            if (state.items[existingItemIndex].quantity === 0) {
                state.items.splice(existingItemIndex, 1); // remove product
            }
        });
});

export default cartReducer;