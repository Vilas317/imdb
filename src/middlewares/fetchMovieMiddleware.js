import axios from "axios";
import moviesSlice from "../redux/moviesSlice";

export const fetchMovieMiddleware = (pageNo) => async (dispatch) => {
  dispatch(moviesSlice.actions.setLoading());

  try {
    const apiKey = import.meta.env.VITE_TMDB_KEY;

    if (!apiKey) {
      throw new Error("❌ TMDB API Key not found. Check your .env file.");
    }

    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${pageNo}`;

    console.log("📡 Fetching:", url);

    const res = await axios.get(url);

    if (!res.data || !res.data.results) {
      throw new Error("❌ Invalid API response");
    }

    console.log("✅ API Response:", res.data.results);

    dispatch(moviesSlice.actions.setMovies(res.data.results));
  } catch (err) {
    console.error("❌ API Error:", err.message);
    dispatch(moviesSlice.actions.setError(err.message));
  }
};
