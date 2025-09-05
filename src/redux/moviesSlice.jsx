import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "MoviesSlice",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setMovies: (state, action) => {
      state.movies = action.payload || [];
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload || "Something went wrong";
      state.loading = false;
    },
  },
});

export default moviesSlice;
