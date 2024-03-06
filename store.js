import { configureStore } from "@reduxjs/toolkit";
import navReader from "./slices/navSlice"

export const store=configureStore({
    reducer:{
        nav:navReader,
    },
});