import MoviesSlice from "../redux/moviesSlice";

const actions = MoviesSlice.actions;

export const fetchMovieMiddleware = params => {
    return async function (dispatch) {
        try {
            dispatch(actions.movieLoading(true));
            const API_KEY = import.meta.env.VITE_TMDB_KEY;

const res = await axios.get(
  `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNo}`
);

            const data = await resp.json();
            console.log(data, "data in fetchmoviemoddlware")
            dispatch(actions.movieData(data.results));

        } catch (error) {
            dispatch(actions.movieError());
            dispatch(actions.movieLoading(false));
        }
    }
}