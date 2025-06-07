import MoviesSlice from "../redux/moviesSlice";

const actions = MoviesSlice.actions;

export const fetchMovieMiddleware = params => {
    return async function (dispatch) {
        try {
            dispatch(actions.movieLoading(true));
            const resp = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=e278e3c498ab14e0469bf6d86da17045&page=${params}`)
            const data = await resp.json();
            console.log(data, "data in fetchmoviemoddlware")
            dispatch(actions.movieData(data.results));

        } catch (error) {
            dispatch(actions.movieError());
            dispatch(actions.movieLoading(false));
        }
    }
}