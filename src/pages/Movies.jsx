import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  // Fetch trending movies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_TMDB_KEY`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, []);

  // Add/Remove from watchlist
  const toggleWatchlist = (movie) => {
    let updatedList;
    if (watchlist.some((m) => m.id === movie.id)) {
      updatedList = watchlist.filter((m) => m.id !== movie.id);
    } else {
      updatedList = [...watchlist, movie];
    }
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-900 text-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => toggleWatchlist(movie)}
              className="absolute top-2 right-2 text-red-500 text-2xl"
            >
              <FaHeart
                className={
                  watchlist.some((m) => m.id === movie.id)
                    ? "fill-red-600"
                    : "fill-gray-400"
                }
              />
            </button>
            <div className="p-2">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
