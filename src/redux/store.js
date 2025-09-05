import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import paginationSlice from "./paginationSlice";

const store = configureStore({
  reducer: {
    MoviesSlice: moviesSlice.reducer,
    PaginationSlice: paginationSlice.reducer,
  },
});

export default store;
