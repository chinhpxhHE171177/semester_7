// npm i @reduxjs/toolkit
// npm i react-redux
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers";

const Store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default Store;