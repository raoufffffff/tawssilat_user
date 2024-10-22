import { configureStore } from "@reduxjs/toolkit";
import StorCart from "./StorCart";

export const store = configureStore({
    reducer: {
        StorCard: StorCart
    }
})