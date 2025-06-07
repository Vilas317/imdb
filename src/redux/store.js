import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";
import moviesSlice from "./moviesSlice";
const store = configureStore({
    reducer: {
        PaginationSlice: paginationSlice.reducer,
        MoviesSlice: moviesSlice.reducer
    }
})

export default store;