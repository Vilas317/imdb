import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState: {
        movies: [],
        loading: true,
        error: false
    },
    reducers: {
        movieLoading: (state, action) => {
            state.loading = action.payload;
            state.error = false;
        },
        movieError: (state) => {
            state.loading = false;
            state.error = true;
        },
        movieData: (state, action) => {
            state.loading = false;
            state.error = false;
            state.movies = action.payload
        }
    }
})

export default moviesSlice;