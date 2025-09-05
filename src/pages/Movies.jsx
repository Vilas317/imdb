import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

import { WatchListContext } from '../context/WatchListContext';
import { useSelector, useDispatch } from "react-redux";
import paginationSlice from '../redux/paginationSlice';
import moviesSlice from '../redux/moviesSlice';
import { fetchMovieMiddleware } from '../middlewares/fetchMovieMiddleware';

const Movies = () => {
  const { pageNo } = useSelector((state) => state.PaginationSlice);
  const { movies, loading, error } = useSelector((state) => state.MoviesSlice);

  const dispatch = useDispatch();
  const { addToWatchlist, removeFromWatchlist, watchList, setWatchList } = useContext(WatchListContext);

  const [query, setQuery] = useState("");

  // 🔹 Fetch trending movies
  useEffect(() => {
    if (!query) {
      dispatch(fetchMovieMiddleware(pageNo));
    }
  }, [pageNo, query, dispatch]);

  // 🔹 Load watchlist from localStorage
  useEffect(() => {
    const moviesFromLS = localStorage.getItem('movies');
    if (moviesFromLS) {
      setWatchList(JSON.parse(moviesFromLS));
    }
  }, [setWatchList]);

  // 🔹 Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_TMDB_KEY;

    if (!apiKey) {
      alert("TMDB API Key missing in .env file");
      return;
    }

    if (query.trim() === "") {
      dispatch(fetchMovieMiddleware(pageNo));
    } else {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
        console.log("🔍 Searching:", url);

        const res = await axios.get(url);

        dispatch(moviesSlice.actions.setMovies(res.data.results));
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const handlePrevious = () => {
    if (pageNo > 1) {
      dispatch(paginationSlice.actions.handlePrevious());
    }
  };

  const handleNext = () => {
    dispatch(paginationSlice.actions.handleNext());
  };

  if (loading) {
    return <h4 className="text-center mt-4">Trending movies loading...</h4>;
  }

  if (error) {
    return <h4 className="text-center mt-4">❌ {error}</h4>;
  }

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-72 border rounded-md"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>

      <div className="text-2xl font-bold text-center m-4">
        <h2>{query ? "Search Results" : "Trending Movies"}</h2>
      </div>

      <div className="flex justify-around gap-8 flex-wrap">
        {movies && movies.length > 0 ? (
          movies.map((movieObj, i) => (
            <MovieCard
              key={movieObj.id || i}
              movieObj={movieObj}
              addToWatchlist={addToWatchlist}
              watchList={watchList}
              removeFromWatchlist={removeFromWatchlist}
            />
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>

      {!query && (
        <Pagination handleNext={handleNext} handlePrevious={handlePrevious} pageNo={pageNo} />
      )}
    </div>
  );
};

export default Movies;
